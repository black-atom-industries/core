import { Eta } from "@eta";
import { dirname } from "@std/path";
import type { Definition, Key } from "../types/theme.ts";
import log from "./log.ts";
import { AdapterConfig } from "./validate-adapter.ts";

// Initialize Eta with options
const eta = new Eta({
    views: Deno.cwd(), // Use current working directory as views directory
    cache: true, // Enable caching for better performance
    autoEscape: false, // Don't escape HTML since we're not generating HTML
    varName: "theme", // Use 'theme' as the variable name in templates
    autoTrim: false,
});

/**
 * Process collection-based templates
 * @param adapterConfig The adapter configuration
 * @param themeMap Map of theme keys to theme definitions
 */
export async function processTemplates(
    adapterConfig: AdapterConfig,
    themeMap: Record<Key, Definition | null>,
) {
    // Process collection templates
    if (adapterConfig.collections) {
        await processCollectionTemplates(adapterConfig.collections, themeMap);
    } else {
        log.error("No collections defined in adapter configuration");
    }
}

/**
 * Process collection-based templates
 * @param collections The collections configuration object
 * @param themeMap Map of theme keys to theme definitions
 */
async function processCollectionTemplates(
    collections: NonNullable<AdapterConfig["collections"]>,
    themeMap: Record<Key, Definition | null>,
) {
    // Go through each collection
    for (const [collectionKey, collectionConfig] of Object.entries(collections)) {
        if (!collectionConfig) continue;

        const { template: templatePath, themes } = collectionConfig;

        try {
            // Read the collection template once
            const template = await Deno.readTextFile(templatePath);

            log.info(
                `Processing collection "${collectionKey}" with ${themes.length} themes using template "${templatePath}"`,
            );
            const generatedFiles: string[] = [];
            const errors: string[] = [];

            // Process each theme in the collection
            for (const themeKey of themes) {
                const theme = themeMap[themeKey as Key];

                if (!theme) {
                    errors.push(`Theme "${themeKey}" not found`);
                    continue;
                }

                // Determine the output path by replacing the collection name in the template path
                const outputPath = templatePath
                    .replace(".template.", ".")
                    .replace(/collection/, themeKey);

                try {
                    // Render the template with the theme data
                    const content = eta.renderString(template, theme);

                    // Write the output
                    await writeOutput(content, outputPath);
                    generatedFiles.push(outputPath);
                } catch (error) {
                    errors.push(
                        `Failed to process theme "${themeKey}": ${
                            error instanceof Error ? error.message : String(error)
                        }`,
                    );
                }
            }

            // Log a summary of the results
            if (generatedFiles.length > 0) {
                log.success(
                    `Generated ${generatedFiles.length} theme files for collection "${collectionKey}"`,
                );
            }

            if (errors.length > 0) {
                log.error(`Encountered ${errors.length} errors in collection "${collectionKey}":`);
                for (const error of errors) {
                    log.error(`  - ${error}`);
                }
            }
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                log.error(`Collection template file not found: ${templatePath}`);
            } else if (error instanceof Error) {
                log.error(
                    `Failed to process collection template ${templatePath}: ${error.message}`,
                );
            }
        }
    }
}

/**
 * Write processed content to an output file
 * @param content The processed content to write
 * @param templatePath The template path to derive the output path from or the explicit output path
 */
export async function writeOutput(content: string, templatePath: string): Promise<void> {
    // Generate output path by removing .template from the file name
    const outputPath = templatePath.replace(".template.", ".");

    // Ensure the output directory exists
    await Deno.mkdir(dirname(outputPath), { recursive: true });

    // Write the processed content
    await Deno.writeTextFile(outputPath, content);
}
