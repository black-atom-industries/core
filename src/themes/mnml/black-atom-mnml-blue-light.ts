import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-blue-light",
    label: "Black Atom — MNM ∷ Blue Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#000000",
    d20: "#1a1a1a",
    d30: "#333333",
    d40: "#4d4d4d",

    m10: "#666666",
    m20: "#808080",
    m30: "#999999",
    m40: "#b3b3b3",

    l10: "#cccccc",
    l20: "#e6e6e6",
    l30: "#f5f5f5",
    l40: "#ffffff",
};

const palette: Theme.Palette = {
    black: primaries.d10,
    gray: primaries.m10,

    darkRed: primaries.m20,
    red: primaries.m30,

    darkGreen: primaries.m20,
    green: primaries.m30,

    darkYellow: primaries.m20,
    yellow: primaries.m30,

    darkBlue: primaries.m20,
    blue: primaries.m30,

    darkMagenta: primaries.m10,
    magenta: primaries.m20,

    darkCyan: primaries.m10,
    cyan: primaries.m20,

    lightGray: primaries.m30,
    white: primaries.l10,
};

const accents: Theme.Accents = {
    a10: "#005CC5",
    a20: "#004A9F",
    a30: "#79B8FF",
    a40: "#3393ff",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette, accents),
    syntax: syntax_light(primaries, palette, accents),
};

export default theme;
