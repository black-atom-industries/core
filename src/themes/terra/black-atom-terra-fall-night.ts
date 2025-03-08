import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-night",
    label: "Black At•m — TER ∷ Fall Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = [
    "#0f0e0e",
    "#1a1818",
    "#262423",
    "#2d2926",
    "#665c54",
    "#7c6f64",
    "#928374",
    "#a89984",
    "#ae9685",
    "#b9a495",
    "#ccbeb3",
    "#d6cac2",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[4],

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

    lightGray: primaries[8],
    white: primaries[10],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
