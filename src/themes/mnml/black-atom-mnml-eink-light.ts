import type {
    ThemeAccents,
    ThemeDefinition,
    ThemeFeedback,
    ThemePrimaries,
} from "../../types/theme.ts";
import { themeKeyMetaMap } from "../../types/themes.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta = themeKeyMetaMap["black-atom-mnml-eink-light"];

const primaries: ThemePrimaries = {
    d10: oklch(0.20, 0, 0),
    d20: oklch(0.28, 0, 0),
    d30: oklch(0.36, 0, 0),
    d40: oklch(0.42, 0, 0),

    m10: oklch(0.48, 0, 0),
    m20: oklch(0.58, 0, 0),
    m30: oklch(0.64, 0, 0),
    m40: oklch(0.72, 0, 0),

    l10: oklch(0.82, 0, 0),
    l20: oklch(0.86, 0, 0),
    l30: oklch(0.90, 0, 0),
    l40: oklch(0.94, 0, 0),
};

const accents: ThemeAccents = {
    a10: oklch(0.45, 0.02, 0),
    a20: oklch(0.55, 0.01, 0),
};

const palette = createPalette(primaries);

const feedback: ThemeFeedback = {
    negative: oklch(0.65, 0.20, 25),
    success: oklch(0.65, 0.20, 120),
    info: oklch(0.65, 0.20, 225),
    warning: oklch(0.65, 0.20, 80),
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
