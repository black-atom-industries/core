import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-spring-day",
    label: "Black Atom — TER ∷ Spring Day",
    appearance: "light",
    status: "beta",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.384, 0.037, 166.2),
    d20: oklch(0.422, 0.042, 163.02),
    d30: oklch(0.468, 0.047, 163.55),
    d40: oklch(0.546, 0.057, 163.19),

    m10: oklch(0.564, 0.061, 160.83),
    m20: oklch(0.621, 0.065, 161.49),
    m30: oklch(0.68, 0.058, 162.67),
    m40: oklch(0.727, 0.05, 163.21),

    l10: oklch(0.815, 0.017, 162.65),
    l20: oklch(0.852, 0.013, 164.74),
    l30: oklch(0.887, 0.01, 164.84),
    l40: oklch(0.93, 0.01, 164.86),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.634, 0.127, 40.02),
    red: oklch(0.69, 0.127, 39.78),

    darkGreen: oklch(0.606, 0.151, 153.55),
    green: oklch(0.667, 0.162, 154.9),

    darkYellow: oklch(0.68, 0.155, 56.64),
    yellow: oklch(0.751, 0.152, 76.47),

    darkBlue: oklch(0.545, 0.118, 250.9),
    blue: oklch(0.628, 0.097, 249.18),

    darkMagenta: oklch(0.653, 0.094, 329.18),
    magenta: oklch(0.672, 0.098, 306.1),

    darkCyan: oklch(0.588, 0.134, 158.02),
    cyan: oklch(0.654, 0.152, 157.29),
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
