import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-north-day",
    label: "Black Atom — NORTH ∷ Day",
    appearance: "light",
    status: "beta",
    collection: {
        key: "north",
        label: "NORTH",
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

    darkRed: "#A85560",
    red: "#B45A63",

    darkGreen: "#8FA678",
    green: "#96AD7F",

    darkYellow: "#c77257",
    yellow: "#ddbb79",

    darkBlue: "#52719A",
    blue: "#7391B0",

    darkMagenta: "#9D7E99",
    magenta: "#A685A1",

    darkCyan: "#79ACBD",
    cyan: "#7FA9A8",

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
