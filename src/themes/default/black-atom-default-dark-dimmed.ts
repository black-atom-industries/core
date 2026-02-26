import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";
import feedback from "./feedback-dark.ts";

const meta = themeKeyMetaMap["black-atom-default-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.22, 0.010, 195),
    d20: oklch(0.26, 0.010, 195),
    d30: oklch(0.30, 0.010, 195),
    d40: oklch(0.34, 0.010, 195),

    m10: oklch(0.45, 0.025, 240),
    m20: oklch(0.52, 0.025, 240),
    m30: oklch(0.60, 0.025, 240),
    m40: oklch(0.70, 0.025, 240),

    l10: oklch(0.76, 0.025, 240),
    l20: oklch(0.82, 0.025, 240),
    l30: oklch(0.88, 0.025, 240),
    l40: oklch(0.92, 0.025, 240),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.85, 0.085, 142),
    a20: oklch(0.75, 0.085, 142),
    a30: oklch(0.85, 0.085, 290),
    a40: oklch(0.75, 0.085, 290),
};

const theme: ThemeDefinition = {
    meta,
    primaries,
    palette: createPalette(primaries, {
        override: (palette) => ({
            ...palette,
            cyan: accents.a10,
            darkCyan: accents.a10,
            magenta: accents.a20,
            darkMagenta: accents.a20,
        }),
    }),
    ui: createUi(primaries, feedback, accents),
    syntax: createSyntax(primaries, feedback, accents),
};

export default theme;
