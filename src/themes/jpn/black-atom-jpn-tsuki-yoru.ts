import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-tsuki-yoru",
    label: "Black Atom - JPN Tsuki Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = [
    "#0f0f0f",
    "#1c1c1c",
    "#282828",
    "#373737",
    "#4f4f61",
    "#69697f",
    "#828299",
    "#9d9daf",
    "#b3b3b3",
    "#cbcbcb",
    "#e6e6e6",
    "#ffffff",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[4],

    darkRed: "#f2759e",
    red: "#F591B2",

    darkGreen: "#71a584",
    green: "#90B99F",

    darkYellow: "#f6a090",
    yellow: "#eab899",

    darkBlue: "#8699c1",
    blue: "#a1b0cf",

    darkMagenta: "#9789c3",
    magenta: "#ACA1CF",

    darkCyan: "#76bdac",
    cyan: "#8dd9c5",

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
