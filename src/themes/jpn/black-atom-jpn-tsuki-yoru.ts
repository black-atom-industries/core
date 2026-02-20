import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-tsuki-yoru",
    label: "Black Atom — JPN ∷ Tsuki Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "JPN",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.168, 0, 0),
    d20: oklch(0.226, 0, 0),
    d30: oklch(0.277, 0, 0),
    d40: oklch(0.337, 0, 0),

    m10: oklch(0.435, 0.029, 285.11),
    m20: oklch(0.529, 0.034, 285.17),
    m30: oklch(0.615, 0.035, 285.34),
    m40: oklch(0.702, 0.026, 285.71),

    l10: oklch(0.767, 0, 0),
    l20: oklch(0.842, 0, 0),
    l30: oklch(0.925, 0, 0),
    l40: oklch(1, 0, 0),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.719, 0.158, 1.16),
    red: oklch(0.77, 0.126, 359.29),

    darkGreen: oklch(0.676, 0.074, 156.01),
    green: oklch(0.749, 0.058, 156.89),

    darkYellow: oklch(0.788, 0.106, 31.08),
    yellow: oklch(0.82, 0.072, 53.24),

    darkBlue: oklch(0.683, 0.063, 264.93),
    blue: oklch(0.756, 0.048, 264.83),

    darkMagenta: oklch(0.664, 0.086, 295.03),
    magenta: oklch(0.734, 0.067, 295.68),

    darkCyan: oklch(0.746, 0.076, 177.19),
    cyan: oklch(0.83, 0.081, 175.77),
});

const ui = createUi(primaries, palette);

const syntax = createSyntax(primaries, palette);

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui,
    syntax,
};

export default theme;
