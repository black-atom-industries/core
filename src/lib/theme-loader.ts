import * as Theme from "../types/theme.ts";
import { config } from "../config.ts";
import log from "./log.ts";

/**
 * Dynamically loads theme modules to ensure we have the latest versions
 * This is important for the watch functionality to pick up changes
 */
export async function loadThemeMap(
    themePathMap: Theme.ThemeKeyPathMap,
): Promise<Theme.ThemeMap> {
    const themeMap = {} as Theme.ThemeMap;
    const errorList: string[] = [];

    log.info("Dynamically loading theme files to get latest changes...");

    try {
        // Load each theme module dynamically
        for (const themeKey of config.themeKeys) {
            try {
                // With Record<Key, string>, TypeScript guarantees the path exists
                const themePath = themePathMap[themeKey];

                const importPath = `../${themePath}.ts?t=${Date.now()}`;
                const module = await import(importPath);

                if (!module.default) {
                    errorList.push(`Theme module missing default export: ${themeKey}`);
                    continue;
                }

                themeMap[themeKey] = module.default;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                errorList.push(`Failed to load theme ${themeKey}: ${errorMessage}`);
            }
        }

        // If there were any errors during loading, report them
        if (errorList.length > 0) {
            const errorReport = errorList.join("\n- ");
            throw new Error(`Failed to load some themes:\n- ${errorReport}`);
        }

        log.success(`Successfully loaded ${Object.keys(themeMap).length} theme files`);
        return themeMap;
    } catch (error) {
        log.error(`Error loading theme files: ${error}`);
        throw error;
    }
}
