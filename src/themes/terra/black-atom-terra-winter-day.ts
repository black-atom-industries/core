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
    d10: "#2E3440",
    d20: "#3B4252",
    d30: "#434C5E",
    d40: "#4C566A",

    m10: "#4e6f98",
    m20: "#668db4",
    m30: "#6eb2c6",
    m40: "#7fb2b1",

    l10: "#ced6e3",
    l20: "#dfe4ec",
    l30: "#e9ecf2",
    l40: "#ECEFF4",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#4a6785",
    red: "#5d7ca0",

    darkGreen: "#5a7085",
    green: "#6d8599",

    darkYellow: "#6b7a8a",
    yellow: "#7e8f9c",

    darkBlue: "#3d5a77",
    blue: "#506f94",

    darkMagenta: "#5a6785",
    magenta: "#6d7ca0",

    darkCyan: "#4a677a",
    cyan: "#5d7c94",

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
