import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-medical",
    label: "Black At•m — STA ∷ Medical",
    appearance: "light",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: "#22272f",
    d20: "#2b3b33",
    d30: "#384b42",
    d40: "#425953",

    m10: "#476a5f",
    m20: "#517a65",
    m30: "#669a84",
    m40: "#77a494",

    l10: "#c6d1cc",
    l20: "#d4dcd8",
    l30: "#e1e7e4",
    l40: "#eef4f2",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#e06c8c",
    red: "#f472a0",

    darkGreen: "#357c35",
    green: "#3c8e3c",

    darkYellow: "#f2a100",
    yellow: "#66bd0f",

    darkBlue: primaries.m20,
    blue: primaries.m10,

    darkMagenta: "#7768cd",
    magenta: "#998ed9",

    darkCyan: "#3fa569",
    cyan: "#40bf75",

    lightGray: primaries.m40,
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
