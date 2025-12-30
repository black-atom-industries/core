import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import feedback from "./feedback_dark.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-default-dark-dimmed",
    label: "Black Atom — Dark Dimmed",
    appearance: "dark",
    status: "release",
    collection: {
        key: "default",
        label: "Default",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.16, 0.003, 195),
    d20: oklch(0.20, 0.003, 195),
    d30: oklch(0.32, 0.003, 195),
    d40: oklch(0.38, 0.003, 195),

    m10: oklch(0.45, 0.005, 195),
    m20: oklch(0.52, 0.005, 195),
    m30: oklch(0.60, 0.005, 195),
    m40: oklch(0.70, 0.005, 195),

    l10: oklch(0.80, 0.005, 195),
    l20: oklch(0.86, 0.005, 195),
    l30: oklch(0.92, 0.005, 195),
    l40: oklch(0.96, 0.005, 195),
};

const accents: Theme.Accents = {
    a10: oklch(0.75, 0.1, 170),
    a20: oklch(0.65, 0.1, 155),
    a30: oklch(0.75, 0.1, 290),
    a40: oklch(0.65, 0.1, 275),
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        cyan: accents.a10,
        darkCyan: accents.a10,
        magenta: accents.a20,
        darkMagenta: accents.a20,
    }),
});

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
