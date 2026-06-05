import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-terra-summer-night"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.16, 0.03, 160),
    d20: oklch(0.20, 0.03, 155),
    d30: oklch(0.24, 0.03, 150),
    d40: oklch(0.36, 0.03, 145),

    m10: oklch(0.40, 0.05, 140),
    m20: oklch(0.50, 0.05, 130),
    m30: oklch(0.60, 0.05, 120),
    m40: oklch(0.70, 0.05, 110),

    l10: oklch(0.75, 0.05, 90),
    l20: oklch(0.80, 0.05, 85),
    l30: oklch(0.85, 0.05, 80),
    l40: oklch(0.92, 0.05, 75),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.70, 0.075, 10),
    red: oklch(0.70, 0.075, 40),

    darkGreen: oklch(0.60, 0.1, 130),
    green: oklch(0.70, 0.1, 120),

    darkYellow: oklch(0.75, 0.085, 60),
    yellow: oklch(0.75, 0.085, 100),

    darkBlue: oklch(0.60, 0.075, 150),
    blue: oklch(0.70, 0.075, 150),

    darkMagenta: oklch(0.6, 0.05, 330),
    magenta: oklch(0.7, 0.05, 360),

    darkCyan: oklch(0.60, 0.075, 175),
    cyan: oklch(0.70, 0.075, 170),
});

const accents: ThemeAccentColors = {
    a10: palette.yellow,
    a20: palette.darkYellow,
};

const feedback = createFeedback(palette);
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
