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
    "#c6d1cc",
    "#d4dcd8",
    "#e1e7e4",
    "#eef4f2",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#e06c8c",
    red: "#f472a0",

    darkGreen: "#357c35",
    green: "#3c8e3c",

    darkYellow: "#f2a100",
    yellow: "#66bd0f",

    darkBlue: primaries[5],
    blue: primaries[4],

    darkMagenta: "#7768cd",
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
