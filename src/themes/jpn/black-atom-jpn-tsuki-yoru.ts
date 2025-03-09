import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-tsuki-yoru",
    label: "Black At•m — JPN ∷ Tsuki Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#0f0f0f",
    d20: "#1c1c1c",
    d30: "#282828",
    d40: "#373737",

    m10: "#4f4f61",
    m20: "#69697f",
    m30: "#828299",
    m40: "#9d9daf",

    l10: "#b3b3b3",
    l20: "#cbcbcb",
    l30: "#e6e6e6",
    l40: "#ffffff",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#f2759e",
    red: "#F591B2",

    darkGreen: "#71a584",
    green: "#90B99F",

    darkYellow: "#f6a090",
    yellow: "#eab899",

    darkBlue: "#8699c1",
    blue: "#a1b0cf",

    darkMagenta: "#9789c3",
    magenta: "#ACA1CF",

    darkCyan: "#76bdac",
    cyan: "#8dd9c5",

    lightGray: primaries.m40,
    white: primaries.l30,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
