import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mono-light",
    label: "Black Atom — MNM ∷ Mono Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0, 0, 0),
    d20: oklch(0.26, 0, 0),
    d30: oklch(0.321, 0, 0),
    d40: oklch(0.371, 0, 0),

    m10: oklch(0.468, 0, 0),
    m20: oklch(0.51, 0, 0),
    m30: oklch(0.556, 0, 0),
    m40: oklch(0.64, 0, 0),

    l10: oklch(0.808, 0, 0),
    l20: oklch(0.845, 0, 0),
    l30: oklch(0.91, 0, 0),
    l40: oklch(0.964, 0, 0),
};

const accents: Theme.MnmlAccents = {
    a10: primaries.d10,
    a20: primaries.d30,
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        white: accents.a10,
        lightGray: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: "#3498db",
    warning: "#eab308",
    negative: "#e74c3c",
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
