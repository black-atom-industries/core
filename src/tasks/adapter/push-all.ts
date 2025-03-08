import { forEachAdapter, runCommand } from "./utils.ts";
import log from "../../lib/log.ts";

/**
 * Push all adapter repositories, aborting if uncommitted changes exist
 */
export async function pushAllRepositories() {
    await forEachAdapter(
        async ({ adapterName }) => {
            // Check for uncommitted changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);

            if (gitStatus.trim() !== "") {
                log.error(`Uncommitted changes detected in ${adapterName}. Aborting push.`);
                log.info(
                    "Please commit changes manually or run 'deno task dev:adapter:commit' first.",
                );
                log.info(`Changes:\n${gitStatus}`);

                return { continue: false };
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
                return { continue: false };
            }

            // Push changes
            log.info(`Pushing ${adapterName} to remote...`);
            await runCommand(["git", "push"]);
            log.success(`Successfully pushed ${adapterName} to remote`);
        },
        { title: "Pushing all adapter repositories..." },
    );
}
