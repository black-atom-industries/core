import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-orange-dark",
    label: "Black Atom — MNM ∷ Orange Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.22, 0.01, 220),
    d20: oklch(0.28, 0.01, 220),
    d30: oklch(0.32, 0.01, 220),
    d40: oklch(0.36, 0.01, 220),

    m10: oklch(0.48, 0.01, 220),
    m20: oklch(0.58, 0.01, 220),
    m30: oklch(0.64, 0.01, 220),
    m40: oklch(0.72, 0.01, 220),

    l10: oklch(0.82, 0.01, 220),
    l20: oklch(0.86, 0.01, 220),
    l30: oklch(0.90, 0.01, 220),
    l40: oklch(0.94, 0.01, 220),
};

const accents: Theme.Accents = {
    a10: oklch(0.78, 0.175, 60.0),
    a20: oklch(0.76, 0.180, 50.0),
    a30: oklch(0.74, 0.185, 40.0),
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a20,
    }),
});

const feedback: Theme.Feedback = {
    info: oklch(0.65, 0.15, 250),
    warning: accents.a10,
    negative: accents.a30 ?? accents.a20,
    success: oklch(0.65, 0.15, 150),
};

const ui = createUi(primaries, feedback, accents);
const syntax: Theme.Syntax = {
    ...createSyntax(primaries, feedback, accents),
    keyword: {
        default: accents.a20,
        import: accents.a30 ?? accents.a20,
        export: accents.a30 ?? accents.a20,
    },
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
