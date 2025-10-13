import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

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
    d10: oklch(0.275, 0.008, 75.24),
    d20: oklch(0.334, 0.021, 88.08),
    d30: oklch(0.386, 0.023, 93.96),
    d40: oklch(0.485, 0.031, 93.33),

    m10: oklch(0.479, 0.026, 159.44),
    m20: oklch(0.525, 0.03, 158.84),
    m30: oklch(0.57, 0.034, 158.4),
    m40: oklch(0.658, 0.033, 158.64),

    l10: oklch(0.825, 0.035, 75.92),
    l20: oklch(0.859, 0.029, 79.46),
    l30: oklch(0.919, 0.021, 79.09),
    l40: oklch(0.979, 0.016, 106.69),
};

const accents: Theme.MnmlAccents = {
    a10: "#016F5C",
    a20: "#FF6513",
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
    info: "#3b94b1",
    warning: "#b57520",
    negative: "#f44624",
    success: "#2aa889",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
