import { dirname, join, relative } from "@std/path";
import { existsSync } from "@std/fs";
import * as colors from "@std/fmt/colors";
import { config } from "../../config.ts";
import { adapterConfigSchema } from "../../lib/validate-adapter.ts";
import log from "../../lib/log.ts";
import { generateAllRepositories, generateSingleAdapter } from "./generate-all.ts";

/**
 * Multi-directory file watcher that handles both core theme changes and adapter template changes.
 * - Core theme changes → regenerate all adapters
 * - Adapter template changes → regenerate only that specific adapter
 */
export async function watch() {
    const coreThemesDir = config.dir.themes;
    const orgDir = config.dir.org || join(dirname(config.dir.core), config.orgName);

    // Collect all directories to watch
    const watchDirs: {
        path: string;
        type: "core" | "adapter";
        adapterName?: string;
        templatePaths?: string[];
    }[] = [
        { path: coreThemesDir, type: "core" },
    ];

    // Add adapter template directories by reading their configurations
    for (const adapter of config.adapters) {
        const adapterDir = join(orgDir, adapter);
        const adapterConfigPath = join(adapterDir, config.adapterFileName);

        if (existsSync(adapterConfigPath)) {
            try {
                const adapterConfigText = await Deno.readTextFile(adapterConfigPath);
                const adapterConfig = adapterConfigSchema.parse(JSON.parse(adapterConfigText));

                // Collect all template paths from this adapter
                const templatePaths: string[] = [];
                if (adapterConfig.collections) {
                    for (const collection of Object.values(adapterConfig.collections)) {
                        if (collection?.template) {
                            const fullTemplatePath = join(adapterDir, collection.template);
                            templatePaths.push(fullTemplatePath);
                        }
                    }
                }

                if (templatePaths.length > 0) {
                    // Watch the entire adapter directory but track the specific template paths
                    watchDirs.push({
                        path: adapterDir,
                        type: "adapter",
                        adapterName: adapter,
                        templatePaths,
                    });
                }
            } catch (error) {
                log.warn(`⚠️ Could not read adapter config for ${adapter}: ${error}`);
            }
        }
    }

    log.info(`👁️  Multi-adapter watching enabled:`);
    watchDirs.forEach((dir) => {
        const relativePath = relative(dirname(orgDir), dir.path);
        if (dir.type === "core") {
            log.info(`  ${colors.cyan("🎨 CORE")}: ${colors.dim(relativePath)}`);
        } else {
            const templateCount = dir.templatePaths?.length || 0;
            const adapterLabel = colors.magenta(`🔧 ${dir.adapterName?.toUpperCase()}`);
            log.info(
                `  ${adapterLabel}: ${colors.dim(relativePath)} ${
                    colors.yellow(`(${templateCount} templates)`)
                }`,
            );
        }
    });
    log.info("Press Ctrl+C to stop watching");

    // Run initial generation
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

    log.info(`👀 Now watching for file changes...`);

    // File patterns to ignore
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

    const shouldIgnoreFile = (path: string): boolean => {
        return ignorePatterns.some((pattern) => pattern.test(path));
    };

    const isRelevantFile = (path: string): boolean => {
        // Core theme files (in core/src/themes/)
        if (path.includes(coreThemesDir) && path.endsWith(".ts")) {
            return true;
        }

        // Check if this path matches any of the adapter template paths
        for (const watchDir of watchDirs) {
            if (watchDir.type === "adapter" && watchDir.templatePaths) {
                for (const templatePath of watchDir.templatePaths) {
                    if (path === templatePath || path.includes(".template.")) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    // Debouncing
    const pendingChanges = new Map<string, number>();
    const debounceMs = 300;

    const processFileChange = async (changedPath: string) => {
        const changedFile = changedPath.split("/").pop() || "unknown";

        // Determine if this is a core change or adapter change
        const isCorePath = changedPath.includes(coreThemesDir);

        if (isCorePath) {
            const coreLabel = colors.cyan("🎨 [CORE]");
            const fileName = colors.yellow(changedFile);
            log.info(
                `${coreLabel} theme changed (${fileName}) → regenerating ${
                    colors.bold("all adapters")
                }...`,
            );

            try {
                const results = await generateAllRepositories({ commit: false });
                const changedAdapters = results.filter((r) => r.hasChanges).length;
                const errorAdapters = results.filter((r) => r.error);

                if (errorAdapters.length > 0) {
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
        } else {
            // Find which adapter this template belongs to
            const adapterInfo = watchDirs.find((dir) =>
                dir.type === "adapter" &&
                dir.templatePaths?.some((templatePath) =>
                    changedPath === templatePath || changedPath.includes(".template.")
                )
            );

            if (adapterInfo && adapterInfo.adapterName) {
                // Get relative path from the adapter directory
                const relativePath = relative(adapterInfo.path, changedPath);
                const adapterLabel = colors.magenta(
                    `🔧 [ ${adapterInfo.adapterName.toUpperCase()} ]`,
                );
                const fileName = colors.yellow(relativePath);

                log.info(
                    `${adapterLabel} template changed (${fileName}) → regenerating...`,
                );

                try {
                    const result = await generateSingleAdapter(adapterInfo.adapterName);

                    if (result.error) {
                        log.error(`⚠️ Encountered error: ${result.error}`);
                        log.warn(
                            `⚠️ ${
                                colors.magenta(adapterInfo.adapterName.toUpperCase())
                            } not updated - Waiting for fix...`,
                        );
                    } else if (result.hasChanges) {
                        log.success(
                            `✅ ${
                                colors.magenta(adapterInfo.adapterName.toUpperCase())
                            } updated successfully`,
                        );
                    } else {
                        log.info(
                            `ℹ️ ${
                                colors.magenta(adapterInfo.adapterName.toUpperCase())
                            } - no changes needed`,
                        );
                    }
                } catch (error) {
                    log.error(
                        `❌ Generation failed: ${
                            error instanceof Error ? error.message : String(error)
                        }`,
                    );
                }
            }
        }
    };

    const handleFileChange = (changedPath: string) => {
        if (shouldIgnoreFile(changedPath) || !isRelevantFile(changedPath)) {
            return;
        }

        // Clear existing timer
        const existingTimer = pendingChanges.get(changedPath);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        // Set new timer
        const timer = setTimeout(async () => {
            pendingChanges.delete(changedPath);
            await processFileChange(changedPath);
        }, debounceMs);

        pendingChanges.set(changedPath, timer);
    };

    // Set up graceful shutdown
    const abortController = new AbortController();

    Deno.addSignalListener("SIGINT", () => {
        log.info("\n🛑 Shutting down multi-watch process...");

        // Clear all pending timers
        for (const timer of pendingChanges.values()) {
            clearTimeout(timer);
        }
        pendingChanges.clear();

        abortController.abort();
        log.info("Multi-watch process terminated.");
        Deno.exit(0);
    });

    // Create watchers for all directories
    const startWatchers = async () => {
        const watchers = [];

        for (const watchInfo of watchDirs) {
            const watcherPromise = (async () => {
                const watcher = Deno.watchFs(watchInfo.path, { recursive: true });

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

        await Promise.race(watchers);
    };

    // Main watch loop
    while (!abortController.signal.aborted) {
        try {
            await startWatchers();

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

    log.info("Multi-watch process terminated.");
}
