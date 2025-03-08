import * as colors from "@std/fmt/colors";
import { dirname, join } from "@std/path";
import { existsSync } from "@std/fs";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { runCommand } from "./utils.ts";

/**
 * Push all adapter repositories, aborting if uncommitted changes exist
 */
export async function pushAllRepositories() {
    const actualOrgDir = config.dir.org || join(dirname(config.dir.core), config.orgName);

    if (!existsSync(actualOrgDir)) {
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

            // Check for uncommitted changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);

            if (gitStatus.trim() !== "") {
                log.error(`Uncommitted changes detected in ${adapterName}. Aborting push.`);
                log.info(
                    "Please commit changes manually or run 'deno task dev:adapter:commit' first.",
                );
                log.info(`Changes:\n${gitStatus}`);
                Deno.chdir(originalDir);
                continue;
            }

            // Check if we're tracking a remote branch
            const trackingBranch = await runCommand([
                "git",
                "rev-parse",
                "--abbrev-ref",
                "--symbolic-full-name",
                "@{u}",
            ]).catch(() => "");

            if (!trackingBranch) {
                log.warn(`No tracking branch found for ${adapterName}. Skipping push.`);
                Deno.chdir(originalDir);
                continue;
            }

            // Push changes
            log.info(`Pushing ${adapterName} to remote...`);
            await runCommand(["git", "push"]);
            log.success(`Successfully pushed ${adapterName} to remote`);

            // Return to original directory
            Deno.chdir(originalDir);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            log.error(`Error processing adapter ${adapter}: ${errorMessage}`);

            // Return to original core directory
            Deno.chdir(config.dir.core);
        }
    }

    log.hr_thin(" Done");
}

