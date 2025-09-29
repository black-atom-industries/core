import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-day",
    label: "Black Atom — TER ∷ Fall Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#280e02",
    d20: "#422617",
    d30: "#4f3222",
    d40: "#694a39",

    m10: "#815137",
    m20: "#9b6a4f",
    m30: "#b78368",
    m40: "#d39e82",

    l10: "#e3bfa4",
    l20: "#eeceb6",
    l30: "#f8ddc7",
    l40: "#ffe6d2",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#9e362a",
    red: "#bb5143",

    darkGreen: "#566445",
    green: "#6f7d5d",

    darkYellow: "#db6c44",
    yellow: "#d57421",

    darkBlue: "#755645",
    blue: "#906f5d",

    darkMagenta: "#824f3c",
    magenta: "#9e6855",

    darkCyan: "#3e675c",
    cyan: "#578175",

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
