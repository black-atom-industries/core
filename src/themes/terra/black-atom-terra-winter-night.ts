import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-night",
    label: "Black Atom — TER ∷ Winter Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    // Dark range - icy deep blues
    d10: oklch(0.16, 0.010, 260),
    d20: oklch(0.20, 0.015, 258),
    d30: oklch(0.25, 0.025, 255),
    d40: oklch(0.30, 0.035, 252),

    // Mid range - cold steel blues
    m10: oklch(0.44, 0.045, 250),
    m20: oklch(0.50, 0.05, 248),
    m30: oklch(0.55, 0.045, 250),
    m40: oklch(0.60, 0.04, 252),

    // Light range - icy whites with blue tint
    l10: oklch(0.84, 0.025, 255),
    l20: oklch(0.89, 0.02, 258),
    l30: oklch(0.93, 0.015, 260),
    l40: oklch(0.96, 0.01, 260),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    // Cold violet/mauve - red shifted toward blue
    darkRed: oklch(0.68, 0.08, 290),
    red: oklch(0.75, 0.09, 285),

    // Icy teal - green shifted cold
    darkGreen: oklch(0.70, 0.06, 220),
    green: oklch(0.78, 0.07, 215),

    // Pale icy lavender - yellow becomes cold
    // Warm amber - lamplight in the cold
    darkYellow: oklch(0.72, 0.14, 45),
    yellow: oklch(0.80, 0.14, 65),

    // Signature blue - slightly more present
    darkBlue: oklch(0.68, 0.09, 255),
    blue: oklch(0.76, 0.10, 250),

    // Cold purple
    darkMagenta: oklch(0.68, 0.07, 300),
    magenta: oklch(0.76, 0.08, 295),

    // Ice cyan - frost accent
    darkCyan: oklch(0.72, 0.08, 210),
    cyan: oklch(0.80, 0.09, 205),

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
