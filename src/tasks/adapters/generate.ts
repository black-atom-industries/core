import { forEachAdapter } from "./forEachAdapter.ts";
import { runCommand } from "./utils.ts";
import { getAdapters } from "../../lib/discover-adapters.ts";
import log from "../../lib/log.ts";
import { join } from "@std/path";
import { config } from "../../config.ts";

/**
 * Options for generating themes in repositories
 */
export interface AdaptRepositoriesOptions {
    /** Whether to commit changes (default: true) */
    commit?: boolean;
    /** Wether to to ammend the changes to the last commit (default: false) */
    amend?: boolean;
    /** Whether to log errors immediately (useful for initial generation) */
    logErrors?: boolean;
    /** Custom commit message (default: generic chore message) */
    message?: string;
}

/**
 * Generate themes for all repositories and optionally commit changes
 */
export async function generateAllRepositories({
    commit = true,
    amend = false,
    logErrors = false,
    message,
}: AdaptRepositoriesOptions = {}) {
    const results: { adapter: string; hasChanges: boolean; error?: string }[] = [];
    const adapters = await getAdapters();

    await forEachAdapter({
        adapters,
        cb: async ({ adapter, adapterDir }) => {
            try {
                // Use Deno directly with import map for proper module resolution
                const coreDir = config.dir.core;
                await runCommand([
                    "deno",
                    "run",
                    "-A",
                    "--config",
                    `${coreDir}/deno.json`,
                    `${coreDir}/src/cli/index.ts`,
                    "generate",
                ], { cwd: adapterDir });

                // Check for changes
                const gitStatus = await runCommand(["git", "status", "--porcelain"], {
                    cwd: adapterDir,
                });
                const hasChanges = gitStatus.trim() !== "";

                if (hasChanges) {
                    // Stage all changes to check diff
                    await runCommand(["git", "add", "-A"], { cwd: adapterDir });

                    // Get a summary of changes
                    const diffSummary = await runCommand(["git", "diff", "--staged", "--stat"], {
                        cwd: adapterDir,
                    });

                    if (commit) {
                        log.info(`Changes detected in ${adapter}, committing...`);
                        log.info(`Changes summary: \n${diffSummary.trim()}`);

                        // Commit changes with a descriptive message
                        const commitMessage = message ??
                            `chore: generate ${adapter} themes with latest core definitions`;

                        if (amend) {
                            await runCommand(["git", "commit", "--amend", "--no-edit"], {
                                cwd: adapterDir,
                            });
                        } else {
                            await runCommand(["git", "commit", "-m", commitMessage], {
                                cwd: adapterDir,
                            });
                        }

                        log.success(`Successfully committed changes to ${adapter}`);
                    } else {
                        // Reset staging since we're not committing
                        await runCommand(["git", "reset"], { cwd: adapterDir });
                    }
                }

                results.push({ adapter, hasChanges });
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : String(error);
                results.push({ adapter, hasChanges: false, error: errorMsg });

                // Log error immediately if requested (useful for initial generation)
                if (logErrors) {
                    log.error(`Error in ${adapter}: ${errorMsg}`);
                }
            }
        },
    });

    return results;
}

/**
 * Generate themes for a specific adapter using the existing generate command
 */
export async function generateSingleAdapter(
    adapterName: string,
): Promise<{ adapter: string; hasChanges: boolean; error?: string }> {
    const adapterDir = join(config.dir.org, adapterName);

    try {
        // Use Deno directly with import map for proper module resolution
        const coreDir = config.dir.core;
        await runCommand([
            "deno",
            "run",
            "-A",
            "--config",
            `${coreDir}/deno.json`,
            `${coreDir}/src/cli/index.ts`,
            "generate",
        ], { cwd: adapterDir });

        // Check for changes
        const gitStatus = await runCommand(["git", "status", "--porcelain"], { cwd: adapterDir });
        const hasChanges = gitStatus.trim() !== "";

        if (hasChanges) {
            // Reset staging since we're not committing
            await runCommand(["git", "reset"], { cwd: adapterDir });
        }

        return { adapter: adapterName, hasChanges };
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        return { adapter: adapterName, hasChanges: false, error: errorMsg };
    }
}
