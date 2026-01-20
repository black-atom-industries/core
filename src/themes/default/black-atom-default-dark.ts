import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";
import feedback from "./feedback-dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-default-dark",
    label: "Black Atom — Dark",
    appearance: "dark",
    status: "release",
    collection: {
        key: "default",
        label: "Default",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.16, 0.010, 195),
    d20: oklch(0.20, 0.010, 195),
    d30: oklch(0.24, 0.010, 195),
    d40: oklch(0.28, 0.010, 195),

    m10: oklch(0.45, 0.025, 240),
    m20: oklch(0.52, 0.025, 240),
    m30: oklch(0.60, 0.025, 240),
    m40: oklch(0.70, 0.025, 240),

    l10: oklch(0.76, 0.025, 240),
    l20: oklch(0.82, 0.025, 240),
    l30: oklch(0.88, 0.025, 240),
    l40: oklch(0.92, 0.025, 240),
};

const accents: Theme.Accents = {
    a10: oklch(0.75, 0.10, 170),
    a20: oklch(0.65, 0.10, 155),
    a30: oklch(0.75, 0.10, 290),
    a40: oklch(0.65, 0.10, 275),
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette: createPalette(primaries, {
        override: (palette) => ({
            ...palette,
            cyan: accents.a10,
            darkCyan: accents.a10,
            magenta: accents.a20,
            darkMagenta: accents.a20,
        }),
    }),
    ui: createUi(primaries, feedback, accents),
    syntax: createSyntax(primaries, feedback, accents),
};

export default theme;
