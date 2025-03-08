import { watchAdapters } from "./adapter/watch.ts";
import { adaptAllRepositories } from "./adapter/adapt-all.ts";
import { pushAllRepositories } from "./adapter/push-all.ts";
import { showAdapterStatuses } from "./adapter/status.ts";
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

        case "dev:adapter:push": {
            log.info("Pushing all adapter repositories...");
            await pushAllRepositories();
            break;
        }

        case "dev:adapter:status": {
            await showAdapterStatuses();
            break;
        }

        default: {
            log.error(`Unknown task: ${taskName}`);
            log.info("Available tasks:");
            log.info("  - dev:adapter:watch: Watch for theme changes and adapt all repositories");
            log.info("  - dev:adapter:commit: Adapt all repositories and commit changes");
            log.info("  - dev:adapter:adapt: Adapt all repositories without committing");
            log.info("  - dev:adapter:push: Push all repositories (aborts if uncommitted changes)");
            log.info("  - dev:adapter:status: Show status overview of all adapter repositories");
            Deno.exit(1);
        }
    }
}
