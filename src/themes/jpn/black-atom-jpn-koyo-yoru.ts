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
    d10: "#291d2e",
    d20: "#35293a",
    d30: "#413446",
    d40: "#4d4053",

    m10: "#605872",
    m20: "#76718f",
    m30: "#8d89a8",
    m40: "#9c98b3",

    l10: "#dcaf87",
    l20: "#ecbd96",
    l30: "#fbcaa4",
    l40: "#ffdbbf",
};

const palette: Theme.Palette = {
    black: primaries.d40,
    gray: primaries.m20,

    darkRed: "#d56b7c",
    red: "#e47889",

    darkGreen: "#4fa480",
    green: "#5db28d",

    darkYellow: "#fd9e66",
    yellow: "#edaa4b",

    darkBlue: "#958aab",
    blue: "#a298b9",

    darkMagenta: "#d08c63",
    magenta: "#eda77d",

    darkCyan: "#719b8f",
    cyan: "#7ea99c",

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
