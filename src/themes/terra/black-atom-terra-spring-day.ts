import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-spring-day",
    label: "Black At•m — TER ∷ Spring Day",
    appearance: "light",
    status: "beta",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = [
    "#304a3f",
    "#385547",
    "#416353",
    "#517b67",
    "#55816a",
    "#62937a",
    "#78a48e",
    "#8bb19e",
    "#b9c6bf",
    "#c7d1cc",
    "#d4dcd8",
    "#e2eae6",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#ca6d4c",
    red: "#dd7e5d",

    darkGreen: "#0d8a4e",
    green: "#0f9d58",

    darkYellow: "#de7b1f",
    yellow: "#e49f19",

    darkBlue: "#3473b2",
    blue: "#588dc1",

    darkMagenta: "#B07BAC",
    magenta: "#a586c6",

    darkCyan: "#0e945d",
    cyan: "#10ab6a",

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
