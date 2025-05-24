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
    d10: "#25292d",
    d20: "#2d3237",
    d30: "#363d43",
    d40: "#444c54",

    m10: "#617283",
    m20: "#7a8c9d",
    m30: "#92a9bb",
    m40: "#b3c1cd",

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

    darkGreen: primaries.m10,
    green: primaries.m20,

    darkYellow: "#ff7140",
    yellow: "#ff8129",

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
