import * as colors from "@std/fmt/colors";
import { dirname, join } from "@std/path";
import { existsSync } from "@std/fs";
import adapt from "../../commands/adapt.ts";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { runCommand } from "./utils.ts";
import { loadThemeMap } from "../../lib/theme-loader.ts";

/**
 * Adapt all repositories and optionally commit changes
 */
export async function adaptAllRepositories(orgDir?: string, shouldCommit = true) {
    // Use provided orgDir or determine it
    const coreDir = Deno.cwd();
    const actualOrgDir = orgDir || join(dirname(dirname(coreDir)), "black-atom-industries");

    if (!orgDir && !existsSync(actualOrgDir)) {
        log.error(`Organization directory not found: ${actualOrgDir}`);
        log.error(
            "Please ensure you are running this command from within the black-atom-industries directory structure",
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

            // Dynamically load the latest theme definitions
            const themeMap = await loadThemeMap();

            // Run adapt command with fresh theme data
            await adapt(themeMap);

            // Check for changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);

            // Show more detailed change info for debugging
            if (gitStatus.trim() !== "") {
                // Stage all changes to check diff
                await runCommand(["git", "add", "-A"]);

                // Get a summary of changes
                const diffSummary = await runCommand(["git", "diff", "--staged", "--stat"]);

                if (shouldCommit) {
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
