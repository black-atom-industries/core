import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-light.ts";
import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-paper-brown-light"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.18, 0.004, 89),
    d20: oklch(0.24, 0.006, 89),
    d30: oklch(0.32, 0.012, 89),
    d40: oklch(0.40, 0.018, 89),

    m10: oklch(0.55, 0.024, 89),
    m20: oklch(0.62, 0.028, 89),
    m30: oklch(0.70, 0.030, 89),
    m40: oklch(0.78, 0.032, 89),

    l10: oklch(0.86, 0.032, 89),
    l20: oklch(0.89, 0.032, 89),
    l30: oklch(0.92, 0.032, 89),
    l40: oklch(0.96, 0.028, 89),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.26, 0, 0),
    a20: oklch(0.42, 0.008, 89),
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
