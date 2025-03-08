import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-spring-night",
    label: "Black At•m — TER ∷ Spring Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = [
    "#1d201f",
    "#212523",
    "#272c2a",
    "#313634",
    "#394740",
    "#51635a",
    "#677e72",
    "#82978c",
    "#b8aa94",
    "#c3b8a4",
    "#d6d0c2",
    "#e0ddd1",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[4],

    darkRed: "#b95847",
    red: "#ba6e5f",

    darkGreen: "#6a9f60",
    green: "#8ac090",

    darkYellow: "#e89a61",
    yellow: "#d1a762",

    darkBlue: "#899ddc",
    blue: "#99b9e6",

    darkMagenta: "#d5a9c3",
    magenta: "#c6b3da",

    darkCyan: "#679980",
    cyan: "#85ad9f",

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
