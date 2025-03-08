import { forEachAdapter, runCommand } from "./utils.ts";
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

    await forEachAdapter(
        async ({ adapter, adapterName }) => {
            try {
                // Check for uncommitted changes
                const gitStatus = await runCommand(["git", "status", "--porcelain"]);
                const hasChanges = gitStatus.trim() !== "";

                if (hasChanges) {
                    reposWithChanges.push(adapter);

                    if (!autoStash) {
                        log.warn(`Local changes detected in ${adapterName}.`);
                        log.info("Uncommitted changes:");
                        log.info(gitStatus);

                        // Don't reset this repository, move to the next one
                        return {
                            continue: false,
                            message:
                                `Skipping reset for ${adapterName} due to local changes. Use --auto-stash to stash changes automatically.`,
                        };
                    }

                    // Auto-stash changes if requested
                    log.info(`Stashing changes in ${adapterName}...`);
                    await runCommand([
                        "git",
                        "stash",
                        "save",
                        `Auto-stashed by black-atom-core reset task`,
                    ]);
                    reposStashed.push(adapter);
                    log.success(`Changes stashed in ${adapterName}`);
                }

                // Check if we're tracking a remote branch
                const hasRemote = await runCommand([
                    "git",
                    "rev-parse",
                    "--abbrev-ref",
                    "--symbolic-full-name",
                    "@{u}",
                ]).then(() => true).catch(() => false);

                if (!hasRemote) {
                    log.warn(
                        `No remote tracking branch found for ${adapterName}. Cannot reset to remote.`,
                    );
                    reposFailed.push(adapter);
                    return { continue: false };
                }

                // Fetch latest from remote
                log.info(`Fetching latest changes for ${adapterName}...`);
                await runCommand(["git", "fetch"]);

                // Reset to remote
                log.info(`Resetting ${adapterName} to remote state...`);
                await runCommand(["git", "reset", "--hard", "@{u}"]);

                reposReset.push(adapter);
                log.success(`Successfully reset ${adapterName} to remote state`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                log.error(`Error resetting ${adapter}: ${errorMessage}`);
                reposFailed.push(adapter);
                return { continue: false };
            }

            return { continue: true };
        },
        { title: "Checking adapter repositories..." },
    );

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
