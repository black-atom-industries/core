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
    d10: oklch(0.219, 0.007, 78.18),
    d20: oklch(0.244, 0.014, 87.57),
    d30: oklch(0.289, 0.016, 91.78),
    d40: oklch(0.375, 0.023, 93.98),

    m10: oklch(0.527, 0.034, 139.11),
    m20: oklch(0.573, 0.039, 138.6),
    m30: oklch(0.617, 0.045, 138.5),
    m40: oklch(0.697, 0.034, 139.43),

    l10: oklch(0.84, 0.075, 139.06),
    l20: oklch(0.871, 0.061, 139.91),
    l30: oklch(0.903, 0.045, 140.09),
    l40: oklch(0.936, 0.03, 139.1),
};

const accents: Theme.MnmlAccents = {
    a10: "#02b193",
    a20: "#ff8b4d",
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
    info: "#805E73",
    warning: "#EDE5A6",
    negative: "#f77b63",
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
