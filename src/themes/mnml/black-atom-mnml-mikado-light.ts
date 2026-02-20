import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mikado-light",
    label: "Black Atom — MNM ∷ Mikado Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.216, 0.018, 237.84),
    d20: oklch(0.238, 0.033, 239.41),
    d30: oklch(0.28, 0.026, 235.29),
    d40: oklch(0.36, 0.031, 234.14),

    m10: oklch(0.468, 0.026, 233.93),
    m20: oklch(0.51, 0.029, 237.33),
    m30: oklch(0.554, 0.032, 235.33),
    m40: oklch(0.643, 0.031, 231.75),

    l10: oklch(0.775, 0.021, 224.38),
    l20: oklch(0.807, 0.019, 223.65),
    l30: oklch(0.847, 0.015, 224.53),
    l40: oklch(0.886, 0.011, 226),
};

const accents: Theme.Accents = {
    a10: "#cc8f00",
    a20: "#457ea1",
};

const palette = createPalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        blue: accents.a10,
        darkBlue: accents.a10,
    }),
});

const feedback: Theme.Feedback = {
    info: accents.a20,
    warning: "#f7bd08",
    negative: "#e64433",
    success: "#2fd073",
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
