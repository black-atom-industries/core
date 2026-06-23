import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "../mnml/create-feedback-dark.ts";
import createPalette from "../mnml/create-palette-dark.ts";
import createSyntax from "../mnml/create-syntax-dark.ts";
import createUi from "../mnml/create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-paper-brown-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.18, 0.004, 75),
    d20: oklch(0.24, 0.006, 75),
    d30: oklch(0.32, 0.012, 75),
    d40: oklch(0.40, 0.018, 75),

    m10: oklch(0.50, 0.025, 75),
    m20: oklch(0.58, 0.025, 75),
    m30: oklch(0.66, 0.025, 75),
    m40: oklch(0.74, 0.025, 75),

    l10: oklch(0.82, 0.025, 75),
    l20: oklch(0.86, 0.025, 75),
    l30: oklch(0.90, 0.025, 75),
    l40: oklch(0.94, 0.025, 75),
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
