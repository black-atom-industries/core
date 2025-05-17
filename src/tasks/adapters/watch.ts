import * as colors from "@std/fmt/colors";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { generateAllRepositories } from "./generate-all.ts";

/**
 * Watch for changes in the core themes directory and adapt all repositories
 * without committing changes.
 */
export async function watchAdapters() {
    // Use the configured paths
    const themesDir = config.dir.themes;

    log.info(`Watching for changes in ${themesDir}...`);

    // Run initial generation to ensure everything is in sync
    log.hr_thick("🚀 Running initial generation...");
    try {
        await generateAllRepositories({ commit: false });
        log.success("Initial generation completed successfully");
    } catch (error) {
        log.error(
            `Initial generation failed: ${error instanceof Error ? error.message : String(error)}`,
        );
    }

    // Display instructions
    log.info("Press Enter to manually trigger generation");
    log.info("Press q + Enter to quit the watch process");

    // Flag to track if we should exit the process
    let shouldExit = false;

    // Set up listener for key input
    const keyListener = listenForKeyInput((input) => {
        if (input === "") {
            // Empty input (just Enter key) = trigger generation
            log.hr_thick("🔄 Manual regeneration triggered");
            if (!isProcessing) {
                processChanges(true);
            } else {
                log.warn("Generation already in progress, please wait...");
            }
        } else if (input.toLowerCase() === "q") {
            // User pressed q + Enter = exit the process
            log.info("Shutting down watch process...");
            shouldExit = true;

            // Force exit after cleanup
            setTimeout(() => {
                keyListener();
                Deno.exit(0);
            }, 100);
        }
    });

    // Create a watcher for the themes directory with recursive option
    const watcher = Deno.watchFs(themesDir, { recursive: true });

    // Improved debounce mechanism with longer timeout and ignoring patterns
    let debounceTimer: number | null = null;
    let isProcessing = false;
    const pendingChanges = new Set<string>();

    /**
     * Listen for key input and trigger callback with the input value
     * @param callback Function to call with the input value
     * @returns Cleanup function
     */
    function listenForKeyInput(callback: (input: string) => void) {
        // Flag to track if the listener should continue running
        let running = true;

        // Start the listener
        const listener = async () => {
            try {
                // Use Deno's readLines utility which is much simpler
                for await (const line of readLines()) {
                    if (!running) break;

                    // Process the input
                    const input = line.trim();

                    // Call the callback with input
                    callback(input);

                    // Write prompt for next input
                    console.log("> ");
                }
            } catch (error) {
                // Ignore errors on shutdown
                if (running) {
                    console.error("Input error:", error);
                }
            }
        };

        // Helper function to read lines from stdin
        async function* readLines(): AsyncGenerator<string> {
            const buf = new Uint8Array(1024);
            let remaining = "";

            while (running) {
                const n = await Deno.stdin.read(buf);
                if (n === null) break;

                const chunk = new TextDecoder().decode(buf.subarray(0, n));
                remaining += chunk;

                const lines = remaining.split(/\r?\n/);
                remaining = lines.pop() || "";

                for (const line of lines) {
                    yield line;
                }
            }

            if (remaining) {
                yield remaining;
            }
        }

        // Start listening
        console.log("> ");
        listener();

        // Return cleanup function
        return () => {
            running = false;
        };
    }

    // Files to ignore (e.g. temp files, hidden files)
    const ignorePatterns = [
        /\.DS_Store$/,
        /~$/,
        /\.swp$/,
        /\.git\//,
    ];

    // Check if a file should be ignored
    const shouldIgnoreFile = (path: string): boolean => {
        return ignorePatterns.some((pattern) => pattern.test(path));
    };

    // Process changes after debounce period or manually triggered
    const processChanges = async (manualTrigger = false) => {
        if (isProcessing) return;

        // For auto-triggered events, only proceed if we have changes
        if (!manualTrigger && pendingChanges.size === 0) return;

        isProcessing = true;

        // For file change triggers, filter and log changes
        if (!manualTrigger) {
            const changes = Array.from(pendingChanges)
                .filter((path) => !shouldIgnoreFile(path));

            if (changes.length === 0) {
                isProcessing = false;
                pendingChanges.clear();
                return;
            }

            log.hr_thick("👀 Changes detected!");
            log.info(
                `Processing changes:\n${
                    changes.map((p) => `   - ${colors.yellow(p.split("/").pop() ?? "")}`).join("\n")
                }`,
            );
        }

        // Always clear pending changes before processing
        pendingChanges.clear();

        try {
            // Set a timeout to prevent hanging operations
            const timeoutPromise = new Promise<void>((_, reject) => {
                setTimeout(() => reject(new Error("Generation timed out after 30 seconds")), 30000);
            });

            // Race the generation against the timeout
            await Promise.race([
                generateAllRepositories({ commit: false }),
                timeoutPromise,
            ]);

            log.success("Generation completed successfully");
        } catch (error) {
            log.error(
                `Generation failed: ${error instanceof Error ? error.message : String(error)}`,
            );
        } finally {
            isProcessing = false;

            // If more changes accumulated during processing, handle them
            if (pendingChanges.size > 0) {
                log.info(`${pendingChanges.size} changes pending, processing soon...`);
                debounceTimer = setTimeout(processChanges, 500);
            }
        }
    };

    // Use a more robust event handling approach
    try {
        for await (const event of watcher) {
            // Check if we should exit
            if (shouldExit) {
                log.info("Watch process exiting...");
                break;
            }

            if (event.kind === "modify" || event.kind === "create") {
                // Filter out any paths we want to ignore
                const relevantPaths = event.paths.filter((path) => !shouldIgnoreFile(path));

                // Only proceed if we have relevant paths
                if (relevantPaths.length === 0) continue;

                // Add paths to pending changes
                for (const path of relevantPaths) {
                    pendingChanges.add(path);
                }

                // Clear existing timer if there is one
                if (debounceTimer !== null) {
                    clearTimeout(debounceTimer);
                    debounceTimer = null;
                }

                // Set new timer for debouncing - longer timeout for stability
                debounceTimer = setTimeout(() => processChanges(), 1000);
            }
        }
    } catch (error) {
        log.error(`Watch error: ${error instanceof Error ? error.message : String(error)}`);

        // Clean up listeners
        keyListener();

        if (!shouldExit) {
            log.info("Restarting watch process...");
            // Attempt to restart the watch process
            setTimeout(() => watchAdapters(), 1000);
        }
    } finally {
        // Ensure we clean up listeners on normal exit
        keyListener();
        log.info("Watch process terminated.");
    }
}
