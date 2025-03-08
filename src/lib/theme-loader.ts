import { Key, ThemeMap } from "../types/theme.ts";
import { config } from "../config.ts";
import log from "./log.ts";

/**
 * A utility mapping to convert theme keys to their file paths
 */
const themePathMap: Record<Key, string> = {
    // Stations
    "black-atom-stations-engineering": "stations/black-atom-stations-engineering",
    "black-atom-stations-operations": "stations/black-atom-stations-operations",
    "black-atom-stations-medical": "stations/black-atom-stations-medical",
    "black-atom-stations-research": "stations/black-atom-stations-research",

    // JPNs
    "black-atom-jpn-koyo-yoru": "jpn/black-atom-jpn-koyo-yoru",
    "black-atom-jpn-koyo-hiru": "jpn/black-atom-jpn-koyo-hiru",
    "black-atom-jpn-tsuki-yoru": "jpn/black-atom-jpn-tsuki-yoru",

    // Terra
    "black-atom-terra-spring-day": "terra/black-atom-terra-spring-day",
    "black-atom-terra-spring-night": "terra/black-atom-terra-spring-night",
    "black-atom-terra-fall-day": "terra/black-atom-terra-fall-day",
    "black-atom-terra-fall-night": "terra/black-atom-terra-fall-night",
    "black-atom-terra-summer-day": "terra/black-atom-terra-summer-day",
    "black-atom-terra-summer-night": "terra/black-atom-terra-summer-night",
    "black-atom-terra-winter-day": "terra/black-atom-terra-winter-day",
    "black-atom-terra-winter-night": "terra/black-atom-terra-winter-night",

    // CRBN
    "black-atom-crbn-null": "crbn/black-atom-crbn-null",
    "black-atom-crbn-supr": "crbn/black-atom-crbn-supr",
};

/**
 * Dynamically loads theme modules to ensure we have the latest versions
 * This is important for the watch functionality to pick up changes
 */
export async function loadThemeMap(): Promise<ThemeMap> {
    const themeMap = {} as ThemeMap;
    const errorList: string[] = [];

    log.info("Dynamically loading theme files to get latest changes...");

    try {
        // Load each theme module dynamically
        for (const themeKey of config.themeKeys) {
            try {
                // With Record<Key, string>, TypeScript guarantees the path exists
                const themePath = themePathMap[themeKey];

                const importPath = `../themes/${themePath}.ts?t=${Date.now()}`;
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
