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
    d10: "#1d2730",
    d20: "#344859",
    d30: "#415a70",
    d40: "#566e84",

    m10: "#6c7f92",
    m20: "#8999a8",
    m30: "#a2b5c5",
    m40: "#bfcbd5",

    l10: "#dee6ed",
    l20: "#e8eff2",
    l30: "#f2f4f9",
    l40: "#fafafa",
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m10,

    darkRed: "#e63c19",
    red: "#ff5533",

    darkGreen: primaries.m30,
    green: primaries.m40,

    darkYellow: "#ff7140",
    yellow: "#ff8129",

    darkBlue: primaries.m30,
    blue: primaries.m40,

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
