import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";
import feedback from "./feedback-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-default-light-dimmed",
    label: "Black Atom — Light Dimmed",
    appearance: "light",
    status: "release",
    collection: {
        key: "default",
        label: "Default",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.22, 0.003, 195),
    d20: oklch(0.28, 0.003, 195),
    d30: oklch(0.32, 0.003, 195),
    d40: oklch(0.36, 0.003, 195),

    m10: oklch(0.52, 0.003, 195),
    m20: oklch(0.58, 0.003, 195),
    m30: oklch(0.66, 0.003, 195),
    m40: oklch(0.74, 0.003, 195),

    l10: oklch(0.84, 0.003, 195),
    l20: oklch(0.88, 0.003, 195),
    l30: oklch(0.91, 0.003, 195),
    l40: oklch(0.94, 0.003, 195),
};

const accents: Theme.Accents = {
    a10: oklch(0.58, 0.20, 170),
    a20: oklch(0.48, 0.20, 155),
    a30: oklch(0.58, 0.20, 290),
    a40: oklch(0.48, 0.20, 275),
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
