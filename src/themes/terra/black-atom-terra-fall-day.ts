import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-day",
    label: "Black Atom — TER ∷ Fall Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.202, 0.05, 47.49),
    d20: oklch(0.301, 0.049, 48.35),
    d30: oklch(0.348, 0.05, 49.42),
    d40: oklch(0.438, 0.05, 49.73),

    m10: oklch(0.483, 0.075, 48.75),
    m20: oklch(0.569, 0.074, 49.6),
    m30: oklch(0.655, 0.075, 48.42),
    m40: oklch(0.742, 0.075, 49.01),

    l10: oklch(0.829, 0.055, 58.77),
    l20: oklch(0.872, 0.048, 58.95),
    l30: oklch(0.914, 0.042, 61.44),
    l40: oklch(0.94, 0.038, 61),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.482, 0.151, 29.67),
    red: oklch(0.568, 0.15, 29.52),

    darkGreen: oklch(0.482, 0.06, 128.52),
    green: oklch(0.569, 0.061, 127.36),

    darkYellow: oklch(0.656, 0.16, 34.94),
    yellow: oklch(0.656, 0.16, 54.87),

    darkBlue: oklch(0.481, 0.05, 51.31),
    blue: oklch(0.57, 0.061, 49.91),

    darkMagenta: oklch(0.482, 0.084, 41.63),
    magenta: oklch(0.57, 0.085, 40.86),

    darkCyan: oklch(0.481, 0.06, 175.39),
    cyan: oklch(0.569, 0.06, 175),
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
