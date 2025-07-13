import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-crbn-supr",
    label: "Black Atom — CRB ∷ SUPR",
    appearance: "light",
    status: "release",
    collection: {
        key: "crbn",
        label: "CRBN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#131517",
    d20: "#1f2326",
    d30: "#2d3338",
    d40: "#3b4249",

    m10: "#507294",
    m20: "#698cae",
    m30: "#8caac1",
    m40: "#adc1d3",

    l10: "#e5ebf1",
    l20: "#ebf1f4",
    l30: "#f9fbfc",
    l40: "#ffffff",
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: "#e52800",
    red: "#ff4019",

    darkGreen: primaries.m10,
    green: primaries.m20,

    darkYellow: "#ff4200",
    yellow: "#ff7200",

    darkBlue: primaries.m20,
    blue: primaries.m30,

    darkMagenta: primaries.m10,
    magenta: primaries.m20,

    darkCyan: primaries.d30,
    cyan: primaries.d20,

    lightGray: primaries.m30,
    white: primaries.l10,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
