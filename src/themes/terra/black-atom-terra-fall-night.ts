import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-night",
    label: "Black Atom — TER ∷ Fall Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#291d14",
    d20: "#312018",
    d30: "#3b2a21",
    d40: "#45332a",

    m10: "#815137",
    m20: "#9b6a4f",
    m30: "#b78368",
    m40: "#d39e82",

    l10: "#d4b09d",
    l20: "#eac5b1",
    l30: "#f8d2bf",
    l40: "#ffe3d5",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#d96c5d",
    red: "#e87969",

    darkGreen: "#889776",
    green: "#95a483",

    darkYellow: "#e67f3c",
    yellow: "#d68c00",

    darkBlue: "#c27e56",
    blue: "#d08c62",

    darkMagenta: "#c67a65",
    magenta: "#d4896e",

    darkCyan: "#719b8f",
    cyan: "#7ea99c",

    lightGray: primaries.l10,
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
