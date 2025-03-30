import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-night",
    label: "Black Atom — TER ∷ Winter Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#18191b",
    d20: "#212225",
    d30: "#2c2d30",
    d40: "#34363b",

    m10: "#454955",
    m20: "#5b6171",
    m30: "#707a92",
    m40: "#8a8fa7",

    l10: "#a6afc1",
    l20: "#c0c8d8",
    l30: "#cdd6e4",
    l40: "#dbe4ef",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#a65959",
    red: "#b86a6a",

    darkGreen: "#507765",
    green: "#5e9e8b",

    darkYellow: "#eba778",
    yellow: "#d3b17a",

    darkBlue: "#94acb8",
    blue: "#8c9bc2",

    darkMagenta: "#b793b7",
    magenta: "#c8adc8",

    darkCyan: "#568383",
    cyan: "#67a5a5",

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
