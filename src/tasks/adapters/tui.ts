import * as colors from "@std/fmt/colors";
import { runCommand } from "./utils.ts";
import log from "../../lib/log.ts";
import { config } from "../../config.ts";
import { join } from "@std/path";

// Reuse the RepoStatus interface from status.ts
interface RepoStatus {
    branch: string;
    changes: boolean;
    ahead: number;
    behind: number;
    hasRemote: boolean;
    hasAdapter: boolean;
}

/**
 * Get repository status information
 */
async function getRepoStatus(repoPath?: string): Promise<RepoStatus> {
    // Change to repository path if provided
    const originalDir = repoPath ? Deno.cwd() : undefined;
    if (repoPath) {
        Deno.chdir(repoPath);
    }

    try {
        const status: RepoStatus = {
            branch: "",
            changes: false,
            ahead: 0,
            behind: 0,
            hasRemote: false,
            hasAdapter: false,
        };

        // Check if adapter config exists
        try {
            const adapterConfigPath = "black-atom-adapter.json";
            const result = await Deno.stat(adapterConfigPath);
            status.hasAdapter = result.isFile;
        } catch {
            status.hasAdapter = false;
        }

        // Get current branch
        const branch = await runCommand(["git", "rev-parse", "--abbrev-ref", "HEAD"])
            .then((output) => output.trim())
            .catch(() => "unknown");

        status.branch = branch;

        // Check for uncommitted changes
        const gitStatus = await runCommand(["git", "status", "--porcelain"]);
        status.changes = gitStatus.trim() !== "";

        // Check for remote tracking branch
        const hasRemote = await runCommand([
            "git",
            "rev-parse",
            "--abbrev-ref",
            "--symbolic-full-name",
            "@{u}",
        ]).then(() => true).catch(() => false);

        status.hasRemote = hasRemote;

        // If we have a remote branch, check ahead/behind counts
        if (hasRemote) {
            // First fetch to ensure we have latest info
            await runCommand(["git", "fetch"]).catch(() => {
                // Ignore fetch errors, just proceed with local info
            });

            // Get ahead/behind counts
            const revList = await runCommand([
                "git",
                "rev-list",
                "--left-right",
                "--count",
                `${branch}...@{u}`,
            ]).then((output) => output.trim().split(/\s+/))
                .catch(() => ["0", "0"]);

            status.ahead = parseInt(revList[0] || "0", 10);
            status.behind = parseInt(revList[1] || "0", 10);
        }

        return status;
    } finally {
        // Return to original directory if we changed
        if (originalDir) {
            Deno.chdir(originalDir);
        }
    }
}

interface AdapterEntry {
    name: string;
    path: string;
    status: RepoStatus;
}

/**
 * Start the TUI interface for adapter management
 */
