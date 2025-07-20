import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mono-dark",
    label: "Black Atom — MNM ∷ Mono Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#000000",
    d20: "#1a1a1a",
    d30: "#2c2c2c",
    d40: "#404040",

    m10: "#565656",
    m20: "#6c6c6c",
    m30: "#828282",
    m40: "#9a9a9a",

    l10: "#b2b2b2",
    l20: "#cbcbcb",
    l30: "#e5e5e5",
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
    a10: primaries.l40,
    a20: primaries.l30,
    a30: primaries.l20,
    a40: primaries.l10,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette, accents),
    syntax: syntax_dark(primaries, palette, accents),
};

export default theme;
