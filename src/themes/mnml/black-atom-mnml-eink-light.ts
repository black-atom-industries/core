import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-eink-light",
    label: "Black Atom — MNM ∷ E-Ink Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.20, 0, 0),
    d20: oklch(0.28, 0, 0),
    d30: oklch(0.36, 0, 0),
    d40: oklch(0.42, 0, 0),

    m10: oklch(0.48, 0, 0),
    m20: oklch(0.58, 0, 0),
    m30: oklch(0.64, 0, 0),
    m40: oklch(0.72, 0, 0),

    l10: oklch(0.82, 0, 0),
    l20: oklch(0.86, 0, 0),
    l30: oklch(0.90, 0, 0),
    l40: oklch(0.94, 0, 0),
};

const accents: Theme.MnmlAccents = {
    a10: oklch(0.45, 0.02, 0),
    a20: oklch(0.55, 0.01, 0),
};

const palette = basePalette(primaries);

const feedback: Theme.MnmlFeedback = {
    negative: oklch(0.65, 0.20, 25),
    success: oklch(0.65, 0.20, 120),
    info: oklch(0.65, 0.20, 225),
    warning: oklch(0.65, 0.20, 80),
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
