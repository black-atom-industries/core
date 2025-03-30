import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-koyo-yoru",
    label: "Black Atom — JPN ∷ Koyo Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#271f27",
    d20: "#332733",
    d30: "#3f2f3f",
    d40: "#4a384a",

    m10: "#605872",
    m20: "#6e6a86",
    m30: "#908caa",
    m40: "#aaa7be",

    l10: "#dab18c",
    l20: "#e0be9f",
    l30: "#e6cbb2",
    l40: "#ecd8c5",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

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

    lightGray: primaries.m40,
    white: primaries.l30,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
