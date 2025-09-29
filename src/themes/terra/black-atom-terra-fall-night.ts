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
    d10: "#211813",
    d20: "#2b1f19",
    d30: "#3e2d24",
    d40: "#523c30",

    m10: "#6F4A3A",
    m20: "#84563f",
    m30: "#a06647",
    m40: "#b87752",

    l10: "#b57a49",
    l20: "#c79365",
    l30: "#d7ac83",
    l40: "#e5c4a3",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#B75B30",
    red: "#C66733",

    darkGreen: "#757e68",
    green: "#8a937b",

    darkYellow: "#dd8c26",
    yellow: "#e7a44a",

    darkBlue: "#b47e65",
    blue: "#d1a68f",

    darkMagenta: "#ce826c",
    magenta: "#eba58c",

    darkCyan: "#D29986",
    cyan: "#C59F91",

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
