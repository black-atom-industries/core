import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-spring-night",
    label: "Black Atom — TER ∷ Spring Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1d201f",
    d20: "#212523",
    d30: "#272c2a",
    d40: "#313634",

    m10: "#394740",
    m20: "#51635a",
    m30: "#677e72",
    m40: "#82978c",

    l10: "#b8aa94",
    l20: "#c3b8a4",
    l30: "#d6d0c2",
    l40: "#e0ddd1",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: "#b95847",
    red: "#ba6e5f",

    darkGreen: "#73b268",
    green: "#92d49a",

    darkYellow: "#e89a61",
    yellow: "#d1a762",

    darkBlue: "#899ddc",
    blue: "#99b9e6",

    darkMagenta: "#d5a9c3",
    magenta: "#c6b3da",

    darkCyan: "#679980",
    cyan: "#85ad9f",

    lightGray: primaries.l10,
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
