import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-koyo-hiru",
    label: "Black Atom • JPN ∷ Koyo Hiru",
    appearance: "light",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = [
    "#403240",
    "#574457",
    "#664a66",
    "#735673",
    "#605872",
    "#6e6a86",
    "#908caa",
    "#aaa7be",
    "#eedcc5",
    "#f4e8d9",
    "#f9f2e9",
    "#fdfbf9",
];

const palette: Theme.Palette = {
    black: primaries[1],
    gray: primaries[5],

    darkRed: "#c65e53",
    red: "#db7070",

    darkGreen: "#428a68",
    green: "#52ad82",

    darkYellow: "#de8641",
    yellow: "#ea9d34",

    darkBlue: "#aa6f83",
    blue: "#9175a3",

    darkMagenta: "#ec935f",
    magenta: "#f0a274",

    darkCyan: "#529e86",
    cyan: "#6aaf9a",

    lightGray: primaries[7],
    white: primaries[8],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
