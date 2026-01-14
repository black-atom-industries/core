import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-koyo-yoru",
    label: "Black Atom — JPN ∷ Koyo Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.253, 0.036, 315.74),
    d20: oklch(0.302, 0.034, 315.84),
    d30: oklch(0.346, 0.035, 316.52),
    d40: oklch(0.392, 0.036, 315.08),

    m10: oklch(0.478, 0.042, 298.88),
    m20: oklch(0.564, 0.046, 292.5),
    m30: oklch(0.644, 0.046, 290.96),
    m40: oklch(0.692, 0.039, 292.13),

    l10: oklch(0.785, 0.075, 63.03),
    l20: oklch(0.831, 0.075, 61.19),
    l30: oklch(0.873, 0.075, 59.37),
    l40: oklch(0.914, 0.055, 59.91),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.656, 0.134, 11.39),
    red: oklch(0.699, 0.134, 11.2),

    darkGreen: oklch(0.655, 0.1, 163.69),
    green: oklch(0.7, 0.1, 163.55),

    darkYellow: oklch(0.785, 0.134, 50.33),
    yellow: oklch(0.785, 0.135, 72.83),

    darkBlue: oklch(0.654, 0.05, 300.26),
    blue: oklch(0.699, 0.049, 298.99),

    darkMagenta: oklch(0.7, 0.1, 51.54),
    magenta: oklch(0.786, 0.1, 51.73),

    darkCyan: oklch(0.655, 0.049, 175.15),
    cyan: oklch(0.7, 0.05, 174.22),
});

const ui = createUi(primaries, palette);

const syntax = createSyntax(primaries, palette);

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
