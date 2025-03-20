import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-supr",
    label: "Black At•m — CRB ∷ SUPR",
    appearance: "light",
    status: "release",
    collection: {
        key: "crbn",
        label: "CRBN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1f1f1f",
    d20: "#282828",
    d30: "#3d3d3d",
    d40: "#515151",

    m10: "#727272",
    m20: "#8c8c8c",
    m30: "#a6a6a6",
    m40: "#c0c0c0",

    l10: "#cdcdcd",
    l20: "#dadada",
    l30: "#ececec",
    l40: "#f1f1f1",
};

const palette: Theme.Palette = {
    black: primaries.d10,
    gray: primaries.m10,

    darkRed: primaries.d20,
    red: primaries.d30,

    darkGreen: primaries.d20,
    green: primaries.d30,

    darkYellow: "#d95a26",
    yellow: "#f06f42",

    darkBlue: primaries.d20,
    blue: primaries.d30,

    darkMagenta: primaries.d20,
    magenta: primaries.d30,

    darkCyan: primaries.d10,
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
