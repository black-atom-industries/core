import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-light.ts";
import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-default-light-dimmed"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.20, 0.016, 167),
    d20: oklch(0.26, 0.016, 167),
    d30: oklch(0.32, 0.016, 167),
    d40: oklch(0.38, 0.016, 167),

    m10: oklch(0.48, 0.016, 167),
    m20: oklch(0.54, 0.016, 167),
    m30: oklch(0.60, 0.016, 167),
    m40: oklch(0.66, 0.016, 167),

    l10: oklch(0.82, 0.016, 167),
    l20: oklch(0.86, 0.016, 167),
    l30: oklch(0.90, 0.016, 167),
    l40: oklch(0.94, 0.016, 167),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.67, 0.15, 175),
    a20: oklch(0.62, 0.15, 155),
    a30: oklch(0.67, 0.15, 285),
    a40: oklch(0.62, 0.15, 265),
};

const palette = createPalette(primaries, {
    override: (palette) => ({
        ...palette,
        cyan: accents.a10,
        darkCyan: accents.a20,
        magenta: accents.a30 ?? accents.a10,
        darkMagenta: accents.a40 ?? accents.a10,
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
