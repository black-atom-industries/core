import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-north-night",
    label: "Black Atom — NORTH ∷ Night",
    appearance: "dark",
    status: "development",
    collection: {
        key: "north",
        label: "NORTH",
    },
};

const primaries: Theme.Primaries = {
    d10: "#2E3440",
    d20: "#3B4252",
    d30: "#434C5E",
    d40: "#4C566A",

    m10: "#5E81AC",
    m20: "#81A1C1",
    m30: "#88C0D0",
    m40: "#8FBCBB",

    l10: "#D8DEE9",
    l20: "#E5E9F0",
    l30: "#ECEFF4",
    l40: "#ECEFF4",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#BF616A",
    red: "#BF616A",

    darkGreen: "#A3BE8C",
    green: "#A3BE8C",

    darkYellow: "#D08770",
    yellow: "#EBCB8B",

    darkBlue: "#5E81AC",
    blue: "#81A1C1",

    darkMagenta: "#B48EAD",
    magenta: "#B48EAD",

    darkCyan: "#88C0D0",
    cyan: "#8FBCBB",

    lightGray: primaries.l10,
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