import { adaptAllRepositories } from "./adapter/adapt-all.ts";
import { watchAdapters } from "./adapter/watch.ts";
import { getUserConfirmation } from "./adapter/utils.ts";
import log from "../lib/log.ts";

/**
 * Task runner for Deno tasks
 */
if (import.meta.main) {
    const taskName = Deno.args[0];

    switch (taskName) {
        case "dev:adapter:watch": {
            await watchAdapters();
            break;
        }

        case "dev:adapter:commit": {
            log.info("Running adapt-all with commit...");

            // Get user confirmation before committing
            const confirmCommit = await getUserConfirmation(
                "This will commit changes to all adapter repositories. Continue? (y/n): ",
            );

            if (confirmCommit) {
                await adaptAllRepositories({ commit: true });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "dev:adapter:adapt": {
            log.info("Running adapt-all without commit...");
            await adaptAllRepositories({ commit: false });
            break;
        }

        default: {
            log.error(`Unknown task: ${taskName}`);
            log.info("Available tasks:");
            log.info("  - dev:adapter:watch: Watch for theme changes and adapt all repositories");
            log.info("  - dev:adapter:commit: Adapt all repositories and commit changes");
            log.info("  - dev:adapter:adapt: Adapt all repositories without committing");
            Deno.exit(1);
        }
    }
}
