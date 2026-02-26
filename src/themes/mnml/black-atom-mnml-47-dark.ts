import type {
    ThemeAccents,
    ThemeDefinition,
    ThemeFeedback,
    ThemePrimaries,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-mnml-47-dark"];

const primaries: ThemePrimaries = {
    d10: oklch(0.20, 0.010, 125),
    d20: oklch(0.25, 0.015, 125),
    d30: oklch(0.35, 0.025, 125),
    d40: oklch(0.40, 0.035, 125),

    m10: oklch(0.50, 0.045, 125),
    m20: oklch(0.55, 0.045, 125),
    m30: oklch(0.60, 0.045, 125),
    m40: oklch(0.70, 0.045, 125),

    l10: oklch(0.86, 0.050, 75.0),
    l20: oklch(0.90, 0.050, 75.0),
    l30: oklch(0.94, 0.050, 75.0),
    l40: oklch(0.96, 0.030, 75.0),
};

const accents: ThemeAccents = {
    a10: oklch(0.75, 0.125, 175.0),
    a20: oklch(0.75, 0.160, 54.00),
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        green: accents.a10,
        darkGreen: accents.a10,
        yellow: accents.a20,
        darkYellow: accents.a20,
    }),
});

const feedback: ThemeFeedback = {
    info: oklch(0.75, 0.05, 275),
    warning: oklch(0.75, 0.15, 95),
    negative: oklch(0.75, 0.15, 35),
    success: accents.a10,
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
