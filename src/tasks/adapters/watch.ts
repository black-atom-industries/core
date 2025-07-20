import * as colors from "@std/fmt/colors";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { generateAllRepositories } from "./generate-all.ts";

/**
 * Watch for changes in the core themes directory and adapt all repositories
 * without committing changes.
 */
export async function watchAdapters() {
    const themesDir = config.dir.themes;

    log.info(`Watching for changes in ${themesDir}...`);
    log.info("Press Ctrl+C to stop watching");

    // Run initial generation to ensure everything is in sync
    log.hr_thick("🚀 Running initial generation...");
    try {
        await generateAllRepositories({ commit: false });
        log.success("Initial generation completed successfully");
    } catch (error) {
        log.error(
            `Initial generation failed: ${error instanceof Error ? error.message : String(error)}`,
        );
        log.info("Continuing with file watching...");
    }

    // Simple state management
    let debounceTimer: number | null = null;
    let isProcessing = false;
    const pendingChanges = new Set<string>();

    // Files to ignore - expanded for better filtering
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

    // Process changes after debounce period
    const processChanges = async () => {
        if (isProcessing) {
            log.warn("Generation already in progress, skipping...");
            return;
        }

        // Filter out ignored files
        const changes = Array.from(pendingChanges).filter((path) => !shouldIgnoreFile(path));

        if (changes.length === 0) {
            pendingChanges.clear();
            return;
        }

        isProcessing = true;
        pendingChanges.clear();

        log.hr_thick("👀 Changes detected!");
        log.info(
            `Processing changes:\n${
                changes.map((p) => `   - ${colors.yellow(p.split("/").pop() ?? "")}`).join("\n")
            }`,
        );

        try {
            await generateAllRepositories({ commit: false });
            log.success("✅ Generation completed successfully");
        } catch (error) {
            log.error(
                `❌ Generation failed: ${error instanceof Error ? error.message : String(error)}`,
            );
        } finally {
            isProcessing = false;
        }
    };

    // Set up graceful shutdown
    const abortController = new AbortController();

    // Handle Ctrl+C gracefully
    Deno.addSignalListener("SIGINT", () => {
        log.info("\n🛑 Shutting down watch process...");
        abortController.abort();

        // Clean up any pending timers
        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
        }

        log.info("Watch process terminated.");
        Deno.exit(0);
    });

    // Create file watcher
    const watcher = Deno.watchFs(themesDir, { recursive: true });

    try {
        for await (const event of watcher) {
            // Check if we've been aborted
            if (abortController.signal.aborted) {
                break;
            }

            // Only process modify and create events
            if (event.kind !== "modify" && event.kind !== "create") {
                continue;
            }

            // Filter out paths we want to ignore early
            const relevantPaths = event.paths.filter((path) => !shouldIgnoreFile(path));

            if (relevantPaths.length === 0) {
                continue;
            }

            // Add paths to pending changes
            for (const path of relevantPaths) {
                pendingChanges.add(path);
            }

            // Clear existing timer and set new one
            if (debounceTimer !== null) {
                clearTimeout(debounceTimer);
            }

            // Debounce with 1.5 second delay for stability
            debounceTimer = setTimeout(() => {
                processChanges().catch((error) => {
                    log.error(`Unexpected error in processChanges: ${error}`);
                });
            }, 1500);
        }
    } catch (error) {
        if (!abortController.signal.aborted) {
            log.error(`Watch error: ${error instanceof Error ? error.message : String(error)}`);
            log.info("Watch process failed. Please restart manually.");
        }
    }
}
