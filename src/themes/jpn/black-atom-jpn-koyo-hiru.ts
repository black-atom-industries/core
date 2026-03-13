import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-light.ts";
import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-jpn-koyo-hiru"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.26, 0.021, 325),
    d20: oklch(0.32, 0.027, 325),
    d30: oklch(0.38, 0.043, 325),
    d40: oklch(0.45, 0.049, 325),

    m10: oklch(0.50, 0.050, 325),
    m20: oklch(0.60, 0.050, 325),
    m30: oklch(0.70, 0.050, 75),
    m40: oklch(0.80, 0.050, 75),

    l10: oklch(0.900, 0.050, 75),
    l20: oklch(0.935, 0.035, 75),
    l30: oklch(0.965, 0.025, 75),
    l40: oklch(0.975, 0.025, 75),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.55, 0.15, 10),
    red: oklch(0.6383, 0.225, 15.0),

    darkGreen: oklch(0.55, 0.15, 150),
    green: oklch(0.65, 0.15, 150),

    darkYellow: oklch(0.70, 0.175, 50),
    yellow: oklch(0.75, 0.175, 75),

    darkBlue: oklch(0.65, 0.15, 350),
    blue: oklch(0.65, 0.15, 300),

    darkMagenta: oklch(0.75, 0.15, 60),
    magenta: oklch(0.75, 0.15, 50),

    darkCyan: oklch(0.55, 0.15, 180),
    cyan: oklch(0.65, 0.15, 180),
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
