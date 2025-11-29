import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-eink-dark",
    label: "Black Atom — MNM ∷ E-Ink Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.26, 0, 0),
    d20: oklch(0.32, 0, 0),
    d30: oklch(0.36, 0, 0),
    d40: oklch(0.40, 0, 0),

    m10: oklch(0.46, 0, 0),
    m20: oklch(0.52, 0, 0),
    m30: oklch(0.56, 0, 0),
    m40: oklch(0.60, 0, 0),

    l10: oklch(0.65, 0, 0),
    l20: oklch(0.70, 0, 0),
    l30: oklch(0.76, 0, 0),
    l40: oklch(0.83, 0, 0),
};

const accents: Theme.MnmlAccents = {
    a10: oklch(0.76, 0.02, 0),
    a20: oklch(0.65, 0.01, 0),
};

const palette = basePalette(primaries);

const feedback: Theme.MnmlFeedback = {
    negative: oklch(0.68, 0.13, 20),
    success: oklch(0.76, 0.09, 120),
    info: oklch(0.74, 0.07, 180),
    warning: oklch(0.78, 0.09, 80),
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
