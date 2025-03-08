import adapt from "../../commands/adapt.ts";
import { forEachAdapter, runCommand } from "./utils.ts";
import log from "../../lib/log.ts";

/**
 * Options for adapting repositories
 */
export interface AdaptRepositoriesOptions {
    /** Whether to commit changes (default: true) */
    commit?: boolean;
}

/**
 * Adapt all repositories and optionally commit changes
 */
export async function adaptAllRepositories(options: AdaptRepositoriesOptions = {}) {
    const { commit = true } = options;

    const title = commit
        ? "Running adapt-all with commit..."
        : "Running adapt-all without commit...";

    await forEachAdapter(
        async ({ adapter, adapterName }) => {
            await adapt();

            // Check for changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);

            if (gitStatus.trim() !== "") {
                // Stage all changes to check diff
                await runCommand(["git", "add", "-A"]);

                // Get a summary of changes
                const diffSummary = await runCommand(["git", "diff", "--staged", "--stat"]);

                if (commit) {
                    log.info(`Changes detected in ${adapterName}, committing...`);
                    log.info(`Changes summary: \n${diffSummary.trim()}`);

                    // Commit changes with a descriptive message
                    const commitMessage =
                        `chore: adapt ${adapter} themes with latest core definitions`;

                    await runCommand([
                        "git",
                        "commit",
                        "-m",
                        commitMessage,
                        "-m",
                        "Auto-adapted by black-atom-core",
                        "-m",
                        `🤖 Adapted with black-atom-core`,
                    ]);

                    log.success(`Successfully committed changes to ${adapter}`);
                } else {
                    log.info(`Changes detected in ${adapterName}, but not committing.`);

                    // Reset staging since we're not committing
                    await runCommand(["git", "reset"]);
                }
            } else {
                log.info(`No changes detected in ${adapterName}`);
            }
        },
        { title },
    );
}

