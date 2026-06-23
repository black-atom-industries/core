import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "../mnml/create-feedback-light.ts";
import createPalette from "../mnml/create-palette-light.ts";
import createSyntax from "../mnml/create-syntax-light.ts";
import createUi from "../mnml/create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-paper-blue-light"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.24, 0.10, 250),
    d20: oklch(0.28, 0.14, 250),
    d30: oklch(0.34, 0.13, 250),
    d40: oklch(0.42, 0.12, 250),

    m10: oklch(0.50, 0.10, 250),
    m20: oklch(0.58, 0.10, 250),
    m30: oklch(0.62, 0.10, 250),
    m40: oklch(0.68, 0.10, 250),

    l10: oklch(0.84, 0.012, 250),
    l20: oklch(0.90, 0.008, 250),
    l30: oklch(0.96, 0.006, 250),
    l40: oklch(0.99, 0.004, 250),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.28, 0.14, 250),
    a20: oklch(0.42, 0.12, 250),
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
