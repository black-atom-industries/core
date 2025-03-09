import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-operations",
    label: "Black At•m — STA ∷ Operations",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: "#192323",
    d20: "#21302d",
    d30: "#293c36",
    d40: "#354e46",

    m10: "#51796d",
    m20: "#5b8972",
    m30: "#75a490",
    m40: "#91bcad",

    l10: "#9bdebe",
    l20: "#abe7ca",
    l30: "#c1efd5",
    l40: "#cef6de",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#eb7aa8",
    red: "#f08cb4",

    darkGreen: "#5dba5d",
    green: "#80c980",

    darkYellow: "#e9b565",
    yellow: "#b7db6e",

    darkBlue: primaries.m40,
    blue: primaries.l20,

    darkMagenta: "#a2b0e0",
    magenta: "#b6bee0",

    darkCyan: "#59bf84",
    cyan: "#75d69e",

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
