import * as z from "@zod";
import * as colors from "@std/fmt/colors";

import { config } from "../config.ts";

import { AdapterConfig, createAdapterConfigSchema } from "../lib/validate-adapter.ts";
import log from "../lib/log.ts";
import { processTemplates } from "../lib/template.ts";
import { loadThemeMap } from "../lib/theme-loader.ts";

async function getAdapterConfig(): Promise<AdapterConfig> {
    try {
        const adapterConfigSchema = createAdapterConfigSchema(config.themeKeys);
        const adapterConfig = await Deno.readTextFile(config.adapterFileName);
        return adapterConfigSchema.parse(JSON.parse(adapterConfig));
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            log.error(`No \`${config.adapterFileName}\` found in current directory. Abort.`);
            Deno.exit(1);
        }

        if (error instanceof z.ZodError) {
            log.error("Invalid adapter configuration!");
            console.dir(error.issues);
            Deno.exit(1);
        }

        throw error;
    }
}

/**
 * Watch for changes in the adapter's template files and reprocess them
 * when changes are detected.
 */
async function watchAdapter(adapterConfig: AdapterConfig) {
    const cwd = Deno.cwd();
    const templatePaths = new Set<string>();

    // Collect template paths from the adapter config
    if (adapterConfig.collections) {
        for (const collection of Object.values(adapterConfig.collections)) {
            if (collection?.template) {
                templatePaths.add(collection.template);
            }
        }
    }

    // Watch the current directory for changes to template files
    log.info(`Watching for changes in template files in ${cwd}...`);
    log.info("Press Ctrl+C to stop watching");

    // Create a watcher for the current directory
    const watcher = Deno.watchFs(cwd);

    // Debounce mechanism
    let debounceTimer: number | null = null;
    let isProcessing = false;
    const pendingChanges = new Set<string>();

    // Process changes after debounce period
    const processChanges = async () => {
        if (isProcessing || pendingChanges.size === 0) return;

        isProcessing = true;
        const changes = Array.from(pendingChanges);

        // Filter changes to only include template files or the adapter config
        const relevantChanges = changes.filter((path) =>
            path.includes(".template.") ||
            path.endsWith(config.adapterFileName)
        );

        if (relevantChanges.length > 0) {
            log.hr_thick("👀 Template changes detected");
            log.info(
                `Processing changes:\n${
                    relevantChanges.map((p) => `   - ${colors.yellow(p)}`)
                        .join("\n")
                }`,
            );

            try {
                // Reload adapter config if it changed
                const updatedAdapterConfig = await getAdapterConfig();
                // Reload theme map
                const themeMap = loadThemeMap();
                // Process templates
                await processTemplates(updatedAdapterConfig, themeMap);
            } catch (error) {
                log.error(
                    `Error processing changes: ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                );
            }
        }

        pendingChanges.clear();
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

export default async function (options: string[] = []) {
    const watchMode = options.includes("--watch") || options.includes("-w");

    const adapterConfig = await getAdapterConfig();
    const themeMap = loadThemeMap();

    // Process templates
    const templateErrors = await processTemplates(adapterConfig, themeMap);

    // If there are template errors, throw them so they can be caught by the caller
    if (templateErrors.length > 0) {
        throw new Error(templateErrors[0]); // Just throw the first error for simplicity
    }

    // If watch mode is enabled, watch for changes
    if (watchMode) {
        await watchAdapter(adapterConfig);
    }
}
