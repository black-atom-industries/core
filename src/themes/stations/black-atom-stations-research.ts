import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-research",
    label: "Black Atom — STA ∷ Research",
    appearance: "light",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1e2229",
    d20: "#2b3b33",
    d30: "#384b42",
    d40: "#425953",

    m10: "#51796d",
    m20: "#5b8972",
    m30: "#75a490",
    m40: "#95b8ac",

    l10: "#e3e8e6",
    l20: "#edf1ef",
    l30: "#f8f9f9",
    l40: "#ffffff",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#e06c8c",
    red: "#f472a0",

    darkGreen: "#4a9a4a",
    green: "#53aa53",

    darkYellow: "#f2a100",
    yellow: "#66bd0f",

    darkBlue: primaries.m20,
    blue: primaries.m10,

    darkMagenta: "#887bd3",
    magenta: "#998ed9",

    darkCyan: "#3fa569",
    cyan: "#40bf75",

    lightGray: primaries.m40,
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
