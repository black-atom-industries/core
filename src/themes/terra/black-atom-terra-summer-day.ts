import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-light.ts";
import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-terra-summer-day"];

const primaries: ThemePrimaryColors = {
    // Dark range — deep jungle canopy
    d10: oklch(0.18, 0.06, 160),
    d20: oklch(0.24, 0.07, 155),
    d30: oklch(0.32, 0.08, 150),
    d40: oklch(0.40, 0.09, 145),

    // Mid range — monstera leaf, vibrant fern, bamboo shoot
    m10: oklch(0.48, 0.10, 140),
    m20: oklch(0.56, 0.11, 135),
    m30: oklch(0.64, 0.08, 120),
    m40: oklch(0.72, 0.06, 110),

    // Light range — teak dawn, rice paper, ivory, white lotus
    l10: oklch(0.91, 0.025, 98),
    l20: oklch(0.94, 0.02, 93),
    l30: oklch(0.96, 0.015, 88),
    l40: oklch(0.98, 0.01, 85),
};

const palette = createPalette(primaries, {
    // Orchid plumeria — tropical bloom accent
    darkRed: oklch(0.48, 0.18, 15),
    red: oklch(0.56, 0.20, 10),

    // Emerald jungle — lush foliage
    darkGreen: oklch(0.40, 0.16, 145),
    green: oklch(0.52, 0.18, 140),

    // Temple amber — deep golden accent with contrast
    darkYellow: oklch(0.40, 0.14, 65),
    yellow: oklch(0.48, 0.15, 68),

    // Lagoon water — deep tropical teal
    darkBlue: oklch(0.45, 0.10, 200),
    blue: oklch(0.54, 0.11, 195),

    // Exotic orchid — magenta bloom
    darkMagenta: oklch(0.52, 0.16, 330),
    magenta: oklch(0.58, 0.17, 325),

    // Seafoam — shallow lagoon
    darkCyan: oklch(0.42, 0.10, 175),
    cyan: oklch(0.52, 0.11, 170),
});

const accents: ThemeAccentColors = {
    a10: palette.darkYellow,
    a20: palette.darkGreen,
};

const feedback = createFeedback(palette);
feedback.warning = palette.darkYellow; // amber for contrast on cream bg
const options = { primaries, palette, feedback, accents };

const ui = createUi(options);
const syntax = createSyntax(options);

const theme: ThemeDefinition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
