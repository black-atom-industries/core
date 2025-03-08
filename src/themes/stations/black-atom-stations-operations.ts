import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-operations",
    label: "Black Atom - Station Operations",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = [
    "#192323",
    "#21302d",
    "#293c36",
    "#354e46",
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

    darkRed: "#eb7aa8",
    red: "#f08cb4",

    darkGreen: "#5dba5d",
    green: "#80c980",

    darkYellow: "#e9b565",
    yellow: "#b7db6e",

    darkBlue: primaries[7],
    blue: primaries[9],

    darkMagenta: "#a2b0e0",
    magenta: "#b6bee0",

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
