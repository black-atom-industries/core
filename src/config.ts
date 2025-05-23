import { dirname, join } from "@std/path";

import * as Theme from "./types/theme.ts";
import { themeKeys } from "./types/theme.ts";

export type Config = {
    dir: {
        core: string;
        themes: string;
        org?: string; // Organization directory (parent of core)
    };
    adapterFileName: string;
    themeKeys: readonly Theme.Key[];
    themePathMap: Theme.ThemeKeyPathMap;
    adapters: ("nvim" | "ghostty" | "zed" | "wezterm" | "obsidian")[]; // List of cloned adapter repository names
    orgName: string; // Organization directory name
};

export const config: Config = {
    orgName: "black-atom-industries",
    get dir() {
        return {
            core: Deno.cwd(),
            themes: join(Deno.cwd(), "src", "themes"),
            org: join(dirname(dirname(Deno.cwd())), this.orgName),
        };
    },
    adapterFileName: "black-atom-adapter.json",
    themeKeys,
    themePathMap: {
        // Stations
        "black-atom-stations-engineering": "./themes/stations/black-atom-stations-engineering",
        "black-atom-stations-operations": "./themes/stations/black-atom-stations-operations",
        "black-atom-stations-medical": "./themes/stations/black-atom-stations-medical",
        "black-atom-stations-research": "./themes/stations/black-atom-stations-research",

        // JPNs
        "black-atom-jpn-koyo-yoru": "./themes/jpn/black-atom-jpn-koyo-yoru",
        "black-atom-jpn-koyo-hiru": "./themes/jpn/black-atom-jpn-koyo-hiru",
        "black-atom-jpn-tsuki-yoru": "./themes/jpn/black-atom-jpn-tsuki-yoru",
        "black-atom-jpn-murasaki-yoru": "./themes/jpn/black-atom-jpn-murasaki-yoru",

        // Terra
        "black-atom-terra-spring-day": "./themes/terra/black-atom-terra-spring-day",
        "black-atom-terra-spring-night": "./themes/terra/black-atom-terra-spring-night",
        "black-atom-terra-fall-day": "./themes/terra/black-atom-terra-fall-day",
        "black-atom-terra-fall-night": "./themes/terra/black-atom-terra-fall-night",
        "black-atom-terra-summer-day": "./themes/terra/black-atom-terra-summer-day",
        "black-atom-terra-summer-night": "./themes/terra/black-atom-terra-summer-night",
        "black-atom-terra-winter-day": "./themes/terra/black-atom-terra-winter-day",
        "black-atom-terra-winter-night": "./themes/terra/black-atom-terra-winter-night",

        // CRBN
        "black-atom-crbn-null": "./themes/crbn/black-atom-crbn-null",
        "black-atom-crbn-supr": "./themes/crbn/black-atom-crbn-supr",
    },
    adapters: [
        "nvim",
        "ghostty",
        "zed",
        "wezterm",
        // "obsidian", // Disabled until ready
    ],
};
