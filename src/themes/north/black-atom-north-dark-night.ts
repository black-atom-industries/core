import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-north-dark-night",
    label: "Black Atom — NORTH ∷ Dark Night",
    appearance: "dark",
    status: "development",
    collection: {
        key: "north",
        label: "NORTH",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1c1f26",
    d20: "#242933",
    d30: "#2E3440",
    d40: "#3B4252",

    m10: "#434C5E",
    m20: "#4C566A",
    m30: "#5E81AC",
    m40: "#81A1C1",

    l10: "#88C0D0",
    l20: "#8FBCBB",
    l30: "#D8DEE9",
    l40: "#E5E9F0",
};

const palette: Theme.Palette = {
    black: primaries.d20,
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