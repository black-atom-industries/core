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

        case "adapters:dev": {
            await watch();
            break;
        }

        case "adapters:status": {
            await showAdapterStatuses();
            break;
        }

        case "adapters:commit": {
            const adapterGitArgs = Deno.args.slice(1);

            log.info("Generating themes for all repositories with commit...");

            const confirmCommit = await getUserConfirmation(
                "This will commit changes to all adapter repositories. Continue? (y/n): ",
            );

            if (confirmCommit) {
                await generateAllRepositories({ commit: true, gitCommitArgs: adapterGitArgs });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "theme:commit": {
            const gitArgs = Deno.args.slice(1);

            // Extract -m message and --amend for adapter commits
            const themeMsgIndex = gitArgs.indexOf("-m");
            const themeMessage = themeMsgIndex !== -1 ? gitArgs[themeMsgIndex + 1] : undefined;
            const themeAmend = gitArgs.includes("--amend");

            const coreDir = config.dir.core;
            const stagedFiles = await runCommand(
                ["git", "diff", "--staged", "--name-only"],
                { cwd: coreDir },
            );

            if (stagedFiles.trim() === "") {
                if (!themeAmend) {
                    log.warn("No staged changes in core. Stage your theme changes first.");
                    Deno.exit(1);
                }
            } else {
                log.info("Staged core files:");
                log.info(stagedFiles.trim());
            }

            const confirmThemeCommit = await getUserConfirmation(
                "This will commit staged core changes and regenerate all adapters. Continue? (y/n): ",
            );

            if (confirmThemeCommit) {
                await runCommand(["git", "commit", ...gitArgs], { cwd: coreDir });
                log.success("Core committed");

                // Build adapter git args from user flags
                const adapterArgs: string[] = [];
                if (themeAmend) adapterArgs.push("--amend");
                if (themeMessage) adapterArgs.push("-m", themeMessage);

                await generateAllRepositories({
                    commit: true,
                    gitCommitArgs: adapterArgs,
                });
            } else {
                log.info("Operation cancelled");
            }
            break;
        }

        case "adapters:push": {
            const pushGitArgs = Deno.args.slice(1);
            log.info("Pushing all adapter repositories...");
            await pushAllRepositories(pushGitArgs);
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
