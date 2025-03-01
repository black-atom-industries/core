import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-research",
    label: "Black Atom - Research Station",
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
    "#51796d",
    "#5b8972",
    "#75a490",
    "#95b8ac",
    "#c4d3cc",
    "#d2ded8",
    "#e3ebe7",
    "#eef4f2",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#db577c",
    red: "#ec7aa2",

    darkGreen: "#4a9a4a",
    green: "#53aa53",

    darkYellow: "#e69d0c",
    yellow: "#66ad1f",

    darkBlue: primaries[5],
    blue: primaries[4],

    darkMagenta: "#887bd3",
    magenta: "#998ed9",

    darkCyan: "#459f55",
    cyan: "#4db15e",

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
