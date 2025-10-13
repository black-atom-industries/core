import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-engineering",
    label: "Black Atom — STA ∷ Engineering",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: "#0e1818",
    d20: "#131e1e",
    d30: "#1c2727",
    d40: "#263131",

    m10: "#51796d",
    m20: "#5b8972",
    m30: "#75a490",
    m40: "#91bcad",

    l10: "#b2e5cd",
    l20: "#c3eed9",
    l30: "#d5f4e3",
    l40: "#e8fbf0",
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

    darkMagenta: "#8b9dd8",
    magenta: "#9baae6",

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
