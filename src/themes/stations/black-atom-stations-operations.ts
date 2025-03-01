import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-operations",
    label: "Black Atom - Operations Station",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = [
    "#252e2c",
    "#2e3f3b",
    "#384e48",
    "#425d55",
    "#51796d",
    "#5b8972",
    "#75a490",
    "#91bcad",
    "#9bdebe",
    "#abe7ca",
    "#c1efd5",
    "#cef6de",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#ef95ba",
    red: "#f4acc9",

    darkGreen: "#5dba5d",
    green: "#80c980",

    darkYellow: "#c6db6e",
    yellow: "#a6dc6e",

    darkBlue: primaries[7],
    blue: primaries[9],

    darkMagenta: "#a2b0e0",
    magenta: "#b6bee0",

    darkCyan: "#59bf6f",
    cyan: "#75d689",

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
