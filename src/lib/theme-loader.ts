import { ThemeMap } from "../types/theme.ts";
import log from "./log.ts";

/**
 * Dynamically loads theme modules to ensure we have the latest versions
 * This is important for the watch functionality to pick up changes
 */
export async function loadThemeMap(): Promise<ThemeMap> {
    // Using 'as ThemeMap' to avoid TypeScript errors during initialization
    const themeMap = {} as ThemeMap;

    log.info("Dynamically loading theme files to get latest changes...");

    try {
        // JPNs
        themeMap["black-atom-jpn-koyo-yoru"] =
            (await import("../themes/jpn/black-atom-jpn-koyo-yoru.ts?t=" + Date.now())).default;
        themeMap["black-atom-jpn-koyo-hiru"] =
            (await import("../themes/jpn/black-atom-jpn-koyo-hiru.ts?t=" + Date.now())).default;
        themeMap["black-atom-jpn-tsuki-yoru"] =
            (await import("../themes/jpn/black-atom-jpn-tsuki-yoru.ts?t=" + Date.now())).default;

        // Stations
        themeMap["black-atom-stations-engineering"] =
            (await import("../themes/stations/black-atom-stations-engineering.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-stations-operations"] =
            (await import("../themes/stations/black-atom-stations-operations.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-stations-medical"] =
            (await import("../themes/stations/black-atom-stations-medical.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-stations-research"] =
            (await import("../themes/stations/black-atom-stations-research.ts?t=" + Date.now()))
                .default;

        // Terra
        themeMap["black-atom-terra-spring-day"] =
            (await import("../themes/terra/black-atom-terra-spring-day.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-terra-spring-night"] =
            (await import("../themes/terra/black-atom-terra-spring-night.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-terra-fall-day"] =
            (await import("../themes/terra/black-atom-terra-fall-day.ts?t=" + Date.now())).default;
        themeMap["black-atom-terra-fall-night"] =
            (await import("../themes/terra/black-atom-terra-fall-night.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-terra-summer-day"] =
            (await import("../themes/terra/black-atom-terra-summer-day.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-terra-summer-night"] =
            (await import("../themes/terra/black-atom-terra-summer-night.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-terra-winter-day"] =
            (await import("../themes/terra/black-atom-terra-winter-day.ts?t=" + Date.now()))
                .default;
        themeMap["black-atom-terra-winter-night"] =
            (await import("../themes/terra/black-atom-terra-winter-night.ts?t=" + Date.now()))
                .default;

        // CRBN
        themeMap["black-atom-crbn-null"] =
            (await import("../themes/crbn/black-atom-crbn-null.ts?t=" + Date.now())).default;
        themeMap["black-atom-crbn-supr"] =
            (await import("../themes/crbn/black-atom-crbn-supr.ts?t=" + Date.now())).default;

        log.success("Theme files loaded successfully");
        return themeMap;
    } catch (error) {
        log.error(`Error loading theme files: ${error}`);
        throw error;
    }
}
