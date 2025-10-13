import * as colors from "@std/fmt/colors";
import { forEachAdapter } from "./forEachAdapter.ts";
import { runCommand } from "./utils.ts";
import { getAdapters } from "../../lib/discover-adapters.ts";
import log from "../../lib/log.ts";

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
    const status: RepoStatus = {
        branch: "",
        changes: false,
        ahead: 0,
        behind: 0,
        hasRemote: false,
        hasAdapter: false,
    };

    const cwd = repoPath || Deno.cwd();

    // Check if adapter config exists
    try {
        const adapterConfigPath = repoPath
            ? `${repoPath}/black-atom-adapter.json`
            : "black-atom-adapter.json";
        const result = await Deno.stat(adapterConfigPath);
        status.hasAdapter = result.isFile;
    } catch {
        status.hasAdapter = false;
    }

    // Get current branch
    const branch = await runCommand(["git", "rev-parse", "--abbrev-ref", "HEAD"], { cwd })
        .then((output) => output.trim())
        .catch(() => "unknown");

    status.branch = branch;

    // Check for uncommitted changes
    const gitStatus = await runCommand(["git", "status", "--porcelain"], { cwd });
    status.changes = gitStatus.trim() !== "";

    // Check for remote tracking branch
    const hasRemote = await runCommand([
        "git",
        "rev-parse",
        "--abbrev-ref",
        "--symbolic-full-name",
        "@{u}",
    ], { cwd }).then(() => true).catch(() => false);

    status.hasRemote = hasRemote;

    // If we have a remote branch, check ahead/behind counts
    if (hasRemote) {
        // First fetch to ensure we have latest info
        await runCommand(["git", "fetch"], { cwd }).catch(() => {
            // Ignore fetch errors, just proceed with local info
        });

        // Get ahead/behind counts
        const revList = await runCommand([
            "git",
            "rev-list",
            "--left-right",
            "--count",
            `${branch}...@{u}`,
        ], { cwd }).then((output) => output.trim().split(/\s+/))
            .catch(() => ["0", "0"]);

        status.ahead = parseInt(revList[0] || "0", 10);
        status.behind = parseInt(revList[1] || "0", 10);
    }

    return status;
}

/**
 * Show status overview of all repositories
 */
export async function showAdapterStatuses(): Promise<void> {
    // Store statuses to display a summary table at the end
    const statuses: Record<string, RepoStatus> = {};

    // First, get core repository status
    log.info("Checking core repository status...");
    statuses["core"] = await getRepoStatus();

    // Then check adapter repositories
    const adapters = await getAdapters();

    await forEachAdapter({
        adapters,
        cb: async ({ adapter, adapterDir }) => {
            log.info(`Checking ${adapter} repository status...`);
            statuses[adapter] = await getRepoStatus(adapterDir);
        },
    });

    // Display summary table
    log.hr_thick(" Repository Status Overview ");
    console.log("");

    // Define cell and table types
    interface TableCell {
        content: string;
        color?: (str: string) => string;
    }

    interface TableColumn {
        header: string;
        width: number;
    }

    // Table structure
    const table = {
        columns: [
            { header: "Repository", width: 25 },
            { header: "Branch", width: 25 },
            { header: "Changes", width: 10 },
            { header: "Remote", width: 20 },
            { header: "Adapter Config", width: 15 },
        ] as TableColumn[],
        rows: [] as TableCell[][],
    };

    // Helper function to create a padded cell with color
    function createCell(content: string, width: number, color?: (str: string) => string) {
        const paddedContent = content.padEnd(width);
        return color ? color(paddedContent) : paddedContent;
    }

    // Get a sorted list of repositories with core first, then alphabetic
    const sortedRepos = Object.keys(statuses).sort((a, b) => {
        if (a === "core") return -1;
        if (b === "core") return 1;
        return a.localeCompare(b);
    });

    // Fill the rows
    sortedRepos.forEach((repo) => {
        const status = statuses[repo];

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

        // Adapter config column (core doesn't need an adapter)
        let adapterConfigDisplay = status.hasAdapter ? "✓" : "✘";
        let adapterConfigColor = status.hasAdapter ? colors.green : colors.red;

        // Special case for core
        if (repo === "core") {
            adapterConfigDisplay = "N/A";
            adapterConfigColor = colors.dim;
        }

        // Truncate long branch names
        let branchName = status.branch;
        const maxBranchLength = 23; // Leave room for ellipsis
        if (branchName.length > maxBranchLength) {
            branchName = branchName.substring(0, maxBranchLength) + "…";
        }

        // Add row with special highlighting for core
        const repoColor = repo === "core"
            ? (str: string) => colors.bold(colors.yellow(str))
            : colors.cyan;

        table.rows.push([
            { content: repo, color: repoColor },
            { content: branchName, color: undefined },
            { content: changesDisplay, color: changesColor },
            { content: remoteDisplay, color: remoteColor },
            { content: adapterConfigDisplay, color: adapterConfigColor },
        ]);
    });

    // Display the table header
    const headerRow = table.columns.map((col) => createCell(col.header, col.width, colors.bold))
        .join("");
    console.log(headerRow);

    // Display a divider
    const dividerWidth = table.columns.reduce((sum, col) => sum + col.width, 0);
    console.log("-".repeat(dividerWidth));

    // Display each row
    table.rows.forEach((row) => {
        const rowText = row.map((cell, i) =>
            createCell(cell.content, table.columns[i].width, cell.color)
        ).join("");
        console.log(rowText);
    });

    console.log("");
    console.log(
        colors.dim("Legend: ") +
            colors.green("✓") + colors.dim(" = clean/present, ") +
            colors.red("✘") + colors.dim(" = changes/missing, ") +
            colors.yellow("↑") + colors.dim(" = ahead, ") +
            colors.red("↓") + colors.dim(" = behind"),
    );
    console.log("");
}
