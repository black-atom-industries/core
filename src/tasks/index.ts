import { generateAllRepositories } from "./adapters/generate.ts";
import { pushAllRepositories } from "./adapters/push-all.ts";
import { resetAllRepositories } from "./adapters/reset.ts";
import { showAdapterStatuses } from "./adapters/status.ts";
import { watch } from "./adapters/watch.ts";
import { getUserConfirmation, runCommand } from "./adapters/utils.ts";
import { config } from "../config.ts";
import log from "../lib/log.ts";

/**
 * Task runner for Deno tasks
 */
if (import.meta.main) {
    const taskName = Deno.args[0];

    switch (taskName) {
        case "adapters:gen": {
            log.info("Generating themes for adapters...");
            await generateAllRepositories({ commit: false });
            break;
        }

        case "adapters:watch": {
            await watch();
            break;
        }

        case "adapters:status": {
            await showAdapterStatuses();
            break;
        }

        case "adapters:commit": {
            // Parse optional -m "message" argument
            const messageIndex = Deno.args.indexOf("-m");
            const customMessage = messageIndex !== -1 ? Deno.args[messageIndex + 1] : undefined;
            const skipConfirmation = Deno.args.includes("-y");

            if (customMessage) {
                log.info(`Generating and committing with message: "${customMessage}"`);
            } else {
                log.info("Generating themes for all repositories with commit...");
            }

            const confirmCommit = skipConfirmation || await getUserConfirmation(
                "This will commit changes to all adapter repositories. Continue? (y/n): ",
            );

            if (confirmCommit) {
                await generateAllRepositories({ commit: true, message: customMessage });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "theme:commit": {
            // -y is our flag, everything else passes through to git commit
            const themeSkipConfirm = Deno.args.includes("-y");
            const gitArgs = Deno.args.slice(1).filter((arg) => arg !== "-y");

            // Extract -m message and --amend for adapter commits
            const themeMsgIndex = gitArgs.indexOf("-m");
            const themeMessage = themeMsgIndex !== -1 ? gitArgs[themeMsgIndex + 1] : undefined;
            const themeAmend = gitArgs.includes("--amend");

            const coreDir = config.dir.core;

            // Skip staged check when amending (git handles that)
            if (!themeAmend) {
                const stagedFiles = await runCommand(
                    ["git", "diff", "--staged", "--name-only"],
                    { cwd: coreDir },
                );

                if (stagedFiles.trim() === "") {
                    log.warn("No staged changes in core. Stage your theme changes first.");
                    Deno.exit(1);
                }

                log.info("Staged core files:");
                log.info(stagedFiles.trim());
            }

            const confirmThemeCommit = themeSkipConfirm || await getUserConfirmation(
                "This will commit staged core changes and regenerate all adapters. Continue? (y/n): ",
            );

            if (confirmThemeCommit) {
                await runCommand(["git", "commit", ...gitArgs], { cwd: coreDir });
                log.success("Core committed");

                await generateAllRepositories({
                    commit: true,
                    amend: themeAmend,
                    message: themeMessage,
                });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "adapters:commit:amend": {
            log.info("Generating themes for all repositories with commit and amending...");

            const confirmCommit = await getUserConfirmation(
                "This will commit changes to all adapter repositories and amend the last commit. Continue? (y/n): ",
            );

            if (confirmCommit) {
                await generateAllRepositories({ commit: true, amend: true });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "adapters:push": {
            log.info("Pushing all adapter repositories...");
            await pushAllRepositories();
            break;
        }

        case "adapters:reset": {
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
                "  - dev:adapters:gen: Generate themes for all repositories without committing",
            );
            log.info(
                "  - dev:adapters:multi-watch: Watch core and all adapter templates with intelligent routing",
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
