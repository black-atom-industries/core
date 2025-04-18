import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-night",
    label: "Black Atom — TER ∷ Fall Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#0f0e0e",
    d20: "#1a1818",
    d30: "#262423",
    d40: "#2d2926",

    m10: "#665c54",
    m20: "#7c6f64",
    m30: "#928374",
    m40: "#a89984",

    l10: "#ae9685",
    l20: "#b9a495",
    l30: "#ccbeb3",
    l40: "#d6cac2",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#c0603f",
    red: "#c57054",

    darkGreen: "#7a895c",
    green: "#a6bc90",

    darkYellow: "#ef9e74",
    yellow: "#e0a66d",

    darkBlue: "#a4a0df",
    blue: "#90acd5",

    darkMagenta: "#d2acc3",
    magenta: "#c4b2d1",

    darkCyan: "#6a9b86",
    cyan: "#7fb395",

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
