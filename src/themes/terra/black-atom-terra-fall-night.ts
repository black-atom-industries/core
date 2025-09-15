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
    d10: "#120e0e",
    d20: "#1e1815",
    d30: "#2a2120",
    d40: "#362a27",

    m10: "#8a6d58",
    m20: "#a17d68",
    m30: "#b59280",
    m40: "#caa896",

    l10: "#c7ab96",
    l20: "#d4bba8",
    l30: "#e2cdbb",
    l40: "#efdcce",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#d6815c",
    red: "#F48555",

    darkGreen: "#9f745e",
    green: "#c4926e",

    darkYellow: "#F48555",
    yellow: "#eba546",

    darkBlue: "#A47763",
    blue: "#d1a68f",

    darkMagenta: "#c4997a",
    magenta: "#ecc9a2",

    darkCyan: "#ef9e74",
    cyan: "#FEBE98",

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
