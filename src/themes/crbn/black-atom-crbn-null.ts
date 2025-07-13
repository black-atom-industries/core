import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-null",
    label: "Black Atom — CRB ∷ NULL",
    appearance: "dark",
    status: "release",
    collection: {
        key: "crbn",
        label: "CRBN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#131517",
    d20: "#1f2326",
    d30: "#2d3338",
    d40: "#3b4249",

    m10: "#617283",
    m20: "#7a8c9d",
    m30: "#92a9bb",
    m40: "#b3c1cd",

    l10: "#e5ebf1",
    l20: "#ebf1f4",
    l30: "#f9fbfc",
    l40: "#ffffff",
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: "#eb6247",
    red: "#f7866f",

    darkGreen: primaries.m30,
    green: primaries.m40,

    darkYellow: "#ff8c64",
    yellow: "#ff9c4d",

    darkBlue: primaries.m30,
    blue: primaries.m40,

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
