import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-clay-light",
    label: "Black Atom — MNM ∷ Clay Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.25, 0.020, 90),
    d20: oklch(0.30, 0.020, 90),
    d30: oklch(0.35, 0.020, 90),
    d40: oklch(0.40, 0.020, 90),

    m10: oklch(0.45, 0.035, 90),
    m20: oklch(0.50, 0.035, 90),
    m30: oklch(0.55, 0.035, 90),
    m40: oklch(0.60, 0.035, 90),

    l10: oklch(0.85, 0.020, 95),
    l20: oklch(0.90, 0.020, 95),
    l30: oklch(0.95, 0.020, 95),
    l40: oklch(0.98, 0.020, 95),
};

const accents: Theme.Accents = {
    a10: oklch(0.67, 0.165, 40),
    a20: oklch(0.55, 0.050, 95),
};

const palette = basePalette(primaries);

const feedback: Theme.Feedback = {
    info: oklch(0.70, 0.10, 235),
    warning: oklch(0.70, 0.10, 75),
    negative: accents.a10,
    success: oklch(0.70, 0.10, 130),
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
