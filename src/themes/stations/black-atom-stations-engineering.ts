import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-engineering",
    label: "Black Atom — STA ∷ Engineering",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.199, 0.015, 196.04),
    d20: oklch(0.225, 0.016, 196.09),
    d30: oklch(0.262, 0.015, 196.26),
    d40: oklch(0.303, 0.015, 196.39),

    m10: oklch(0.543, 0.049, 173.68),
    m20: oklch(0.59, 0.062, 162),
    m30: oklch(0.679, 0.059, 166.44),
    m40: oklch(0.76, 0.051, 171.53),

    l10: oklch(0.88, 0.062, 164.62),
    l20: oklch(0.913, 0.053, 164.11),
    l30: oklch(0.94, 0.04, 161.61),
    l40: oklch(0.971, 0.025, 160.61),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: oklch(0.72, 0.147, 355.7),
    red: oklch(0.757, 0.129, 355.17),

    darkGreen: oklch(0.731, 0.15, 145.15),
    green: oklch(0.778, 0.131, 144.83),

    darkYellow: oklch(0.803, 0.135, 82.83),
    yellow: oklch(0.859, 0.147, 119.15),

    darkBlue: primaries.m40,
    blue: primaries.l20,

    darkMagenta: oklch(0.72, 0.088, 279.85),
    magenta: oklch(0.754, 0.086, 280.82),

    darkCyan: oklch(0.728, 0.116, 156.61),
    cyan: oklch(0.808, 0.109, 157.69),

    lightGray: primaries.m40,
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
