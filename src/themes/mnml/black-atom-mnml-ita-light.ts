import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-ita-light",
    label: "Black Atom — MNM ∷ ITA Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.14, 0.005, 67.50),
    d20: oklch(0.20, 0.005, 67.50),
    d30: oklch(0.28, 0.005, 67.50),
    d40: oklch(0.36, 0.005, 67.50),

    m10: oklch(0.64, 0.005, 67.50),
    m20: oklch(0.70, 0.005, 67.50),
    m30: oklch(0.76, 0.005, 67.50),
    m40: oklch(0.82, 0.005, 67.50),

    l10: oklch(0.90, 0.005, 67.50),
    l20: oklch(0.95, 0.005, 67.50),
    l30: oklch(0.99, 0.005, 67.50),
    l40: oklch(1.0, 0.005, 67.50),
};

const accents: Theme.Accents = {
    a10: oklch(0.6049, 0.175, 146.26),
    a20: oklch(0.6216, 0.2211, 25.0),
};

const palette = createPalette(primaries);

const feedback: Theme.Feedback = {
    negative: accents.a20,
    success: accents.a10,
    info: oklch(0.55, 0.126, 241.57),
    warning: oklch(0.55, 0.1481, 59.7),
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
