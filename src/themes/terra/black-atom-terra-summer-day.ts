import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-summer-day",
    label: "Black At•m — TER ∷ Summer Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = [
    "#29323d",
    "#343e4d",
    "#3e4b5c",
    "#47576c",
    "#506d95",
    "#5979a6",
    "#7b94b8",
    "#8BA1C1",
    "#b7beca",
    "#c6cbd5",
    "#d1d6e1",
    "#e0e4eb",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#ca6d4c",
    red: "#dd7e5d",

    darkGreen: "#729e60",
    green: "#72ae6a",

    darkYellow: "#e3913d",
    yellow: "#dca958",

    darkBlue: "#5c72d6",
    blue: "#578fdc",

    darkMagenta: "#8253c5",
    magenta: "#c65295",

    darkCyan: "#619f80",
    cyan: "#7bb7a4",

    lightGray: primaries[8],
    white: primaries[10],
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
