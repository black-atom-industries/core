import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-day",
    label: "Black At•m — TER ∷ Winter Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = [
    "#192125",
    "#1d272c",
    "#212c31",
    "#24333a",
    "#475e6a",
    "#516c7a",
    "#5b7988",
    "#7393a3",
    "#b6c2c9",
    "#c5ced3",
    "#d4dade",
    "#e2e6e9",
];

const palette: Theme.Palette = {
    black: primaries[2],
    gray: primaries[5],

    darkRed: "#ca6d4c",
    red: "#dd7e5d",

    darkGreen: "#4a7126",
    green: "#58852c",

    darkYellow: "#cc764b",
    yellow: "#d19845",

    darkBlue: "#3d668e",
    blue: "#5980a6",

    darkMagenta: "#ab80a8",
    magenta: "#a58bc1",

    darkCyan: "#296a50",
    cyan: "#348764",

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
