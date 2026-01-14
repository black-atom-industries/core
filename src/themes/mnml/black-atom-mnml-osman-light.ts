import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-osman-light",
    label: "Black Atom — MNM ∷ Osman Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.15, 0.008, 64),
    d20: oklch(0.32, 0.015, 64),
    d30: oklch(0.36, 0.015, 64),
    d40: oklch(0.40, 0.015, 64),

    m10: oklch(0.50, 0.020, 64),
    m20: oklch(0.55, 0.020, 64),
    m30: oklch(0.60, 0.020, 64),
    m40: oklch(0.65, 0.020, 64),

    l10: oklch(0.90, 0.012, 64),
    l20: oklch(0.94, 0.013, 64),
    l30: oklch(0.98, 0.013, 64),
    l40: oklch(0.99, 0.010, 64),
};

const accents: Theme.Accents = {
    a10: oklch(0.625, 0.200, 255),
    a20: oklch(0.625, 0.225, 28),
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        blue: accents.a10,
        darkBlue: accents.a10,
        red: accents.a20,
        darkRed: accents.a20,
    }),
});

const feedback: Theme.Feedback = {
    info: accents.a10,
    warning: oklch(0.8399, 0.1588, 86.81),
    negative: accents.a20,
    success: oklch(0.6479, 0.1626, 150.0),
};

const ui = createUi(primaries, feedback, accents);
const syntax: Theme.Syntax = {
    ...createSyntax(primaries, feedback, accents),
    keyword: {
        default: accents.a20,
        import: accents.a10,
        export: accents.a10,
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
