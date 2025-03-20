import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-null",
    label: "Black At•m — CRB ∷ NULL",
    appearance: "dark",
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
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: primaries.d40,
    red: primaries.m20,

    darkGreen: primaries.l10,
    green: primaries.l30,

    darkYellow: "#ee9366",
    yellow: "#ff8357",

    darkBlue: primaries.m30,
    blue: primaries.l10,

    darkMagenta: primaries.m10,
    magenta: primaries.m20,

    darkCyan: primaries.m10,
    cyan: primaries.m20,

    lightGray: primaries.m30,
    white: primaries.l10,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
