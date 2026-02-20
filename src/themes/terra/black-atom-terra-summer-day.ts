import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

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
    // Dark range - deep teal/olive for text
    d10: oklch(0.22, 0.04, 175),
    d20: oklch(0.28, 0.045, 170),
    d30: oklch(0.35, 0.05, 165),
    d40: oklch(0.42, 0.05, 160),

    // Mid range - muted sage
    m10: oklch(0.50, 0.045, 155),
    m20: oklch(0.58, 0.04, 150),
    m30: oklch(0.65, 0.035, 145),
    m40: oklch(0.72, 0.03, 140),

    // Light range - warm cream backgrounds
    l10: oklch(0.90, 0.035, 85),
    l20: oklch(0.93, 0.03, 80),
    l30: oklch(0.95, 0.025, 75),
    l40: oklch(0.97, 0.02, 70),
};

const palette = createPalette(primaries, {
    // Muted terracotta - restrained warmth
    darkRed: oklch(0.50, 0.20, 45),
    red: oklch(0.58, 0.20, 40),

    // Sage/olive green - the signature
    darkGreen: oklch(0.45, 0.09, 145),
    green: oklch(0.52, 0.10, 150),

    // Warm gold - elegant accent
    darkYellow: oklch(0.7643, 0.1616, 66.04),
    yellow: oklch(0.8162, 0.1626, 80.0),

    // Deep teal - like the frame
    darkBlue: oklch(0.42, 0.10, 200),
    blue: oklch(0.50, 0.11, 195),

    // Dusty rose - subtle
    darkMagenta: oklch(0.50, 0.15, 10),
    magenta: oklch(0.58, 0.15, 5),

    // Muted teal/seafoam
    darkCyan: oklch(0.45, 0.08, 175),
    cyan: oklch(0.52, 0.09, 170),
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
