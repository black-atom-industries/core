import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
    ThemeSyntaxColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-mnml-mikado-dark"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.300, 0.055, 250),
    d20: oklch(0.325, 0.055, 250),
    d30: oklch(0.350, 0.055, 250),
    d40: oklch(0.375, 0.055, 250),

    m10: oklch(0.550, 0.075, 250),
    m20: oklch(0.600, 0.075, 250),
    m30: oklch(0.650, 0.075, 250),
    m40: oklch(0.750, 0.075, 250),

    l10: oklch(0.835, 0.015, 250),
    l20: oklch(0.885, 0.015, 250),
    l30: oklch(0.935, 0.015, 250),
    l40: oklch(0.985, 0.005, 250),
};

const accents: ThemeAccentColors = {
    a10: oklch(0.80, 0.150, 72.00),
    a20: oklch(0.75, 0.125, 255.0),
    a30: oklch(0.70, 0.175, 30.00),
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a10,
        blue: accents.a20,
        darkBlue: accents.a20,
    }),
});

const feedback: ThemeFeedbackColors = {
    info: accents.a20,
    warning: accents.a10,
    negative: accents.a30 ?? "#DB504A",
    success: "#4EBA65",
};

const ui = createUi(primaries, feedback, accents);
const syntax: ThemeSyntaxColors = {
    ...createSyntax(primaries, feedback, accents),
    keyword: {
        default: accents.a30 ?? accents.a20,
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
