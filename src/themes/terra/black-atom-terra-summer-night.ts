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

const primaries: Theme.Primaries = [
    "#1a1c24",
    "#1f2129",
    "#23262f",
    "#282b35",
    "#47506b",
    "#5b678a",
    "#7581a4",
    "#858fae",
    "#91a0bc",
    "#9facc6",
    "#bcc9db",
    "#c8d7e8",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[4],

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

    lightGray: primaries[8],
    white: primaries[10],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
