import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";
import createFeedback from "./create-feedback-dark.ts";

const meta = themeKeyMetaMap["black-atom-mnml-mono-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.12, 0.005, 67.50),
    d20: oklch(0.16, 0.005, 67.50),
    d30: oklch(0.22, 0.005, 67.50),
    d40: oklch(0.28, 0.005, 67.50),

    m10: oklch(0.40, 0.005, 67.50),
    m20: oklch(0.50, 0.005, 67.50),
    m30: oklch(0.60, 0.005, 67.50),
    m40: oklch(0.70, 0.005, 67.50),

    l10: oklch(0.82, 0.005, 67.50),
    l20: oklch(0.88, 0.005, 67.50),
    l30: oklch(0.94, 0.005, 67.50),
    l40: oklch(0.98, 0.005, 67.50),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.92, 0, 0),
    a20: oklch(0.78, 0, 0),
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
