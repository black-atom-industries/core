import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-day",
    label: "Black Atom — TER ∷ Winter Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#192125",
    d20: "#1d272c",
    d30: "#212c31",
    d40: "#24333a",

    m10: "#475e6a",
    m20: "#516c7a",
    m30: "#5b7988",
    m40: "#7393a3",

    l10: "#b6c2c9",
    l20: "#c5ced3",
    l30: "#d4dade",
    l40: "#e2e6e9",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

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
