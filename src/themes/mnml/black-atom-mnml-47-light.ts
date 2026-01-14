import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-47-light",
    label: "Black Atom — MNM ∷ 47 Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.20, 0.010, 125),
    d20: oklch(0.25, 0.015, 125),
    d30: oklch(0.35, 0.025, 125),
    d40: oklch(0.40, 0.035, 125),

    m10: oklch(0.50, 0.045, 125),
    m20: oklch(0.55, 0.045, 125),
    m30: oklch(0.60, 0.045, 125),
    m40: oklch(0.70, 0.045, 125),

    l10: oklch(0.880, 0.020, 75),
    l20: oklch(0.900, 0.020, 75),
    l30: oklch(0.940, 0.020, 75),
    l40: oklch(0.980, 0.030, 75),
};

const accents: Theme.Accents = {
    a10: oklch(0.550, 0.200, 175.0),
    a20: oklch(0.650, 0.200, 45.00),
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

const feedback: Theme.Feedback = {
    info: oklch(0.65, 0.2, 275),
    warning: oklch(0.65, 0.2, 66.0),
    negative: oklch(0.65, 0.2, 35.0),
    success: accents.a10,
};

const ui = createUi(primaries, feedback, accents);
const syntax = createSyntax(primaries, feedback, accents);

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
