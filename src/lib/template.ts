import { Eta } from "@eta";
import { dirname } from "@std/path";
import type { Definition, Key } from "../types/theme.ts";
import log from "./log.ts";
import { TemplateConfig } from "./validate-adapter.ts";

// Initialize Eta with options
const eta = new Eta({
    views: Deno.cwd(), // Use current working directory as views directory
    cache: true, // Enable caching for better performance
    autoEscape: false, // Don't escape HTML since we're not generating HTML
    varName: "theme", // Use 'theme' as the variable name in templates
    autoTrim: false,
});

export async function processThemeTemplates(
    themeKey: Key,
    templatePaths: TemplateConfig["templates"],
    themeMap: Record<Key, Definition | null>,
) {
    const theme = themeMap[themeKey];

    if (!theme) {
        log.error(`Theme "${themeKey}" not found`);
        return;
    }

    for (const path of templatePaths) {
        try {
            log.info(`Processing template: "${path}"`);

            // Read and process template
            const template = await Deno.readTextFile(path);
            const content = eta.renderString(template, theme);

            await writeOutput(content, path);
            log.success(`Generated: "${path.replace(".template.", ".")}"`);
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                log.error(`Template file not found: ${path}`);
            } else if (error instanceof Error) {
                log.error(`Failed to process template ${path}: ${error.message}`);
            }
        }
    }
}

export async function writeOutput(content: string, templatePath: string): Promise<void> {
    // Generate output path by removing .template from the file name
    const outputPath = templatePath.replace(".template.", ".");

    // Ensure the output directory exists
    await Deno.mkdir(dirname(outputPath), { recursive: true });

    // Write the processed content
    await Deno.writeTextFile(outputPath, content);
}
