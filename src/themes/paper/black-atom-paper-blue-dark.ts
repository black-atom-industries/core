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

const meta = themeKeyMetaMap["black-atom-paper-blue-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.22, 0.09, 248),
    d20: oklch(0.28, 0.09, 245),
    d30: oklch(0.34, 0.08, 244),
    d40: oklch(0.40, 0.07, 243),

    m10: oklch(0.50, 0.06, 242),
    m20: oklch(0.58, 0.05, 240),
    m30: oklch(0.68, 0.04, 240),
    m40: oklch(0.78, 0.03, 240),

    l10: oklch(0.88, 0.012, 240),
    l20: oklch(0.92, 0.008, 240),
    l30: oklch(0.96, 0.006, 240),
    l40: oklch(0.99, 0.004, 240),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.97, 0.006, 240),
    a20: oklch(0.82, 0.03, 240),
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
