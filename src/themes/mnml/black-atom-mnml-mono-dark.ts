import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

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

const feedback: ThemeFeedbackColors = {
    negative: oklch(0.65, 0.18, 20),
    success: oklch(0.72, 0.14, 142),
    info: oklch(0.70, 0.12, 225),
    warning: oklch(0.74, 0.14, 80),
};

const ui = createUi(primaries, feedback, accents);
const syntax = createSyntax(primaries, feedback, accents);

const theme: ThemeDefinition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
