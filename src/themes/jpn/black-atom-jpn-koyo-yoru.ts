import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-koyo-yoru",
    label: "Black Atom - JPN Koyo Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = [
    "#271f27",
    "#332733",
    "#3f2f3f",
    "#4a384a",
    "#605872",
    "#6e6a86",
    "#908caa",
    "#aaa7be",
    "#dab18c",
    "#e0be9f",
    "#e6cbb2",
    "#ecd8c5",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#b46371",
    red: "#eb6f84",

    darkGreen: "#53ad82",
    green: "#7ab89b",

    darkYellow: "#ee9c6b",
    yellow: "#e9b162",

    darkBlue: "#ad8593",
    blue: "#a095a8",

    darkMagenta: "#ef9d6c",
    magenta: "#ffb488",

    darkCyan: "#68b19a",
    cyan: "#8cc1b0",

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
