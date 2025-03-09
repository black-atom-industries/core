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
    d10: "#0d0d0d",
    d20: "#131a20",
    d30: "#253341",
    d40: "#3b4c5c",

    m10: "#566575",
    m20: "#7b8d9e",
    m30: "#a1b5c5",
    m40: "#bacad8",

    l10: "#d3d9df",
    l20: "#e0e6ec",
    l30: "#ebf2f8",
    l40: "#f5f9ff",
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: "#f33e25",
    red: "#ff624d",

    darkGreen: "#6ad147",
    green: "#8bdb70",

    darkYellow: "#ee9366",
    yellow: "#ff8357",

    darkBlue: "#4481ef",
    blue: "#679cff",

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
