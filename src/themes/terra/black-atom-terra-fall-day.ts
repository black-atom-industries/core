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
    d10: "#1e1e1e",
    d20: "#2a2523",
    d30: "#352e2a",
    d40: "#453a33",

    m10: "#8a6d58",
    m20: "#a17d68",
    m30: "#b59280",
    m40: "#caa896",

    l10: "#dcc6b6",
    l20: "#e8d2c1",
    l30: "#f1ddcd",
    l40: "#f7e8da",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#F48555",
    red: "#e8845f",

    darkGreen: "#8f6855",
    green: "#bd845c",

    darkYellow: "#db7f32",
    yellow: "#ec9823",

    darkBlue: "#8f5a47",
    blue: "#a66b5a",

    darkMagenta: "#A47763",
    magenta: "#b8896b",

    darkCyan: "#e6804c",
    cyan: "#f3a170",

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
