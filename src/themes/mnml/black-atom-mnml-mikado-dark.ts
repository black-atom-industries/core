import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mikado-dark",
    label: "Black Atom — MNM ∷ Mikado Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.221, 0.034, 238.67),
    d20: oklch(0.242, 0.039, 239.09),
    d30: oklch(0.28, 0.026, 235.29),
    d40: oklch(0.36, 0.031, 234.14),

    m10: oklch(0.513, 0.03, 235.88),
    m20: oklch(0.555, 0.032, 238.7),
    m30: oklch(0.597, 0.035, 236.77),
    m40: oklch(0.685, 0.027, 233.19),

    l10: oklch(0.775, 0.021, 224.38),
    l20: oklch(0.807, 0.019, 223.65),
    l30: oklch(0.847, 0.015, 224.53),
    l40: oklch(0.886, 0.011, 226),
};

const accents: Theme.MnmlAccents = {
    a10: "#ffb000",
    a20: "#5a89a6",
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a10,
        blue: accents.a20,
        darkBlue: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: accents.a20,
    warning: accents.a10,
    negative: "#DB504A",
    success: "#4EBA65",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
