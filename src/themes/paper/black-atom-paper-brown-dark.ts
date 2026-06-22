import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-paper-brown-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.22, 0.028, 63),
    d20: oklch(0.28, 0.030, 65),
    d30: oklch(0.34, 0.030, 65),
    d40: oklch(0.40, 0.030, 66),

    m10: oklch(0.50, 0.028, 68),
    m20: oklch(0.58, 0.024, 72),
    m30: oklch(0.66, 0.020, 74),
    m40: oklch(0.74, 0.018, 76),

    l10: oklch(0.82, 0.016, 78),
    l20: oklch(0.85, 0.018, 78),
    l30: oklch(0.87, 0.020, 78),
    l40: oklch(0.91, 0.022, 80),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.90, 0.020, 80),
    a20: oklch(0.76, 0.018, 75),
};

const palette = createPalette(primaries);

const feedback: ThemeFeedbackColors = createFeedback(accents);
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
