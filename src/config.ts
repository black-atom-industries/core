import { dirname, join } from "@std/path";

import black_atom_jpn_koyo_yoru from "./themes/jpn/black-atom-jpn-koyo-yoru.ts";
import black_atom_jpn_koyo_hiru from "./themes/jpn/black-atom-jpn-koyo-hiru.ts";
import black_atom_jpn_tsuki_yoru from "./themes/jpn/black-atom-jpn-tsuki-yoru.ts";
import black_atom_stations_engineering from "./themes/stations/black-atom-stations-engineering.ts";
import black_atom_stations_operations from "./themes/stations/black-atom-stations-operations.ts";
import black_atom_stations_medical from "./themes/stations/black-atom-stations-medical.ts";
import black_atom_stations_research from "./themes/stations/black-atom-stations-research.ts";
import black_atom_terra_spring_day from "./themes/terra/black-atom-terra-spring-day.ts";
import black_atom_terra_spring_night from "./themes/terra/black-atom-terra-spring-night.ts";
import black_atom_terra_fall_day from "./themes/terra/black-atom-terra-fall-day.ts";
import black_atom_terra_fall_night from "./themes/terra/black-atom-terra-fall-night.ts";
import black_atom_terra_summer_day from "./themes/terra/black-atom-terra-summer-day.ts";
import black_atom_terra_summer_night from "./themes/terra/black-atom-terra-summer-night.ts";
import black_atom_terra_winter_day from "./themes/terra/black-atom-terra-winter-day.ts";
import black_atom_terra_winter_night from "./themes/terra/black-atom-terra-winter-night.ts";
import black_atom_crbn_null from "./themes/crbn/black-atom-crbn-null.ts";
import black_atom_crbn_supr from "./themes/crbn/black-atom-crbn-supr.ts";
import { Key, ThemeMap } from "./types/theme.ts";

export type Config = {
    dir: {
        core: string;
        themes: string;
        org?: string; // Organization directory (parent of core)
    };
    adapterFileName: string;
    themeKeys: Key[];
    themeMap: ThemeMap;
    adapters: string[]; // List of adapter repository names
    orgName: string; // Organization directory name
};

const themeMap: ThemeMap = {
    "black-atom-stations-engineering": black_atom_stations_engineering,
    "black-atom-stations-operations": black_atom_stations_operations,
    "black-atom-stations-medical": black_atom_stations_medical,
    "black-atom-stations-research": black_atom_stations_research,
    "black-atom-jpn-koyo-yoru": black_atom_jpn_koyo_yoru,
    "black-atom-jpn-koyo-hiru": black_atom_jpn_koyo_hiru,
    "black-atom-jpn-tsuki-yoru": black_atom_jpn_tsuki_yoru,
    "black-atom-crbn-null": black_atom_crbn_null,
    "black-atom-crbn-supr": black_atom_crbn_supr,
    "black-atom-terra-spring-day": black_atom_terra_spring_day,
    "black-atom-terra-spring-night": black_atom_terra_spring_night,
    "black-atom-terra-fall-day": black_atom_terra_fall_day,
    "black-atom-terra-fall-night": black_atom_terra_fall_night,
    "black-atom-terra-summer-day": black_atom_terra_summer_day,
    "black-atom-terra-summer-night": black_atom_terra_summer_night,
    "black-atom-terra-winter-day": black_atom_terra_winter_day,
    "black-atom-terra-winter-night": black_atom_terra_winter_night,
};

const coreDir = Deno.cwd();
const orgDir = join(dirname(dirname(coreDir)), "black-atom-industries");

export const config: Config = {
    dir: {
        core: coreDir,
        themes: join(coreDir, "src", "themes"),
        org: orgDir,
    },
    orgName: "black-atom-industries",
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
        "black-atom-terra-spring-day",
        "black-atom-terra-spring-night",
        "black-atom-terra-fall-day",
        "black-atom-terra-fall-night",
        "black-atom-terra-summer-day",
        "black-atom-terra-summer-night",
        "black-atom-terra-winter-day",
        "black-atom-terra-winter-night",
    ],
    themeMap,
    adapters: [
        "nvim",
        "ghostty",
        "zed",
        "obsidian",
    ],
};
