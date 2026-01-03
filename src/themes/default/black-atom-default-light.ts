import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import feedback from "./feedback_light.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-default-light",
    label: "Black Atom — Light",
    appearance: "light",
    status: "release",
    collection: {
        key: "default",
        label: "Default",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.18, 0.003, 195),
    d20: oklch(0.24, 0.003, 195),
    d30: oklch(0.28, 0.003, 195),
    d40: oklch(0.32, 0.003, 195),

    m10: oklch(0.48, 0.003, 195),
    m20: oklch(0.56, 0.003, 195),
    m30: oklch(0.64, 0.003, 195),
    m40: oklch(0.72, 0.003, 195),

    l10: oklch(0.88, 0.003, 195),
    l20: oklch(0.92, 0.003, 195),
    l30: oklch(0.95, 0.003, 195),
    l40: oklch(0.98, 0.003, 195),
};

const accents: Theme.Accents = {
    a10: oklch(0.58, 0.20, 170),
    a20: oklch(0.48, 0.20, 155),
    a30: oklch(0.58, 0.20, 290),
    a40: oklch(0.48, 0.20, 275),
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
