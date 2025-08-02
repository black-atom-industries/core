import { dirname, join } from "@std/path";
import { existsSync } from "@std/fs";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { generateAllRepositories, generateSingleAdapter } from "./generate-all.ts";

/**
 * Watch for changes in core themes and adapter template directories.
 * Triggers regeneration when any relevant file changes.
 */
export async function watchAdapters() {
    const coreThemesDir = config.dir.themes;

    // Resolve organization directory and get adapter template directories
    const orgDir = config.dir.org || join(dirname(config.dir.core), config.orgName);
    const watchDirs: string[] = [coreThemesDir];

    // Add adapter template directories
    for (const adapter of config.adapters) {
        const adapterDir = join(orgDir, adapter);
        const adapterThemesDir = join(adapterDir, "themes");

        if (existsSync(adapterThemesDir)) {
            watchDirs.push(adapterThemesDir);
        }
    }

    log.info(`Watching for changes in:`);
    watchDirs.forEach((dir) => {
        const relativePath = dir.replace(dirname(orgDir) + "/", "");
        log.info(`  📁 ${relativePath}`);
    });
    log.info("Press Ctrl+C to stop watching");

    // Run initial generation to ensure everything is in sync
    log.hr_thick("🚀 Running initial generation...");
    try {
        await generateAllRepositories({ commit: false, logErrors: true });
        log.success("Initial generation completed successfully");
    } catch (error) {
        log.error(
            `Initial generation failed: ${error instanceof Error ? error.message : String(error)}`,
        );
        log.info("Continuing with file watching...");
    }

    log.info(`👁️  Now watching for file changes...`);

    // Files to ignore
    const ignorePatterns = [
        /\.DS_Store$/,
        /~$/,
        /\.swp$/,
        /\.swo$/,
        /\.tmp$/,
        /\.git\//,
        /node_modules\//,
        /\.vscode\//,
        /\.idea\//,
        /\#.*\#$/, // Emacs temp files
        /\.#/, // Emacs lock files
    ];

    // Check if a file should be ignored
    const shouldIgnoreFile = (path: string): boolean => {
        return ignorePatterns.some((pattern) => pattern.test(path));
    };

    // Check if a file is a template file or core theme file
    const isRelevantFile = (path: string): boolean => {
        // Core theme files (in core/src/themes/)
        if (path.includes(coreThemesDir) && path.endsWith(".ts")) {
            return true;
        }

        // Template files (*.template.* in adapter themes directories)
        if (path.includes("/themes/") && path.includes(".template.")) {
            return true;
        }

        return false;
    };

    // Set up graceful shutdown
    const abortController = new AbortController();

    // Handle Ctrl+C gracefully
    Deno.addSignalListener("SIGINT", () => {
        log.info("\n🛑 Shutting down watch process...");

        // Clear all pending timers
        for (const timer of pendingChanges.values()) {
            clearTimeout(timer);
        }
        pendingChanges.clear();

        abortController.abort();
        log.info("Watch process terminated.");
        Deno.exit(0);
    });

    // Debouncing for file changes
    const pendingChanges = new Map<string, number>();
    const debounceMs = 300; // 300ms debounce

    // Handle file change events
    const handleFileChange = (changedPath: string) => {
        // Filter out ignored files and only include relevant files
        if (shouldIgnoreFile(changedPath) || !isRelevantFile(changedPath)) {
            return;
        }

        // Clear any existing timer for this file
        const existingTimer = pendingChanges.get(changedPath);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        // Set a new timer for this file
        const timer = setTimeout(async () => {
            pendingChanges.delete(changedPath);
            await processFileChange(changedPath);
        }, debounceMs);

        pendingChanges.set(changedPath, timer);
    };

    // Process individual file changes
    const processFileChange = async (changedPath: string) => {
        // Get changed file name and directory for display
        const changedFile = changedPath.split("/").pop() || "unknown";
        const isTemplate = changedPath.includes("/themes/") && !changedPath.includes("/core/");

        if (isTemplate) {
            // Extract adapter name and relative path
            const pathParts = changedPath.split("/");
            const adapterIndex = pathParts.findIndex((part) => part === "themes") - 1;
            const adapterName = adapterIndex >= 0 ? pathParts[adapterIndex] : "unknown";

            // Get the relative path from themes onwards
            const themesIndex = pathParts.findIndex((part) => part === "themes");
            const relativePath = themesIndex >= 0
                ? pathParts.slice(themesIndex).join("/")
                : changedFile;

            log.info(
                `📝 [${adapterName}] template changed (${relativePath}) → regenerating ${adapterName}...`,
            );

            try {
                const result = await generateSingleAdapter(adapterName);

                if (result.error) {
                    log.error(`⚠️ Encountered error: ${result.error}`);
                    log.warn(`⚠️ ${adapterName} not updated - Waiting for fix...`);
                } else if (result.hasChanges) {
                    log.success(`✅ ${adapterName} updated successfully`);
                } else {
                    log.info(`ℹ️ ${adapterName} - no changes needed`);
                }
            } catch (error) {
                log.error(
                    `❌ Generation failed: ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                );
            }
        } else {
            log.info(`🎨 Core theme changed (${changedFile}) → regenerating all adapters...`);

            try {
                const results = await generateAllRepositories({ commit: false });

                // Show concise summary
                const changedAdapters = results.filter((r) => r.hasChanges).length;
                const errorAdapters = results.filter((r) => r.error);

                if (errorAdapters.length > 0) {
                    // Extract the first error and make it more user-friendly
                    const firstError = errorAdapters[0].error;
                    const cleanError = firstError?.includes("Template contains undefined variable:")
                        ? firstError
                        : "Template error occurred";

                    log.error(`⚠️ Encountered error: ${cleanError}`);
                    log.warn(`⚠️ ${changedAdapters} adapters updated partially`);
                } else {
                    log.success(`✅ ${changedAdapters} adapters updated successfully`);
                }
            } catch (error) {
                log.error(
                    `❌ Generation failed: ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                );
            }
        }
    };

    // Create and start watchers for all directories
    const startWatchers = async () => {
        const watchers = [];

        for (const dir of watchDirs) {
            const watcherPromise = (async () => {
                const watcher = Deno.watchFs(dir, { recursive: true });

                for await (const event of watcher) {
                    if (abortController.signal.aborted) break;

                    if (event.kind === "modify" || event.kind === "create") {
                        for (const path of event.paths) {
                            handleFileChange(path);
                        }
                    }
                }
            })();

            watchers.push(watcherPromise);
        }

        // Wait for any watcher to complete (which should only happen on abort or error)
        await Promise.race(watchers);
    };

    // Main watch loop with restart capability
    while (!abortController.signal.aborted) {
        try {
            await startWatchers();

            // If we get here, the watchers closed unexpectedly
            if (!abortController.signal.aborted) {
                log.warn("File watchers closed unexpectedly, restarting...");
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (error) {
            if (!abortController.signal.aborted) {
                log.error(`Watch error: ${error instanceof Error ? error.message : String(error)}`);
                log.info("Restarting file watchers in 2 seconds...");
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    }

    log.info("Watch process terminated.");
}
