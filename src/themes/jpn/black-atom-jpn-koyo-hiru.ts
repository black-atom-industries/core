import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-koyo-hiru",
    label: "Black Atom — JPN ∷ Koyo Hiru",
    appearance: "light",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = {
    d10: "#292029",
    d20: "#3a2e3a",
    d30: "#4b374b",
    d40: "#5f475f",

    m10: "#725872",
    m20: "#8f718f",
    m30: "#a88aa8",
    m40: "#bea7be",

    l10: "#eedcc5",
    l20: "#f4e8d9",
    l30: "#f9f2e9",
    l40: "#fdfbf9",
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m20,

    darkRed: "#c65e53",
    red: "#db7070",

    darkGreen: "#428a68",
    green: "#52ad82",

    darkYellow: "#de8641",
    yellow: "#ea9d34",

    darkBlue: "#aa6f83",
    blue: "#9175a3",

    darkMagenta: "#ec935f",
    magenta: "#f0a274",

    darkCyan: "#529e86",
    cyan: "#6aaf9a",

    lightGray: primaries.m40,
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
