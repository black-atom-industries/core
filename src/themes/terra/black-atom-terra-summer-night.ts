import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-summer-night",
    label: "Black At•m — TER ∷ Summer Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1a1c24",
    d20: "#1f2129",
    d30: "#23262f",
    d40: "#282b35",

    m10: "#47506b",
    m20: "#5b678a",
    m30: "#7581a4",
    m40: "#858fae",

    l10: "#91a0bc",
    l20: "#9facc6",
    l30: "#bcc9db",
    l40: "#c8d7e8",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#bf5441",
    red: "#c06a59",

    darkGreen: "#729e60",
    green: "#85b97e",

    darkYellow: "#f2a557",
    yellow: "#dca958",

    darkBlue: "#9f99e5",
    blue: "#96b9e9",

    darkMagenta: "#d5a9c3",
    magenta: "#c4acd7",

    darkCyan: "#619f80",
    cyan: "#7bb7a4",

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
