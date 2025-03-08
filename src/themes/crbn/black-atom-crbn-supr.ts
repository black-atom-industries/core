import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-supr",
    label: "Black Atom • Carbon ∷ SUPR",
    appearance: "light",
    status: "release",
    collection: {
        key: "crbn",
        label: "CRBN",
    },
};

const primaries: Theme.Primaries = [
    "#1d2730",
    "#344859",
    "#415a70",
    "#566e84",
    "#6c7f92",
    "#8999a8",
    "#a2b5c5",
    "#bfcbd5",
    "#cdd9e4",
    "#d8e2ea",
    "#e8eef2",
    "#eff5fb",
];

const palette: Theme.Palette = {
    black: primaries[1],
    gray: primaries[4],

    darkRed: "#f2280d",
    red: "#ff4b33",

    darkGreen: "#50b82e",
    green: "#69d148",

    darkYellow: "#ff4302",
    yellow: "#FF6833",

    darkBlue: "#1661EB",
    blue: "#337AFF",

    darkMagenta: primaries[4],
    magenta: primaries[5],

    darkCyan: primaries[2],
    cyan: primaries[1],

    lightGray: primaries[6],
    white: primaries[8],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
