import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-47-dark",
    label: "Black Atom — MNM ∷ 47 Dark",
    appearance: "dark",
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

    l10: oklch(0.86, 0.050, 75.0),
    l20: oklch(0.90, 0.050, 75.0),
    l30: oklch(0.94, 0.050, 75.0),
    l40: oklch(0.96, 0.030, 75.0),
};

const accents: Theme.MnmlAccents = {
    a10: oklch(0.75, 0.125, 175.0),
    a20: oklch(0.75, 0.160, 54.00),
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        green: accents.a10,
        darkGreen: accents.a10,
        yellow: accents.a20,
        darkYellow: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: oklch(0.75, 0.05, 275),
    warning: oklch(0.75, 0.15, 95),
    negative: oklch(0.75, 0.15, 35),
    success: accents.a10,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
