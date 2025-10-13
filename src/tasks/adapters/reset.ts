import { forEachAdapter } from "./forEachAdapter.ts";
import { runCommand } from "./utils.ts";
import { getAdapters } from "../../lib/discover-adapters.ts";
import log from "../../lib/log.ts";

/**
 * Options for resetting adapters
 */
export interface ResetOptions {
    /** Whether to automatically stash changes (default: false) */
    autoStash?: boolean;
}

/**
 * Reset all adapter repositories to their remote status,
 * discarding or stashing any local changes
 */
export async function resetAllRepositories(options: ResetOptions = {}): Promise<void> {
    const { autoStash = false } = options;

    // Track repositories with changes for summary
    const reposWithChanges: string[] = [];
    const reposStashed: string[] = [];
    const reposReset: string[] = [];
    const reposFailed: string[] = [];

    const adapters = await getAdapters();

    await forEachAdapter({
        adapters,
        cb: async ({ adapter, adapterDir }) => {
            try {
                // Check for uncommitted changes
                const gitStatus = await runCommand(["git", "status", "--porcelain"], {
                    cwd: adapterDir,
                });
                const hasChanges = gitStatus.trim() !== "";

                if (hasChanges) {
                    reposWithChanges.push(adapter);

                    if (!autoStash) {
                        log.warn(`Local changes detected in ${adapter}.`);
                        log.info("Uncommitted changes:");
                        log.info(gitStatus);
                        log.info(
                            `Skipping reset for ${adapter} due to local changes. Use --auto-stash to stash changes automatically.`,
                        );
                        return;
                    }

                    // Auto-stash changes if requested
                    log.info(`Stashing changes in ${adapter}...`);
                    await runCommand([
                        "git",
                        "stash",
                        "save",
                        `Auto-stashed by black-atom-core reset task`,
                    ], { cwd: adapterDir });
                    reposStashed.push(adapter);
                    log.success(`Changes stashed in ${adapter}`);
                }

                // Check if we're tracking a remote branch
                const hasRemote = await runCommand([
                    "git",
                    "rev-parse",
                    "--abbrev-ref",
                    "--symbolic-full-name",
                    "@{u}",
                ], { cwd: adapterDir }).then(() => true).catch(() => false);

                if (!hasRemote) {
                    log.warn(
                        `No remote tracking branch found for ${adapter}. Cannot reset to remote.`,
                    );
                    reposFailed.push(adapter);
                    return;
                }

                // Fetch latest from remote
                log.info(`Fetching latest changes for ${adapter}...`);
                await runCommand(["git", "fetch"], { cwd: adapterDir });

                // Reset to remote
                log.info(`Resetting ${adapter} to remote state...`);
                await runCommand(["git", "reset", "--hard", "@{u}"], { cwd: adapterDir });

                reposReset.push(adapter);
                log.success(`Successfully reset ${adapter} to remote state`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                log.error(`Error resetting ${adapter}: ${errorMessage}`);
                reposFailed.push(adapter);
            }
        },
    });

    // Display summary
    log.hr_thick(" Reset Summary ");

    if (reposWithChanges.length > 0) {
        log.info(`Repositories with local changes: ${reposWithChanges.length}`);
        reposWithChanges.forEach((repo) =>
            log.info(`  - ${repo}${reposStashed.includes(repo) ? " (stashed)" : " (skipped)"}`)
        );
    } else {
        log.info("No repositories had local changes");
    }

    if (reposReset.length > 0) {
        log.success(`Repositories reset to remote: ${reposReset.length}`);
        reposReset.forEach((repo) => log.info(`  - ${repo}`));
    }

    if (reposFailed.length > 0) {
        log.error(`Failed to reset repositories: ${reposFailed.length}`);
        reposFailed.forEach((repo) => log.info(`  - ${repo}`));
    }
}
