import { join } from "@std/path";

import black_atom_jpn_koyo_yoru from "./themes/jpn/black-atom-jpn-koyo-yoru.ts";
import black_atom_jpn_koyo_hiru from "./themes/jpn/black-atom-jpn-koyo-hiru.ts";
import black_atom_jpn_tsuki_yoru from "./themes/jpn/black-atom-jpn-tsuki-yoru.ts";
import black_atom_stations_engineering from "./themes/stations/black-atom-stations-engineering.ts";
import black_atom_stations_operations from "./themes/stations/black-atom-stations-operations.ts";
import black_atom_stations_medical from "./themes/stations/black-atom-stations-medical.ts";
import black_atom_stations_research from "./themes/stations/black-atom-stations-research.ts";
import { Key, ThemeMap } from "./types/theme.ts";

export type Config = {
    dir: {
        themes: string;
    };
    adapterFileName: string;
    themeKeys: Key[];
    themeMap: ThemeMap;
};

const themeMap: ThemeMap = {
    "black-atom-stations-engineering": black_atom_stations_engineering,
    "black-atom-stations-operations": black_atom_stations_operations,
    "black-atom-stations-medical": black_atom_stations_medical,
    "black-atom-stations-research": black_atom_stations_research,
    "black-atom-jpn-koyo-yoru": black_atom_jpn_koyo_yoru,
    "black-atom-jpn-koyo-hiru": black_atom_jpn_koyo_hiru,
    "black-atom-jpn-tsuki-yoru": black_atom_jpn_tsuki_yoru,
    "black-atom-crbn-null": null,
    "black-atom-crbn-supr": null,
    "black-atom-terra-spring-day": null,
    "black-atom-terra-spring-night": null,
    "black-atom-terra-fall-day": null,
    "black-atom-terra-fall-night": null,
    "black-atom-terra-summer-day": null,
    "black-atom-terra-summer-night": null,
    "black-atom-terra-winter-day": null,
    "black-atom-terra-winter-night": null,
};

const cwd = Deno.cwd();

export const config: Config = {
    dir: {
        themes: join(cwd, "src", "themes"),
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
};
