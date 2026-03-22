import type { ThemeAccentColors, ThemeDefinition, ThemePrimaryColors } from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createFeedback from "./create-feedback-dark.ts";
import createPalette from "./create-palette-dark.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta = themeKeyMetaMap["black-atom-jpn-murasaki-yoru"];

const primaries: ThemePrimaryColors = {
    d10: oklch(0.20, 0.042, 0),
    d20: oklch(0.26, 0.042, 0.0),
    d30: oklch(0.32, 0.042, 0),
    d40: oklch(0.40, 0.042, 0),

    m10: oklch(0.453, 0.072, 330.42),
    m20: oklch(0.498, 0.081, 330.78),
    m30: oklch(0.541, 0.078, 324.95),
    m40: oklch(0.581, 0.084, 325.1),

    l10: oklch(0.714, 0.061, 325.27),
    l20: oklch(0.789, 0.045, 323.6),
    l30: oklch(0.829, 0.039, 323.23),
    l40: oklch(0.906, 0.023, 323.62),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.70, 0.15, 28.4),
    red: oklch(0.75, 0.15, 25.7),

    darkGreen: oklch(0.7, 0.075, 163.39),
    green: oklch(0.75, 0.075, 165.36),

    darkYellow: oklch(0.75, 0.135, 64.87),
    yellow: oklch(0.75, 0.135, 78.01),

    darkBlue: oklch(0.70, 0.050, 226.16),
    blue: oklch(0.75, 0.050, 222.11),

    darkMagenta: oklch(0.75, 0.075, 305.64),
    magenta: oklch(0.75, 0.075, 352.46),

    darkCyan: oklch(0.70, 0.075, 194.47),
    cyan: oklch(0.75, 0.075, 194.49),
});

const accents: ThemeAccentColors = {
    a10: palette.yellow,
    a20: palette.darkYellow,
};

const feedback = createFeedback(palette);
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
