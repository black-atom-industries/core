import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";
import createFeedback from "./create-feedback-light.ts";

const meta = themeKeyMetaMap["black-atom-mnml-ita-light"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.14, 0.005, 67.50),
    d20: oklch(0.20, 0.005, 67.50),
    d30: oklch(0.28, 0.005, 67.50),
    d40: oklch(0.36, 0.005, 67.50),

    m10: oklch(0.64, 0.005, 67.50),
    m20: oklch(0.70, 0.005, 67.50),
    m30: oklch(0.76, 0.005, 67.50),
    m40: oklch(0.82, 0.005, 67.50),

    l10: oklch(0.90, 0.005, 67.50),
    l20: oklch(0.95, 0.005, 67.50),
    l30: oklch(0.99, 0.005, 67.50),
    l40: oklch(1.0, 0.005, 67.50),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.6049, 0.175, 146.26),
    a20: oklch(0.6216, 0.2211, 25.0),
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
