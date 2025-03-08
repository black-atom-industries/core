import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-engineering",
    label: "Black At•m — STA ∷ Engineering",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = [
    "#111717",
    "#192422",
    "#21302b",
    "#2d423b",
    "#51796d",
    "#5b8972",
    "#75a490",
    "#91bcad",
    "#b2e5cd",
    "#c3eed9",
    "#d5f4e3",
    "#e8fbf0",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#eb7aa8",
    red: "#f08cb4",

    darkGreen: "#5dba5d",
    green: "#80c980",

    darkYellow: "#e9b565",
    yellow: "#b7db6e",

    darkBlue: primaries[7],
    blue: primaries[9],

    darkMagenta: "#8b9dd8",
    magenta: "#9baae6",

    darkCyan: "#59bf84",
    cyan: "#75d69e",

    lightGray: primaries[7],
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
