import * as colors from "@std/fmt/colors";
import { dirname, join } from "@std/path";
import { existsSync } from "@std/fs";
import adapt from "../../commands/adapt.ts";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { runCommand } from "./utils.ts";

/**
 * Options for adapting repositories
 */
export interface AdaptRepositoriesOptions {
    /** Optional custom organization directory path */
    orgDir?: string;
    /** Whether to commit changes (default: true) */
    commit?: boolean;
}

/**
 * Adapt all repositories and optionally commit changes
 */
export async function adaptAllRepositories(options: AdaptRepositoriesOptions = {}) {
    const { commit = true, orgDir } = options;

    // Use provided orgDir or get from config
    const actualOrgDir = orgDir || config.dir.org || join(dirname(config.dir.core), config.orgName);

    if (!orgDir && !existsSync(actualOrgDir)) {
        log.error(`Organization directory not found: ${actualOrgDir}`);
        log.error(
            `Please ensure you are running this command from within the ${config.orgName} directory structure`,
        );
        Deno.exit(1);
    }

    // Iterate through each adapter
    for (const adapter of config.adapters) {
        const adapterName = colors.bold(colors.brightMagenta(adapter));
        const adapterDir = join(actualOrgDir, adapter);

        // Check if adapter directory exists
        if (!existsSync(adapterDir)) {
            log.warn(`Adapter directory not found: ${adapterDir} - skipping`);
            continue;
        }

        log.hr_thin(adapterName);

        try {
            // Save current directory
            const originalDir = Deno.cwd();

            // Change to adapter directory
            Deno.chdir(adapterDir);
            log.info(`Changed to directory: ${adapterDir}`);

            await adapt();

            // Check for changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);

            // Show more detailed change info for debugging
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

            // Return to original directory
            Deno.chdir(originalDir);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            log.error(`Error processing adapter ${adapter}: ${errorMessage}`);
        }
    }

    log.hr_thin(" Done");
}
