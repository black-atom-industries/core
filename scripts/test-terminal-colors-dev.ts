import { join } from "@std/path";
import { existsSync } from "@std/fs";

/**
 * Watches generated Ghostty config files for changes and re-runs the terminal color test.
 *
 * Requires `deno task dev` (or manual generation) to be running separately.
 * When generation writes new .conf files, this watcher picks up the change,
 * reloads Ghostty, and re-displays the color test.
 *
 * Ghostty: Config is auto-reloaded after each change (via SIGUSR2).
 * Other terminals: Manual config reload is required after changes.
 */

const scriptDir = import.meta.dirname!;
const repoRoot = join(scriptDir, "..");
const orgDir = join(repoRoot, "..");
const testScript = join(scriptDir, "test-terminal-colors.sh");

// Resolve the Ghostty adapter's themes output directory
const ghosttyThemesDir = join(orgDir, "ghostty", "themes");

if (!existsSync(ghosttyThemesDir)) {
    console.error(`Ghostty themes directory not found: ${ghosttyThemesDir}`);
    console.error("Make sure the ghostty adapter repo exists as a sibling directory.");
    Deno.exit(1);
}

const args = Deno.args.filter((a) => a !== "--capture");
const themeName = args[0] || "";
const capture = Deno.args.includes("--capture");

const cmd = [testScript, ...(themeName ? [themeName] : []), ...(capture ? ["--capture"] : [])];

async function run() {
    const command = new Deno.Command(cmd[0], {
        args: cmd.slice(1),
        stdout: "inherit",
        stderr: "inherit",
    });
    await command.output();
}

/**
 * Reload Ghostty configuration.
 * Uses SIGUSR2 signal (Ghostty 1.2.0+) with AppleScript menu fallback on macOS.
 */
async function reloadGhostty() {
    try {
        // Try SIGUSR2 signal (Ghostty 1.2.0+)
        const pkill = new Deno.Command("pkill", {
            args: ["-SIGUSR2", "ghostty"],
            stdout: "null",
            stderr: "null",
        });
        const result = await pkill.output();
        if (result.success) return;
    } catch {
        // pkill not available or failed
    }

    // Fallback: AppleScript on macOS
    if (Deno.build.os === "darwin") {
        try {
            const osascript = new Deno.Command("osascript", {
                args: [
                    "-e",
                    `tell application "System Events"
                        tell process "Ghostty"
                            try
                                click menu item "Reload Configuration" of menu "Ghostty" of menu bar 1
                            end try
                        end tell
                    end tell`,
                ],
                stdout: "null",
                stderr: "null",
            });
            await osascript.output();
        } catch {
            // AppleScript not available
        }
    }
}

console.log(`Watching ${ghosttyThemesDir} for generated config changes...\n`);
console.log(`┌──────────────────────────────────────────────────────────────────┐`);
console.log(`│                                                                  │`);
console.log(`│  Watches generated Ghostty .conf files (not theme sources).      │`);
console.log(`│  Run dev separately to trigger generation.              │`);
console.log(`│                                                                  │`);
console.log(`└──────────────────────────────────────────────────────────────────┘`);
console.log(`\nPress Ctrl+C to stop.\n`);

await run();

const watcher = Deno.watchFs(ghosttyThemesDir, { recursive: true });
let debounce: number | undefined;

for await (const event of watcher) {
    if (event.kind === "modify" || event.kind === "create") {
        // Only react to .conf file changes (generated output)
        if (!event.paths.some((p) => p.endsWith(".conf"))) continue;

        clearTimeout(debounce);
        debounce = setTimeout(async () => {
            await reloadGhostty();
            // Brief pause for Ghostty to apply the new config
            await new Promise((resolve) => setTimeout(resolve, 200));
            console.clear();
            await run();
        }, 300);
    }
}
