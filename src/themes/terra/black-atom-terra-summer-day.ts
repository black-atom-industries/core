import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-summer-day",
    label: "Black Atom — TER ∷ Summer Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.313, 0.023, 253.63),
    d20: oklch(0.361, 0.029, 258.36),
    d30: oklch(0.408, 0.033, 255.26),
    d40: oklch(0.452, 0.04, 255.37),

    m10: oklch(0.529, 0.072, 256.57),
    m20: oklch(0.57, 0.079, 256.97),
    m30: oklch(0.661, 0.061, 257.46),
    m40: oklch(0.703, 0.053, 257.68),

    l10: oklch(0.8, 0.019, 261.33),
    l20: oklch(0.841, 0.015, 264.49),
    l30: oklch(0.876, 0.016, 266.27),
    l40: oklch(0.918, 0.01, 261.79),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: oklch(0.634, 0.127, 40.02),
    red: oklch(0.69, 0.127, 39.78),

    darkGreen: oklch(0.652, 0.1, 137.01),
    green: oklch(0.693, 0.115, 141.53),

    darkYellow: oklch(0.726, 0.139, 62.78),
    yellow: oklch(0.766, 0.115, 77.14),

    darkBlue: oklch(0.589, 0.092, 257.91),
    blue: oklch(0.656, 0.09, 253.29),

    darkMagenta: oklch(0.626, 0.057, 2.33),
    magenta: oklch(0.701, 0.047, 357.01),

    darkCyan: oklch(0.651, 0.08, 161.32),
    cyan: oklch(0.733, 0.068, 172.5),

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
