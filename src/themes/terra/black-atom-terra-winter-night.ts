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

    m10: "#5a6b7a",
    m20: "#6b7c8a",
    m30: "#7c8d9c",
    m40: "#8d9eac",

    l10: "#D8DEE9",
    l20: "#E5E9F0",
    l30: "#ECEFF4",
    l40: "#ECEFF4",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#bf9999",
    red: "#d1adad",

    darkGreen: "#99ad99",
    green: "#adc7ad",

    darkYellow: "#D08770",
    yellow: "#EBCB8B",

    darkBlue: "#7a8db8",
    blue: "#94a3d1",

    darkMagenta: "#a699bf",
    magenta: "#c2add1",

    darkCyan: "#99b8bf",
    cyan: "#add1d6",

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
