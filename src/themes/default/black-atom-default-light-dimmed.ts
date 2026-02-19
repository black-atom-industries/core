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
    d10: oklch(0.26, 0.003, 240),
    d20: oklch(0.32, 0.003, 240),
    d30: oklch(0.36, 0.003, 240),
    d40: oklch(0.42, 0.003, 240),

    m10: oklch(0.52, 0.025, 240),
    m20: oklch(0.58, 0.025, 240),
    m30: oklch(0.66, 0.025, 240),
    m40: oklch(0.74, 0.025, 240),

    l10: oklch(0.900, 0.003, 240),
    l20: oklch(0.925, 0.003, 240),
    l30: oklch(0.955, 0.003, 240),
    l40: oklch(0.975, 0.003, 240),
};

const accents: Theme.Accents = {
    a10: oklch(0.65, 0.155, 142),
    a20: oklch(0.55, 0.155, 142),
    a30: oklch(0.65, 0.155, 290),
    a40: oklch(0.55, 0.155, 290),
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
