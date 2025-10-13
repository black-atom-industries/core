import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-winter-day",
    label: "Black Atom — TER ∷ Winter Day",
    appearance: "light",
    status: "development",
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

    m10: oklch(0.534, 0.075, 254.34),
    m20: oklch(0.63, 0.073, 249.06),
    m30: oklch(0.726, 0.075, 218.6),
    m40: oklch(0.728, 0.054, 194.5),

    l10: oklch(0.874, 0.02, 260.17),
    l20: oklch(0.917, 0.012, 259.82),
    l30: oklch(0.943, 0.009, 264.52),
    l40: oklch(0.951, 0.007, 260.73),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: oklch(0.504, 0.059, 249.9),
    red: oklch(0.577, 0.066, 252.64),

    darkGreen: oklch(0.535, 0.042, 247.41),
    green: oklch(0.605, 0.041, 243.64),

    darkYellow: oklch(0.573, 0.03, 250.06),
    yellow: oklch(0.641, 0.028, 240.9),

    darkBlue: oklch(0.457, 0.059, 249.22),
    blue: oklch(0.533, 0.069, 253.37),

    darkMagenta: oklch(0.515, 0.05, 266.41),
    magenta: oklch(0.588, 0.058, 267.02),

    darkCyan: oklch(0.499, 0.046, 237.59),
    cyan: oklch(0.572, 0.051, 242.03),

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
