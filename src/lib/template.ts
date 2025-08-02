import { Eta } from "@eta";
import { dirname } from "@std/path";
import type { Definition, Key } from "../types/theme.ts";
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
): Promise<string[]> {
    // Process collection templates
    if (adapterConfig.collections) {
        return await processCollectionTemplates(adapterConfig.collections, themeMap);
    } else {
        throw new Error("No collections defined in adapter configuration");
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
): Promise<string[]> {
    const allErrors: string[] = [];

    // Go through each collection
    for (const [, collectionConfig] of Object.entries(collections)) {
        if (!collectionConfig) continue;

        const { template: templatePath, themes } = collectionConfig;

        try {
            // Read the collection template once
            const template = await Deno.readTextFile(templatePath);

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

                    // Check for undefined values in the rendered content and extract variable names
                    const undefinedMatches = content.match(/\bundefined\b/g);
                    if (undefinedMatches) {
                        // Try to find the undefined variable in the template
                        const templateVariablePattern = /<%=\s*(theme\.[^%]+?)\s*%>/g;
                        const templateVars = Array.from(template.matchAll(templateVariablePattern));

                        // Find which variable is undefined by checking each one
                        for (const match of templateVars) {
                            const varPath = match[1].trim();
                            // Simple check: try to access the property path and see if it throws or returns undefined
                            try {
                                const checkFunction = new Function(
                                    "theme",
                                    `try { return ${varPath}; } catch { return undefined; }`,
                                );
                                const result = checkFunction(theme);
                                if (result === undefined) {
                                    errors.push(`Template contains undefined variable: ${varPath}`);
                                    break;
                                }
                            } catch {
                                errors.push(`Template contains undefined variable: ${varPath}`);
                                break;
                            }
                        }

                        if (errors.length === 0) {
                            errors.push(
                                `Template contains ${undefinedMatches.length} undefined variable(s)`,
                            );
                        }
                        continue;
                    }

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

            // Collect errors for this collection
            if (errors.length > 0) {
                allErrors.push(...errors);
            }
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                allErrors.push(`Collection template file not found: ${templatePath}`);
            } else if (error instanceof Error) {
                allErrors.push(
                    `Failed to process collection template ${templatePath}: ${error.message}`,
                );
            }
        }
    }

    return allErrors;
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
