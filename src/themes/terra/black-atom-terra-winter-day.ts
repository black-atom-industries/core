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
    // Dark range - deep cold blues for text
    d10: oklch(0.20, 0.025, 255),
    d20: oklch(0.28, 0.03, 252),
    d30: oklch(0.35, 0.035, 250),
    d40: oklch(0.42, 0.04, 248),

    // Mid range - cold steel blues
    m10: oklch(0.50, 0.045, 248),
    m20: oklch(0.58, 0.05, 250),
    m30: oklch(0.65, 0.045, 252),
    m40: oklch(0.72, 0.04, 255),

    // Light range - icy whites with blue tint for backgrounds
    l10: oklch(0.88, 0.02, 255),
    l20: oklch(0.92, 0.015, 258),
    l30: oklch(0.95, 0.01, 260),
    l40: oklch(0.98, 0.005, 260),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    // Cold violet/mauve - red shifted toward blue (lower L for light bg)
    darkRed: oklch(0.48, 0.10, 290),
    red: oklch(0.56, 0.11, 285),

    // Icy teal - green shifted cold
    darkGreen: oklch(0.48, 0.08, 220),
    green: oklch(0.56, 0.09, 215),

    // Warm amber - lamplight in the cold
    darkYellow: oklch(0.6963, 0.1929, 45.0),
    yellow: oklch(0.7661, 0.1674, 65.0),

    // Signature blue - slightly more present
    darkBlue: oklch(0.48, 0.11, 255),
    blue: oklch(0.56, 0.12, 250),

    // Cold purple
    darkMagenta: oklch(0.48, 0.09, 300),
    magenta: oklch(0.56, 0.10, 295),

    // Ice cyan - frost accent
    darkCyan: oklch(0.50, 0.10, 210),
    cyan: oklch(0.58, 0.11, 205),

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
