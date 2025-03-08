import * as colors from "@std/fmt/colors";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";
import { adaptAllRepositories } from "./adapt-all.ts";

/**
 * Watch for changes in the core themes directory and adapt all repositories
 * without committing changes.
 */
export async function watchAdapters() {
    // Use the configured paths
    const themesDir = config.dir.themes;

    log.info(`Watching for changes in ${themesDir}...`);
    log.info("Press Ctrl+C to stop watching");

    // Create a watcher for the themes directory
    const watcher = Deno.watchFs(themesDir);

    // Debounce mechanism
    let debounceTimer: number | null = null;
    let isProcessing = false;
    const pendingChanges = new Set<string>();

    // Process changes after debounce period
    const processChanges = async () => {
        if (isProcessing || pendingChanges.size === 0) return;

        isProcessing = true;
        const changes = Array.from(pendingChanges);

        log.hr_thick("👀 Changes detected!");
        log.info(
            `Processing changes:\n${
                changes.map((p) => `   - ${colors.yellow(p.split("/").pop() ?? "")}`).join("\n")
            }`,
        );

        pendingChanges.clear();
        await adaptAllRepositories({ commit: false });

        isProcessing = false;

        // If more changes accumulated during processing, handle them
        if (pendingChanges.size > 0) {
            debounceTimer = setTimeout(processChanges, 100);
        }
    };

    for await (const event of watcher) {
        if (event.kind === "modify" || event.kind === "create") {
            // Add paths to pending changes
            for (const path of event.paths) {
                pendingChanges.add(path);
            }

            // Clear existing timer if there is one
            if (debounceTimer !== null) {
                clearTimeout(debounceTimer);
                debounceTimer = null;
            }

            // Set new timer for debouncing
            debounceTimer = setTimeout(processChanges, 500);
        }
    }
}
