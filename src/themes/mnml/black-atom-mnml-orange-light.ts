import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-orange-light",
    label: "Black Atom — MNM ∷ Orange Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.20, 0.01, 220),
    d20: oklch(0.28, 0.01, 220),
    d30: oklch(0.36, 0.01, 220),
    d40: oklch(0.42, 0.01, 220),

    m10: oklch(0.48, 0.01, 220),
    m20: oklch(0.58, 0.01, 220),
    m30: oklch(0.64, 0.01, 220),
    m40: oklch(0.72, 0.01, 220),

    l10: oklch(0.82, 0.01, 220),
    l20: oklch(0.86, 0.01, 220),
    l30: oklch(0.90, 0.01, 220),
    l40: oklch(0.94, 0.01, 220),
};

const accents: Theme.MnmlAccents = {
    a10: oklch(0.70, 0.185, 60.0),
    a20: oklch(0.66, 0.185, 50.0),
    a30: oklch(0.62, 0.185, 40.0),
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: oklch(0.65, 0.15, 250),
    warning: accents.a10,
    negative: accents.a20,
    success: oklch(0.65, 0.15, 150),
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: {
        ...syntax(primaries, feedback, accents),
        keyword: {
            default: accents.a20,
            import: accents.a30 ?? accents.a20,
            export: accents.a30 ?? accents.a20,
        },
    },
};

export default theme;
