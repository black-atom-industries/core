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
    d10: oklch(0.273, 0.008, 223.74),
    d20: oklch(0.32, 0.012, 232.8),
    d30: oklch(0.369, 0.013, 229.24),
    d40: oklch(0.407, 0.017, 258.37),

    m10: oklch(0.467, 0.017, 231.54),
    m20: oklch(0.501, 0.022, 258.37),
    m30: oklch(0.556, 0.022, 231),
    m40: oklch(0.644, 0.021, 230.89),

    l10: oklch(0.852, 0.026, 229.18),
    l20: oklch(0.886, 0.02, 230.72),
    l30: oklch(0.926, 0.016, 226.98),
    l40: oklch(0.965, 0.01, 228.89),
};

const accents: Theme.MnmlAccents = {
    a10: "#FF6513",
    a20: "#ff4700",
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
