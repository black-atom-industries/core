import { forEachAdapter } from "./forEachAdapter.ts";
import { runCommand } from "./utils.ts";
import { getAdapters } from "../../lib/discover-adapters.ts";
import log from "../../lib/log.ts";

/**
 * Push all adapter repositories, aborting if uncommitted changes exist
 */
export async function pushAllRepositories(gitArgs: string[] = []) {
    const adapters = await getAdapters();

    await forEachAdapter({
        adapters,
        cb: async ({ adapter, adapterDir }) => {
            // Check for uncommitted changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"], {
                cwd: adapterDir,
            });

            if (gitStatus.trim() !== "") {
                log.error(`Uncommitted changes detected in ${adapter}. Aborting push.`);
                log.info(
                    "Please commit changes manually or run 'deno task dev:adapter:commit' first.",
                );
                log.info(`Changes:\n${gitStatus}`);
                return;
            }

            // Check if we're tracking a remote branch
            const trackingBranch = await runCommand([
                "git",
                "rev-parse",
                "--abbrev-ref",
                "--symbolic-full-name",
                "@{u}",
            ], { cwd: adapterDir }).catch(() => "");

            if (!trackingBranch) {
                log.warn(`No tracking branch found for ${adapter}. Skipping push.`);
                return;
            }

            // Push changes
            log.info(`Pushing ${adapter} to remote...`);
            await runCommand(["git", "push", ...gitArgs], { cwd: adapterDir });
            log.success(`Successfully pushed ${adapter} to remote`);
        },
    });
}
