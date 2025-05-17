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
    d10: "#14131e",
    d20: "#1d1b2a",
    d30: "#262337",
    d40: "#332f4a",

    m10: "#605872",
    m20: "#76718f",
    m30: "#8d89a8",
    m40: "#9c98b3",

    l10: "#e0af9f",
    l20: "#e6bfb2",
    l30: "#eccfc5",
    l40: "#f2dfd8",
};

const palette: Theme.Palette = {
    black: primaries.d40,
    gray: primaries.m20,

    darkRed: "#ba5d6d",
    red: "#e27889",

    darkGreen: "#619f81",
    green: "#80b29a",

    darkYellow: "#e29f77",
    yellow: "#e4ae67",

    darkBlue: "#ad8593",
    blue: "#a095a8",

    darkMagenta: "#ef9d6c",
    magenta: "#ffb488",

    darkCyan: "#70a997",
    cyan: "#91bcaf",

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
