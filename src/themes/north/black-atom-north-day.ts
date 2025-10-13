import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-north-day",
    label: "Black Atom — NORTH ∷ Day",
    appearance: "light",
    status: "beta",
    collection: {
        key: "north",
        label: "NORTH",
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

    darkRed: oklch(0.553, 0.109, 12.96),
    red: oklch(0.578, 0.117, 15.17),

    darkGreen: oklch(0.695, 0.07, 129.65),
    green: oklch(0.718, 0.069, 129.6),

    darkYellow: oklch(0.64, 0.115, 38.37),
    yellow: oklch(0.807, 0.093, 83.23),

    darkBlue: oklch(0.542, 0.074, 255.67),
    blue: oklch(0.645, 0.058, 249.57),

    darkMagenta: oklch(0.631, 0.054, 330.53),
    magenta: oklch(0.657, 0.056, 331.36),

    darkCyan: oklch(0.715, 0.059, 220.66),
    cyan: oklch(0.704, 0.045, 194.34),

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
