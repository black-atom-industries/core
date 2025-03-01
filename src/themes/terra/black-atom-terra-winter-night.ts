import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-night",
    label: "Black Atom - Terra Winter Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = [
    "#18191b",
    "#212225",
    "#2c2d30",
    "#34363b",
    "#454955",
    "#5b6171",
    "#707a92",
    "#8a8fa7",
    "#a6afc1",
    "#c0c8d8",
    "#cdd6e4",
    "#dbe4ef",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#a65959",
    red: "#b86a6a",

    darkGreen: "#507765",
    green: "#5e9e8b",

    darkYellow: "#eba778",
    yellow: "#d3b17a",

    darkBlue: "#94acb8",
    blue: "#8c9bc2",

    darkMagenta: "#b793b7",
    magenta: "#c8adc8",

    darkCyan: "#568383",
    cyan: "#67a5a5",

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
