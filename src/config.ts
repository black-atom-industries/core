import { dirname, join } from "@std/path";

import * as Theme from "./types/theme.ts";
import { themeKeys } from "./types/theme.ts";
import { discoverAdapters } from "./lib/discover-adapters.ts";

export type Config = {
    dir: {
        core: string;
        themes: string;
        org?: string; // Organization directory (parent of core)
    };
    adapterFileName: string;
    themeKeys: readonly Theme.Key[];
    themePathMap: Theme.ThemeKeyPathMap;
    getAdapters: () => Promise<string[]>; // Dynamically discover adapter repositories
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
    async getAdapters() {
        const orgDir = this.dir.org;
        if (!orgDir) {
            throw new Error("Organization directory not configured");
        }
        return await discoverAdapters(orgDir);
    },
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

        // North
        "black-atom-north-night": "./themes/north/black-atom-north-night",
        "black-atom-north-dark-night": "./themes/north/black-atom-north-dark-night",
        "black-atom-north-day": "./themes/north/black-atom-north-day",

        // MNML
        "black-atom-mnml-mono-dark": "./themes/mnml/black-atom-mnml-mono-dark",
        "black-atom-mnml-mono-light": "./themes/mnml/black-atom-mnml-mono-light",
        "black-atom-mnml-orange-dark": "./themes/mnml/black-atom-mnml-orange-dark",
        "black-atom-mnml-orange-light": "./themes/mnml/black-atom-mnml-orange-light",
        "black-atom-mnml-mikado-dark": "./themes/mnml/black-atom-mnml-mikado-dark",
        "black-atom-mnml-mikado-light": "./themes/mnml/black-atom-mnml-mikado-light",
        "black-atom-mnml-47-light": "./themes/mnml/black-atom-mnml-47-light",
        "black-atom-mnml-47-dark": "./themes/mnml/black-atom-mnml-47-dark",
    },
};
