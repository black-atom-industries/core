import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
    ThemeSyntaxColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";
import createFeedback from "./create-feedback-dark.ts";

const meta = themeKeyMetaMap["black-atom-mnml-orange-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.08, 0.01, 220),
    d20: oklch(0.12, 0.01, 220),
    d30: oklch(0.16, 0.01, 220),
    d40: oklch(0.20, 0.01, 220),

    m10: oklch(0.48, 0.01, 220),
    m20: oklch(0.58, 0.01, 220),
    m30: oklch(0.64, 0.01, 220),
    m40: oklch(0.72, 0.01, 220),

    l10: oklch(0.94, 0.01, 220),
    l20: oklch(0.96, 0.01, 220),
    l30: oklch(0.98, 0.01, 220),
    l40: oklch(1.00, 0.01, 220),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.7506, 0.175, 60.0),
    a20: oklch(0.6642, 0.18, 250.0),
    a30: oklch(0.74, 0.185, 40.0),
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a20,
    }),
});

const feedback: ThemeFeedbackColors = createFeedback(accents);

const options = { primaries, palette, feedback, accents };
const ui = createUi(options);
const syntax: ThemeSyntaxColors = {
    ...createSyntax(options),
    keyword: {
        default: accents.a20,
        import: accents.a30 ?? accents.a20,
        export: accents.a30 ?? accents.a20,
    },
};

const theme: ThemeDefinition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
