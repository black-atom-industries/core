import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-supr",
    label: "Black Atom — CRB ∷ SUPR",
    appearance: "light",
    status: "release",
    collection: {
        key: "crbn",
        label: "CRBN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1d2730",
    d20: "#344859",
    d30: "#415a70",
    d40: "#566e84",

    m10: "#6c7f92",
    m20: "#8999a8",
    m30: "#a2b5c5",
    m40: "#bfcbd5",

    l10: "#cdd9e4",
    l20: "#d8e2ea",
    l30: "#e8eef2",
    l40: "#eff5fb",
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: "#f2280d",
    red: "#ff4b33",

    darkGreen: "#50b82e",
    green: "#69d148",

    darkYellow: "#ff4302",
    yellow: "#FF6833",

    darkBlue: "#1661EB",
    blue: "#337AFF",

    darkMagenta: primaries.m10,
    magenta: primaries.m20,

    darkCyan: primaries.d30,
    cyan: primaries.d20,

    lightGray: primaries.m30,
    white: primaries.l10,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
