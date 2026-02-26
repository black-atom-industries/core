import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-light.ts";
import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-default-light"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.22, 0.003, 240),
    d20: oklch(0.28, 0.003, 240),
    d30: oklch(0.32, 0.003, 240),
    d40: oklch(0.36, 0.003, 240),

    m10: oklch(0.50, 0.025, 240),
    m20: oklch(0.60, 0.015, 240),
    m30: oklch(0.70, 0.010, 240),
    m40: oklch(0.80, 0.005, 240),

    l10: oklch(0.875, 0.005, 240),
    l20: oklch(0.900, 0.005, 240),
    l30: oklch(0.950, 0.005, 240),
    l40: oklch(0.990, 0.005, 240),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.65, 0.125, 142),
    a20: oklch(0.55, 0.155, 142),
    a30: oklch(0.65, 0.125, 290),
    a40: oklch(0.55, 0.155, 290),
};

const palette = createPalette(primaries, {
    override: (palette) => ({
        ...palette,
        cyan: accents.a10,
        darkCyan: accents.a10,
        magenta: accents.a20,
        darkMagenta: accents.a20,
    }),
});

const feedback = createFeedback();
const options = { primaries, palette, feedback, accents };

const theme: ThemeDefinition = {
    meta,
    primaries,
    palette,
    ui: createUi(options),
    syntax: createSyntax(options),
};

export default theme;
