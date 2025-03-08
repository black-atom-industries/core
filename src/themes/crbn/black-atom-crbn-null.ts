import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-null",
    label: "Black Atom • Carbon ∷ NULL",
    appearance: "dark",
    status: "release",
    collection: {
        key: "crbn",
        label: "CRBN",
    },
};

// Original primaries had 9 entries, expanded to 12 for consistency
const primaries: Theme.Primaries = [
    "#0d0d0d", // Original lows (0-2)
    "#131a20",
    "#253341",
    "#3b4c5c", // Added transition color
    "#566575", // Original mids (4-6)
    "#7b8d9e",
    "#a1b5c5",
    "#bacad8", // Added transition color
    "#d3d9df", // Original highs (8-10)
    "#e0e6ec",
    "#ebf2f8",
    "#f5f9ff", // Added brightest color
];

const palette: Theme.Palette = {
    black: primaries[1],
    gray: primaries[4],

    darkRed: "#f33e25",
    red: "#ff624d",

    darkGreen: "#6ad147",
    green: "#8bdb70",

    darkYellow: "#ee9366",
    yellow: "#ff8357",

    darkBlue: "#4481ef",
    blue: "#679cff",

    darkMagenta: primaries[4],
    magenta: primaries[5],

    darkCyan: primaries[4],
    cyan: primaries[5],

    lightGray: primaries[6],
    white: primaries[8],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
