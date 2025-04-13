import { watchAdapters } from "./adapters/watch.ts";
import { generateAllRepositories } from "./adapters/generate-all.ts";
import { pushAllRepositories } from "./adapters/push-all.ts";
import { resetAllRepositories } from "./adapters/reset.ts";
import { showAdapterStatuses } from "./adapters/status.ts";
import { getUserConfirmation } from "./adapters/utils.ts";
import log from "../lib/log.ts";

/**
 * Task runner for Deno tasks
 */
if (import.meta.main) {
    const taskName = Deno.args[0];

    switch (taskName) {
        case "dev:adapters:generate": {
            log.info("Generating themes for all repositories without commit...");
            await generateAllRepositories({ commit: false });
            break;
        }

        case "dev:adapters:generate:watch": {
            await watchAdapters();
            break;
        }

        case "dev:adapters:status": {
            await showAdapterStatuses();
            break;
        }

        case "dev:adapters:commit": {
            log.info("Generating themes for all repositories with commit...");

            const confirmCommit = await getUserConfirmation(
                "This will commit changes to all adapter repositories. Continue? (y/n): ",
            );

            if (confirmCommit) {
                await generateAllRepositories({ commit: true });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "dev:adapters:push": {
            log.info("Pushing all adapter repositories...");
            await pushAllRepositories();
            break;
        }

        case "dev:adapters:reset": {
            log.info("Checking adapters for reset...");

            // Parse args to see if auto-stash is requested
            const autoStash = Deno.args.includes("--auto-stash");

            if (!autoStash) {
                const confirm = await getUserConfirmation(
                    "This will reset all adapter repositories to their remote state. " +
                        "Local changes will be lost. Continue? (y/n): ",
                );

                if (!confirm) {
                    log.info("Operation cancelled");
                    break;
                }
            }

            await resetAllRepositories({ autoStash });
            break;
        }

        default: {
            log.error(`Unknown task: ${taskName}`);
            log.info("Available tasks:");
            log.info(
                "  - dev:adapters:generate: Generate themes for all repositories without committing",
            );
            log.info(
                "  - dev:adapters:generate:watch: Watch for theme changes and generate for all repositories",
            );
            log.info("  - dev:adapters:status: Show status overview of all repositories");
            log.info(
                "  - dev:adapters:commit: Generate themes for all repositories and commit changes",
            );
            log.info(
                "  - dev:adapters:push: Push all repositories (aborts if uncommitted changes)",
            );
            log.info(
                "  - dev:adapters:reset: Reset repositories to remote state (use --auto-stash to stash changes)",
            );
            Deno.exit(1);
        }
    }
}
