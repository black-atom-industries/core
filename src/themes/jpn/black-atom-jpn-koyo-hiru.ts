import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-koyo-hiru",
    label: "Black Atom — JPN ∷ Koyo Hiru",
    appearance: "light",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.258, 0.021, 326.17),
    d20: oklch(0.319, 0.027, 326.18),
    d30: oklch(0.367, 0.043, 326.41),
    d40: oklch(0.432, 0.049, 326.39),

    m10: oklch(0.496, 0.052, 326.32),
    m20: oklch(0.588, 0.057, 326.28),
    m30: oklch(0.671, 0.056, 326.17),
    m40: oklch(0.755, 0.041, 325.98),

    l10: oklch(0.903, 0.037, 74.04),
    l20: oklch(0.936, 0.024, 73.61),
    l30: oklch(0.964, 0.014, 74.43),
    l40: oklch(0.989, 0.003, 67.78),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.606, 0.135, 27.88),
    red: oklch(0.669, 0.134, 21.3),

    darkGreen: oklch(0.577, 0.09, 161.13),
    green: oklch(0.68, 0.109, 160.92),

    darkYellow: oklch(0.701, 0.136, 56.01),
    yellow: oklch(0.755, 0.146, 69.74),

    darkBlue: oklch(0.61, 0.079, 357.78),
    blue: oklch(0.606, 0.075, 311.8),

    darkMagenta: oklch(0.745, 0.127, 50.13),
    magenta: oklch(0.779, 0.111, 51.01),

    darkCyan: oklch(0.643, 0.085, 170.79),
    cyan: oklch(0.702, 0.077, 172.56),
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
