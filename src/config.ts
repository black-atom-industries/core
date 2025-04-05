import { dirname, join } from "@std/path";

import { Key } from "./types/theme.ts";

export type Config = {
    dir: {
        core: string;
        themes: string;
        org?: string; // Organization directory (parent of core)
    };
    adapterFileName: string;
    themeKeys: Key[];
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
    themeKeys: [
        "black-atom-stations-engineering",
        "black-atom-stations-operations",
        "black-atom-stations-medical",
        "black-atom-stations-research",
        "black-atom-crbn-null",
        "black-atom-crbn-supr",
        "black-atom-jpn-koyo-yoru",
        "black-atom-jpn-koyo-hiru",
        "black-atom-jpn-tsuki-yoru",
        "black-atom-jpn-murasaki-yoru",
        "black-atom-terra-spring-day",
        "black-atom-terra-spring-night",
        "black-atom-terra-fall-day",
        "black-atom-terra-fall-night",
        "black-atom-terra-summer-day",
        "black-atom-terra-summer-night",
        "black-atom-terra-winter-day",
        "black-atom-terra-winter-night",
    ],
    adapters: [
        "nvim",
        "ghostty",
        "zed",
        "wezterm",
        // "obsidian", // Disabled until ready
    ],
};
