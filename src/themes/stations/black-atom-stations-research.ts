import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-research",
    label: "Black Atom - Station Research",
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
    "#d5dcd9",
    "#e2e8e5",
    "#f0f2f1",
    "#f7faf9",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#e06c8c",
    red: "#f472a0",

    darkGreen: "#4a9a4a",
    green: "#53aa53",

    darkYellow: "#f2a100",
    yellow: "#66bd0f",

    darkBlue: primaries[5],
    blue: primaries[4],

    darkMagenta: "#887bd3",
    magenta: "#998ed9",

    darkCyan: "#3fa569",
    cyan: "#40bf75",

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
