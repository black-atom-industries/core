import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-day",
    label: "Black Atom — TER ∷ Fall Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#4b3b30",
    d20: "#584538",
    d30: "#60534c",
    d40: "#6e5c52",

    m10: "#7e6350",
    m20: "#8d6c58",
    m30: "#a0745d",
    m40: "#b28167",

    l10: "#dcc6b6",
    l20: "#e8d2c1",
    l30: "#f1ddcd",
    l40: "#f7e8da",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#f2743d",
    red: "#e5764d",

    darkGreen: "#8f6855",
    green: "#b6764a",

    darkYellow: "#d87726",
    yellow: "#eb9115",

    darkBlue: "#885644",
    blue: "#a66b5a",

    darkMagenta: "#a0725d",
    magenta: "#b58464",

    darkCyan: "#e6804c",
    cyan: "#f19258",

    lightGray: primaries.l10,
    white: primaries.l30,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