export async function startTUI(): Promise<void> {
    // Store core and adapter repository statuses
    const entries: AdapterEntry[] = [];
    const coreDir = config.dir.core;
    let selectedIndex = 0;
    let running = true;

    // Function to load all adapter statuses
    async function loadAdapterStatuses(): Promise<void> {
        entries.length = 0; // Clear the array

        // First add core
        entries.push({
            name: "core",
            path: coreDir,
            status: await getRepoStatus(coreDir),
        });

        // Resolve organization directory
        const orgDir = config.dir.org || join(Deno.cwd(), "..");

        // Add all adapters
        for (const adapter of config.adapters) {
            const adapterDir = join(orgDir, adapter);
            try {
                const status = await getRepoStatus(adapterDir);
                entries.push({
                    name: adapter,
                    path: adapterDir,
                    status,
                });
            } catch (error) {
                log.error(`Error loading adapter ${adapter}: ${error}`);
            }
        }
    }

    // Load initial statuses
    await loadAdapterStatuses();

    // TUI drawing function
    function drawScreen(): void {
        console.clear();
        log.hr_thick(" Black Atom Adapter Manager ");
        console.log("");
        console.log(
            colors.dim("  Navigate: j/k | Open editor: o | Open lazygit: g | Reload: r | Quit: q"),
        );
        console.log("");

        // Table header
        console.log(
            "  " +
                colors.bold("Repository".padEnd(25)) +
                colors.bold("Branch".padEnd(25)) +
                colors.bold("Changes".padEnd(10)) +
                colors.bold("Remote".padEnd(20)) +
                colors.bold("Adapter Config".padEnd(15)),
        );
        console.log("  " + "-".repeat(95));

        // Rows
        entries.forEach((entry, index) => {
            const { name, status } = entry;
            const isSelected = index === selectedIndex;

            // Changes column
            const changesDisplay = status.changes ? "✘" : "✓";
            const changesColor = status.changes ? colors.red : colors.green;

            // Remote column
            let remoteDisplay = "no remote";
            let remoteColor = colors.white;
            if (status.hasRemote) {
                if (status.ahead > 0 && status.behind > 0) {
                    remoteDisplay = `↑${status.ahead} ↓${status.behind}`;
                    remoteColor = colors.yellow;
                } else if (status.ahead > 0) {
                    remoteDisplay = `↑${status.ahead}`;
                    remoteColor = colors.yellow;
                } else if (status.behind > 0) {
                    remoteDisplay = `↓${status.behind}`;
                    remoteColor = colors.red;
                } else {
                    remoteDisplay = "in sync";
                    remoteColor = colors.green;
                }
            }

            // Adapter config column
            let adapterConfigDisplay = status.hasAdapter ? "✓" : "✘";
            let adapterConfigColor = status.hasAdapter ? colors.green : colors.red;

            // Special case for core
            if (name === "core") {
                adapterConfigDisplay = "N/A";
                adapterConfigColor = colors.dim;
            }

            // Truncate long branch names
            let branchName = status.branch;
            const maxBranchLength = 23; // Leave room for ellipsis
            if (branchName.length > maxBranchLength) {
                branchName = branchName.substring(0, maxBranchLength) + "…";
            }

            // Row prefix (selection indicator)
            const prefixChar = isSelected ? ">" : " ";
            const prefix = isSelected ? colors.cyan(prefixChar) : prefixChar;

            // Repo name with highlight
            const repoColor = name === "core"
                ? (str: string) => colors.bold(colors.yellow(str))
                : isSelected
                ? colors.cyan
                : colors.white;

            console.log(
                `${prefix} ${repoColor(name.padEnd(24))}` +
                    branchName.padEnd(25) +
                    changesColor(changesDisplay.padEnd(10)) +
                    remoteColor(remoteDisplay.padEnd(20)) +
                    adapterConfigColor(adapterConfigDisplay.padEnd(15)),
            );
        });

        console.log("");
        console.log(
            colors.dim("  Legend: ") +
                colors.green("✓") + colors.dim(" = clean/present, ") +
                colors.red("✘") + colors.dim(" = changes/missing, ") +
                colors.yellow("↑") + colors.dim(" = ahead, ") +
                colors.red("↓") + colors.dim(" = behind"),
        );
    }

    // Draw initial screen
    drawScreen();

    // Improved keyboard handling
    try {
        // Create a readline interface for cleaner input
        const textEncoder = new TextEncoder();

        // Main interaction loop
        while (running) {
            // Show current selection in footer
            console.log("");
            console.log(
                colors.dim(`  Selected: ${colors.cyan(entries[selectedIndex].name)} | `) +
                    colors.dim("j/k: navigate | o: editor | g: lazygit | r: refresh | q: quit"),
            );

            // Get user input without showing prompt repeatedly
            Deno.stdout.writeSync(textEncoder.encode(colors.yellow("\n> ")));

            // Read a single byte
            const buffer = new Uint8Array(1);
            await Deno.stdin.read(buffer);
            const key = String.fromCharCode(buffer[0]).toLowerCase();

            // Handle based on single character
            switch (key) {
                // j - move down
                case "j":
                    selectedIndex = Math.min(selectedIndex + 1, entries.length - 1);
                    drawScreen();
                    break;

                // k - move up
                case "k":
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    drawScreen();
                    break;

                // o - open in editor
                case "o":
                    if (entries[selectedIndex]) {
                        const entry = entries[selectedIndex];

                        // Clear screen and show loading message
                        console.clear();
                        log.info(`Opening ${entry.name} in editor...`);

                        try {
                            // Get $EDITOR from environment
                            const editor = Deno.env.get("EDITOR") || "nano";

                            // Launch editor in adapter directory
                            const process = new Deno.Command(editor, {
                                args: [],
                                cwd: entry.path,
                                stdin: "inherit",
                                stdout: "inherit",
                                stderr: "inherit",
                            });

                            await process.output();

                            // Update status after editor exits
                            log.info("Editor closed. Refreshing status...");
                            await loadAdapterStatuses();
                        } catch (error) {
                            console.error(`Error launching editor: ${error}`);
                            await new Promise((r) => setTimeout(r, 2000));
                        }

                        // Redraw screen
                        drawScreen();
                    }
                    break;

                // g - open in lazygit
                case "g":
                    if (entries[selectedIndex]) {
                        const entry = entries[selectedIndex];

                        // Clear screen and show loading message
                        console.clear();
                        log.info(`Opening ${entry.name} in lazygit...`);

                        try {
                            // Launch lazygit in adapter directory
                            const process = new Deno.Command("lazygit", {
                                cwd: entry.path,
                                stdin: "inherit",
                                stdout: "inherit",
                                stderr: "inherit",
                            });

                            await process.output();

                            // Update status after lazygit exits
                            log.info("Lazygit closed. Refreshing status...");
                            await loadAdapterStatuses();
                        } catch (error) {
                            console.error(`Error launching lazygit: ${error}`);
                            await new Promise((r) => setTimeout(r, 2000));
                        }

                        // Redraw screen
                        drawScreen();
                    }
                    break;

                // r - reload
                case "r":
                    console.clear();
                    log.info("Refreshing repository statuses...");
                    await loadAdapterStatuses();
                    drawScreen();
                    break;

                // q - quit
                case "q":
                    running = false;
                    break;

                // Enter or other keys - just refresh the display
                default:
                    drawScreen();
                    break;
            }
        }
    } finally {
        console.clear();
        log.info("TUI closed.");
    }
}
