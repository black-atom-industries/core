import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

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
    d10: oklch(0.215, 0.006, 236.85),
    d20: oklch(0.236, 0.007, 229.18),
    d30: oklch(0.277, 0.009, 234.04),
    d40: oklch(0.358, 0.013, 229.27),

    m10: oklch(0.547, 0.024, 252.63),
    m20: oklch(0.603, 0.022, 229.29),
    m30: oklch(0.643, 0.022, 229.24),
    m40: oklch(0.725, 0.016, 235.48),

    l10: oklch(0.81, 0.023, 230.62),
    l20: oklch(0.846, 0.018, 229.04),
    l30: oklch(0.888, 0.014, 226.58),
    l40: oklch(0.925, 0.013, 228.93),
};

const accents: Theme.MnmlAccents = {
    a10: "#ff8e33",
    a20: "#ff6833",
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
    info: "#3498db",
    warning: accents.a10,
    negative: accents.a20,
    success: "#27ae60",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
