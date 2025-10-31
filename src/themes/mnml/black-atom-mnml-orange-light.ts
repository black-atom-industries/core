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
    d10: oklch(0.32, 0.03, 235),
    d20: oklch(0.36, 0.03, 235),
    d30: oklch(0.40, 0.03, 235),
    d40: oklch(0.44, 0.03, 235),

    m10: oklch(0.50, 0.05, 235),
    m20: oklch(0.55, 0.05, 235),
    m30: oklch(0.60, 0.05, 235),
    m40: oklch(0.65, 0.05, 235),

    l10: oklch(0.82, 0.0275, 235),
    l20: oklch(0.86, 0.0275, 235),
    l30: oklch(0.90, 0.0275, 235),
    l40: oklch(0.94, 0.0275, 235),
};

const accents: Theme.MnmlAccents = {
    a10: oklch(0.75, 0.185, 60.0),
    a20: oklch(0.70, 0.185, 50.0),
    a30: oklch(0.67, 0.185, 40.0),
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
