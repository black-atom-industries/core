import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

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
    // Dark range - deep teal/navy like White Lotus frame
    d10: oklch(0.16, 0.03, 195),
    d20: oklch(0.20, 0.035, 190),
    d30: oklch(0.25, 0.04, 185),
    d40: oklch(0.30, 0.04, 180),

    // Mid range - muted sage/olive
    m10: oklch(0.42, 0.04, 155),
    m20: oklch(0.50, 0.045, 150),
    m30: oklch(0.58, 0.04, 145),
    m40: oklch(0.65, 0.035, 140),

    // Light range - warm cream/golden
    l10: oklch(0.80, 0.04, 90),
    l20: oklch(0.86, 0.035, 85),
    l30: oklch(0.91, 0.025, 80),
    l40: oklch(0.95, 0.02, 75),
};

const palette = createPalette(primaries, {
    // Terracotta - warm accent
    darkRed: oklch(0.62, 0.12, 45),
    red: oklch(0.70, 0.13, 40),

    // Sage/olive green - the signature
    darkGreen: oklch(0.62, 0.11, 145),
    green: oklch(0.72, 0.12, 150),

    // Warm gold - vibrant accent
    darkYellow: oklch(0.75, 0.14, 65),
    yellow: oklch(0.82, 0.14, 80),

    // Deep teal - like the frame
    darkBlue: oklch(0.55, 0.11, 200),
    blue: oklch(0.65, 0.12, 195),

    // Dusty rose
    darkMagenta: oklch(0.62, 0.10, 10),
    magenta: oklch(0.70, 0.11, 5),

    // Teal/seafoam
    darkCyan: oklch(0.62, 0.10, 175),
    cyan: oklch(0.72, 0.11, 170),
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
