import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-medical",
    label: "Black Atom - Station Medical",
    appearance: "light",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = [
    "#1e2229",
    "#2b3b33",
    "#384b42",
    "#425953",
    "#476a5f",
    "#517a65",
    "#669a84",
    "#77a494",
    "#a6bdb2",
    "#b7cac1",
    "#c2d3cb",
    "#d0e0d8",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#db577c",
    red: "#ec7aa2",

    darkGreen: "#357c35",
    green: "#3c8e3c",

    darkYellow: "#d9950f",
    yellow: "#60a918",

    darkBlue: primaries[5],
    blue: primaries[4],

    darkMagenta: "#7768cd",
    magenta: "#998ed9",

    darkCyan: "#389248",
    cyan: "#4aaa5b",

    lightGray: primaries[7],
    white: primaries[10],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
