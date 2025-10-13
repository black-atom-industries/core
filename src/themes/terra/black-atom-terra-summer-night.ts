import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-summer-night",
    label: "Black Atom — TER ∷ Summer Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.228, 0.016, 274.07),
    d20: oklch(0.249, 0.015, 274.19),
    d30: oklch(0.269, 0.017, 270.7),
    d40: oklch(0.29, 0.019, 272.06),

    m10: oklch(0.435, 0.046, 270.13),
    m20: oklch(0.518, 0.058, 269.69),
    m30: oklch(0.606, 0.055, 269.97),
    m40: oklch(0.653, 0.048, 271.02),

    l10: oklch(0.704, 0.045, 262.92),
    l20: oklch(0.743, 0.04, 264.29),
    l30: oklch(0.832, 0.029, 256.5),
    l40: oklch(0.873, 0.029, 251.48),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m10,

    darkRed: oklch(0.578, 0.142, 31.9),
    red: oklch(0.618, 0.113, 32.25),

    darkGreen: oklch(0.652, 0.1, 137.01),
    green: oklch(0.734, 0.1, 141.6),

    darkYellow: oklch(0.782, 0.131, 64.11),
    yellow: oklch(0.766, 0.115, 77.14),

    darkBlue: oklch(0.645, 0.068, 266.01),
    blue: oklch(0.711, 0.059, 259.27),

    darkMagenta: oklch(0.665, 0.036, 351.67),
    magenta: oklch(0.742, 0.028, 337.25),

    darkCyan: oklch(0.651, 0.08, 161.32),
    cyan: oklch(0.733, 0.068, 172.5),

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
