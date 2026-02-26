import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-jpn-koyo-yoru"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.20, 0.036, 315.74),
    d20: oklch(0.24, 0.034, 315.84),
    d30: oklch(0.32, 0.035, 316.52),
    d40: oklch(0.38, 0.036, 315.08),

    m10: oklch(0.45, 0.042, 300),
    m20: oklch(0.55, 0.046, 300),
    m30: oklch(0.60, 0.050, 75),
    m40: oklch(0.70, 0.050, 75),

    l10: oklch(0.800, 0.050, 75),
    l20: oklch(0.850, 0.050, 75),
    l30: oklch(0.875, 0.050, 75),
    l40: oklch(0.925, 0.050, 75),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.65, 0.15, 11.39),
    red: oklch(0.75, 0.15, 11.2),

    darkGreen: oklch(0.65, 0.1, 150),
    green: oklch(0.75, 0.1, 150),

    darkYellow: oklch(0.75, 0.15, 50),
    yellow: oklch(0.75, 0.15, 75),

    darkBlue: oklch(0.65, 0.075, 300),
    blue: oklch(0.75, 0.075, 300),

    darkMagenta: oklch(0.65, 0.1, 51),
    magenta: oklch(0.75, 0.1, 51),

    darkCyan: oklch(0.65, 0.1, 180),
    cyan: oklch(0.75, 0.1, 180),
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
