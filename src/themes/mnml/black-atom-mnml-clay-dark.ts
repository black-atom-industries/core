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

const meta = themeKeyMetaMap["black-atom-mnml-clay-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.25, 0.010, 90),
    d20: oklch(0.30, 0.010, 90),
    d30: oklch(0.35, 0.010, 90),
    d40: oklch(0.40, 0.010, 90),

    m10: oklch(0.55, 0.025, 90),
    m20: oklch(0.60, 0.025, 90),
    m30: oklch(0.70, 0.025, 90),
    m40: oklch(0.75, 0.025, 90),

    l10: oklch(0.80, 0.025, 95),
    l20: oklch(0.85, 0.025, 95),
    l30: oklch(0.90, 0.025, 95),
    l40: oklch(0.95, 0.025, 95),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.75, 0.150, 40),
    a20: oklch(0.75, 0.050, 95),
};

const palette = createPalette(primaries);

const feedback: ThemeFeedbackColors = {
    info: oklch(0.75, 0.10, 235),
    warning: oklch(0.75, 0.10, 75),
    negative: accents.a10,
    success: oklch(0.75, 0.10, 130),
};

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
