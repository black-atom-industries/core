import type {
    ThemeAccentColors,
    ThemeDefinition,
    ThemeFeedbackColors,
    ThemePrimaryColors,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette-light.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-mnml-plastik-light"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.060, 0.075, 150.0),
    d20: oklch(0.120, 0.075, 150.0),
    d30: oklch(0.180, 0.075, 150.0),
    d40: oklch(0.240, 0.075, 150.0),

    m10: oklch(0.360, 0.025, 150.0),
    m20: oklch(0.420, 0.025, 150.0),
    m30: oklch(0.500, 0.025, 150.0),
    m40: oklch(0.580, 0.025, 150.0),

    l10: oklch(0.925, 0.000, 150.0),
    l20: oklch(0.950, 0.000, 150.0),
    l30: oklch(0.985, 0.000, 150.0),
    l40: oklch(1.000, 0.000, 150.0),
};

const palette = createPalette(primaries, {
    override: (palette) => ({
        ...palette,
        darkRed: oklch(0.75, 0.165, 305.0),
        red: oklch(0.75, 0.25, 365.0),

        darkGreen: oklch(0.65, 0.20, 145),
        green: oklch(0.70, 0.20, 145.0),

        darkYellow: oklch(0.75, 0.215, 65), // #f59400
        yellow: oklch(0.75, 0.215, 150), // #07E676

        darkBlue: oklch(0.65, 0.20, 285),
        blue: oklch(0.65, 0.20, 265),
        //
        // darkCyan: oklch(0.65, 0.20, 165),
        // cyan: oklch(0.75, 0.20, 165),
    }),
});

const accents: ThemeAccentColors = {
    a10: palette.yellow,
    a20: palette.darkYellow,
    a30: palette.blue,
    a40: palette.darkBlue,
};

const feedback: ThemeFeedbackColors = {
    negative: palette.darkRed,
    success: palette.darkGreen,
    info: palette.darkBlue,
    warning: palette.darkYellow,
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
