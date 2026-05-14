import type {
    ThemeAccentColorsNext,
    ThemeFeedbackColorsNext,
    ThemeGitColorsNext,
    ThemePrimaryColorsNext,
} from "../../types/theme-next.ts";
import { colordx } from "@colordx";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { createThemeDefinition } from "../../lib/create-theme-definition.ts";

import createPaletteNext from "./create-palette-light-next.ts";
import createSyntaxNext from "./create-syntax-light-next.ts";
import createUiNext from "./create-ui-light-next.ts";

const meta = themeKeyMetaMap["black-atom-terra-fall-day"];

const primaries: ThemePrimaryColorsNext = {
    d10: colordx("oklch(0.202 0.05 47.49)"),
    d20: colordx("oklch(0.301 0.049 48.35)"),
    d30: colordx("oklch(0.348 0.05 49.42)"),
    d40: colordx("oklch(0.438 0.05 49.73)"),

    m10: colordx("oklch(0.483 0.075 48.75)"),
    m20: colordx("oklch(0.569 0.074 49.6)"),
    m30: colordx("oklch(0.655 0.075 48.42)"),
    m40: colordx("oklch(0.742 0.075 49.01)"),

    l10: colordx("oklch(0.829 0.055 58.77)"),
    l20: colordx("oklch(0.872 0.048 58.95)"),
    l30: colordx("oklch(0.914 0.042 61.44)"),
    l40: colordx("oklch(0.94 0.038 61)"),
};

const palette = createPaletteNext(primaries, {
    darkRed: colordx("oklch(0.482 0.151 29.67)"),
    red: colordx("oklch(0.568 0.15 29.52)"),

    darkGreen: colordx("oklch(0.482 0.06 128.52)"),
    green: colordx("oklch(0.569 0.061 127.36)"),

    darkYellow: colordx("oklch(0.656 0.16 34.94)"),
    yellow: colordx("oklch(0.656 0.16 54.87)"),

    darkBlue: colordx("oklch(0.481 0.05 51.31)"),
    blue: colordx("oklch(0.57 0.061 49.91)"),

    darkMagenta: colordx("oklch(0.482 0.084 41.63)"),
    magenta: colordx("oklch(0.57 0.085 40.86)"),

    darkCyan: colordx("oklch(0.481 0.06 175.39)"),
    cyan: colordx("oklch(0.569 0.06 175)"),
});

const accents: ThemeAccentColorsNext = {
    a10: palette.yellow,
    a20: palette.darkYellow,
};

const feedback: ThemeFeedbackColorsNext = {
    negative: colordx("oklch(0.482 0.151 29.67)"),
    success: colordx("oklch(0.569 0.061 127.36)"),
    info: colordx("oklch(0.569 0.06 175)"),
    warning: colordx("oklch(0.656 0.16 54.87)"),
};

const Git: ThemeGitColorsNext = {
    add: colordx("oklch(0.482 0.151 29.67)"),
    delete: colordx("oklch(0.569 0.061 127.36)"),
    modify: colordx("oklch(0.569 0.06 175)"),
};

const ui = createUiNext({
    primaries: primaries,
    feedback: feedback,
    git: Git,
    accents: accents,
});

const syntax = createSyntaxNext({
    accents,
    palette,
    feedback,
    primaries,
});

const theme = createThemeDefinition({
    meta,
    colors: {
        primaries,
        palette,
        ui,
        syntax,
    },
}, (ctx) => ctx.node.toHex());

export default theme;
