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
    d10: oklch(0.324, 0.023, 264.18),
    d20: oklch(0.379, 0.029, 266.47),
    d30: oklch(0.416, 0.032, 264.13),
    d40: oklch(0.452, 0.035, 264.13),

    m10: oklch(0.519, 0.031, 245.08),
    m20: oklch(0.577, 0.029, 243.07),
    m30: oklch(0.635, 0.03, 244.91),
    m40: oklch(0.691, 0.028, 242.92),

    l10: oklch(0.899, 0.016, 262.75),
    l20: oklch(0.933, 0.01, 261.79),
    l30: oklch(0.951, 0.007, 260.73),
    l40: oklch(0.951, 0.007, 260.73),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: oklch(0.718, 0.046, 18.27),
    red: oklch(0.779, 0.042, 18.09),

    darkGreen: oklch(0.726, 0.036, 145.19),
    green: oklch(0.803, 0.046, 145.13),

    darkYellow: oklch(0.693, 0.096, 38.24),
    yellow: oklch(0.855, 0.089, 84.09),

    darkBlue: oklch(0.645, 0.068, 266.01),
    blue: oklch(0.72, 0.069, 270.56),

    darkMagenta: oklch(0.707, 0.056, 300.6),
    magenta: oklch(0.777, 0.055, 311.15),

    darkCyan: oklch(0.762, 0.035, 212.91),
    cyan: oklch(0.836, 0.039, 206.76),

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
