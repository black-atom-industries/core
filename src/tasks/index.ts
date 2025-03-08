import { watchAdapters } from "./adapters/watch.ts";
import { adaptAllRepositories } from "./adapters/adapt-all.ts";
import { pushAllRepositories } from "./adapters/push-all.ts";
import { showAdapterStatuses } from "./adapters/status.ts";
import { getUserConfirmation } from "./adapters/utils.ts";
import log from "../lib/log.ts";

/**
 * Task runner for Deno tasks
 */
if (import.meta.main) {
    const taskName = Deno.args[0];

    switch (taskName) {
        case "dev:adapters:watch": {
            await watchAdapters();
            break;
        }

        case "dev:adapters:commit": {
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

        case "dev:adapters:adapt": {
            log.info("Running adapt-all without commit...");
            await adaptAllRepositories({ commit: false });
            break;
        }

        case "dev:adapters:push": {
            log.info("Pushing all adapter repositories...");
            await pushAllRepositories();
            break;
        }

        case "dev:adapters:status": {
            await showAdapterStatuses();
            break;
        }

        default: {
            log.error(`Unknown task: ${taskName}`);
            log.info("Available tasks:");
            log.info("  - dev:adapters:watch: Watch for theme changes and adapt all repositories");
            log.info("  - dev:adapters:commit: Adapt all repositories and commit changes");
            log.info("  - dev:adapters:adapt: Adapt all repositories without committing");
            log.info(
                "  - dev:adapters:push: Push all repositories (aborts if uncommitted changes)",
            );
            log.info("  - dev:adapters:status: Show status overview of all repositories");
            Deno.exit(1);
        }
    }
}
