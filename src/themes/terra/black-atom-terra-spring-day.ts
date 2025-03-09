import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-spring-day",
    label: "Black At•m — TER ∷ Spring Day",
    appearance: "light",
    status: "beta",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#304a3f",
    d20: "#385547",
    d30: "#416353",
    d40: "#517b67",

    m10: "#55816a",
    m20: "#62937a",
    m30: "#78a48e",
    m40: "#8bb19e",

    l10: "#b9c6bf",
    l20: "#c7d1cc",
    l30: "#d4dcd8",
    l40: "#e2eae6",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#ca6d4c",
    red: "#dd7e5d",

    darkGreen: "#0d8a4e",
    green: "#0f9d58",

    darkYellow: "#de7b1f",
    yellow: "#e49f19",

    darkBlue: "#3473b2",
    blue: "#588dc1",

    darkMagenta: "#B07BAC",
    magenta: "#a586c6",

    darkCyan: "#0e945d",
    cyan: "#10ab6a",

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
