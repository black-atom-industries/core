import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mono-dark",
    label: "Black Atom — MNM ∷ Mono Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0, 0, 0),
    d20: oklch(0.218, 0, 0),
    d30: oklch(0.293, 0, 0),
    d40: oklch(0.371, 0, 0),

    m10: oklch(0.514, 0, 0),
    m20: oklch(0.556, 0, 0),
    m30: oklch(0.596, 0, 0),
    m40: oklch(0.683, 0, 0),

    l10: oklch(0.808, 0, 0),
    l20: oklch(0.845, 0, 0),
    l30: oklch(0.885, 0, 0),
    l40: oklch(0.925, 0, 0),
};

const accents: Theme.MnmlAccents = {
    a10: primaries.l40,
    a20: primaries.l30,
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
