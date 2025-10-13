import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-night",
    label: "Black Atom — TER ∷ Fall Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.243, 0.025, 58.11),
    d20: oklch(0.262, 0.03, 46.15),
    d30: oklch(0.302, 0.03, 49.08),
    d40: oklch(0.339, 0.03, 47.8),

    m10: oklch(0.483, 0.075, 48.75),
    m20: oklch(0.569, 0.074, 49.6),
    m30: oklch(0.655, 0.075, 48.42),
    m40: oklch(0.742, 0.075, 49.01),

    l10: oklch(0.784, 0.05, 49.4),
    l20: oklch(0.85, 0.05, 50.05),
    l30: oklch(0.891, 0.05, 48.14),
    l40: oklch(0.935, 0.036, 48.31),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: oklch(0.656, 0.14, 29.42),
    red: oklch(0.699, 0.14, 29.58),

    darkGreen: oklch(0.655, 0.05, 127.63),
    green: oklch(0.698, 0.05, 127.55),

    darkYellow: oklch(0.699, 0.15, 50.77),
    yellow: oklch(0.699, 0.15, 72.07),

    darkBlue: oklch(0.655, 0.101, 50.7),
    blue: oklch(0.699, 0.101, 52.11),

    darkMagenta: oklch(0.656, 0.101, 36.23),
    magenta: oklch(0.701, 0.1, 40.54),

    darkCyan: oklch(0.655, 0.049, 175.15),
    cyan: oklch(0.7, 0.05, 174.22),

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
