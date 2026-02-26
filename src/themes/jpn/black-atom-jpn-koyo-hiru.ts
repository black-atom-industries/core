import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-light.ts";
import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-jpn-koyo-hiru"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.258, 0.021, 326.17),
    d20: oklch(0.319, 0.027, 326.18),
    d30: oklch(0.367, 0.043, 326.41),
    d40: oklch(0.432, 0.049, 326.39),

    m10: oklch(0.50, 0.052, 326.32),
    m20: oklch(0.60, 0.057, 326.28),
    m30: oklch(0.70, 0.056, 326.17),
    m40: oklch(0.80, 0.041, 325.98),

    l10: oklch(0.875, 0.050, 75),
    l20: oklch(0.925, 0.035, 75),
    l30: oklch(0.955, 0.025, 75),
    l40: oklch(0.965, 0.025, 75),
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
