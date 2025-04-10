import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-murasaki-yoru",
    label: "Black Atom — JPN ∷ Murasaki Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "Japan",
    },
};

const primaries: Theme.Primaries = {
    d10: "#20141f",
    d20: "#332031",
    d30: "#462c43",
    d40: "#573954",

    m10: "#6d4769",
    m20: "#7d5178",
    m30: "#865f88",
    m40: "#946996",

    l10: "#b796b8",
    l20: "#c9b1cb",
    l30: "#D4BFD6",
    l40: "#E8DBE9",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#ec362d",
    red: "#F0635C",

    darkGreen: "#4DB58A",
    green: "#6dc29f",

    darkYellow: "#FE9B16",
    yellow: "#e6a319",

    darkBlue: "#39a6cd",
    blue: "#71c0db",

    darkMagenta: "#7E5BA2",
    magenta: "#EC6EAA",

    darkCyan: "#6fa9a8",
    cyan: "#8FBCBB",

    lightGray: primaries.m40,
    white: primaries.l30,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
