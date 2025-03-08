import * as colors from "@std/fmt/colors";
import { forEachAdapter, runCommand } from "./utils.ts";
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
 * Show status overview of all adapter repositories
 */
export async function showAdapterStatuses(): Promise<void> {
    // Store statuses to display a summary table at the end
    const statuses: Record<string, RepoStatus> = {};

    await forEachAdapter(
        async ({ adapter }) => {
            // Initialize status object
            statuses[adapter] = {
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
                statuses[adapter].hasAdapter = result.isFile;
            } catch {
                statuses[adapter].hasAdapter = false;
            }

            // Get current branch
            const branch = await runCommand(["git", "rev-parse", "--abbrev-ref", "HEAD"])
                .then((output) => output.trim())
                .catch(() => "unknown");

            statuses[adapter].branch = branch;

            // Check for uncommitted changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);
            statuses[adapter].changes = gitStatus.trim() !== "";

            // Check for remote tracking branch
            const hasRemote = await runCommand([
                "git",
                "rev-parse",
                "--abbrev-ref",
                "--symbolic-full-name",
                "@{u}",
            ]).then(() => true).catch(() => false);

            statuses[adapter].hasRemote = hasRemote;

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

                statuses[adapter].ahead = parseInt(revList[0] || "0", 10);
                statuses[adapter].behind = parseInt(revList[1] || "0", 10);
            }

            // No need to show detailed status per adapter
            // We'll show a summary table at the end
            return { continue: true };
        },
        { title: "Checking adapter repository statuses..." },
    );

    // Display summary table
    log.hr_thick(" Adapter Repositories Status ");
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
            { header: "Adapter", width: 25 },
            { header: "Branch", width: 15 },
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

    // Fill the rows
    Object.entries(statuses).forEach(([adapter, status]) => {
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
        const adapterConfigDisplay = status.hasAdapter ? "✓" : "✘";
        const adapterConfigColor = status.hasAdapter ? colors.green : colors.red;

        // Add row
        table.rows.push([
            { content: adapter, color: colors.cyan },
            { content: status.branch, color: undefined },
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
    console.log("-".repeat(table.columns.reduce((sum, col) => sum + col.width, 0)));

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
