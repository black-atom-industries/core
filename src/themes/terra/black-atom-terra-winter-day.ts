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

    darkRed: "#b85c47",
    red: "#c76d56",

    darkGreen: "#5a7a3d",
    green: "#6b8f49",

    darkYellow: "#b8814d",
    yellow: "#c89355",

    darkBlue: "#4a6985",
    blue: "#5d7ca0",

    darkMagenta: "#9a7b8f",
    magenta: "#a98ba1",

    darkCyan: "#4a7a67",
    cyan: "#5d8f7a",

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
