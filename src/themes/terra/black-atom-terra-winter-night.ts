import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-night",
    label: "Black Atom — TER ∷ Winter Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
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

    darkRed: "#bf7070",
    red: "#d08a8a",

    darkGreen: "#7ba588",
    green: "#95c4a8",

    darkYellow: "#d4a76f",
    yellow: "#e6ba82",

    darkBlue: "#7a9bc7",
    blue: "#96b4d8",

    darkMagenta: "#b897b3",
    magenta: "#d3b2ce",

    darkCyan: "#72a5a5",
    cyan: "#8cc4c4",

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
