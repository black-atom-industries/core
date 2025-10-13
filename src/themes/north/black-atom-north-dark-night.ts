import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-north-dark-night",
    label: "Black Atom — NORTH ∷ Dark Night",
    appearance: "dark",
    status: "development",
    collection: {
        key: "north",
        label: "NORTH",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.239, 0.014, 266.97),
    d20: oklch(0.28, 0.02, 264.18),
    d30: oklch(0.324, 0.023, 264.18),
    d40: oklch(0.379, 0.029, 266.47),

    m10: oklch(0.416, 0.032, 264.13),
    m20: oklch(0.452, 0.035, 264.13),
    m30: oklch(0.594, 0.077, 254.03),
    m40: oklch(0.697, 0.059, 248.69),

    l10: oklch(0.775, 0.062, 217.47),
    l20: oklch(0.763, 0.048, 194.49),
    l30: oklch(0.899, 0.016, 262.75),
    l40: oklch(0.933, 0.01, 261.79),
};

const palette: Theme.Palette = {
    black: primaries.d20,
    gray: primaries.m20,

    darkRed: oklch(0.606, 0.121, 15.34),
    red: oklch(0.606, 0.121, 15.34),

    darkGreen: oklch(0.768, 0.075, 131.06),
    green: oklch(0.768, 0.075, 131.06),

    darkYellow: oklch(0.693, 0.096, 38.24),
    yellow: oklch(0.855, 0.089, 84.09),

    darkBlue: oklch(0.594, 0.077, 254.03),
    blue: oklch(0.697, 0.059, 248.69),

    darkMagenta: oklch(0.692, 0.062, 332.66),
    magenta: oklch(0.692, 0.062, 332.66),

    darkCyan: oklch(0.775, 0.062, 217.47),
    cyan: oklch(0.763, 0.048, 194.49),

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
