import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-research",
    label: "Black Atom — STA ∷ Research",
    appearance: "light",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.251, 0.015, 261.66),
    d20: oklch(0.335, 0.025, 162.99),
    d30: oklch(0.394, 0.028, 164.41),
    d40: oklch(0.443, 0.03, 177.07),

    m10: oklch(0.543, 0.049, 173.68),
    m20: oklch(0.59, 0.062, 162),
    m30: oklch(0.679, 0.059, 166.44),
    m40: oklch(0.753, 0.042, 172.29),

    l10: oklch(0.927, 0.006, 170.44),
    l20: oklch(0.955, 0.005, 165.01),
    l30: oklch(0.981, 0.001, 197.14),
    l40: oklch(1, 0, 0),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.677, 0.148, 4.42),
    red: oklch(0.718, 0.166, 359.85),

    darkGreen: oklch(0.616, 0.14, 143.65),
    green: oklch(0.663, 0.149, 143.66),

    darkYellow: oklch(0.77, 0.164, 73.21),
    yellow: oklch(0.715, 0.204, 134.73),

    darkBlue: primaries.m20,
    blue: primaries.m10,

    darkMagenta: oklch(0.632, 0.13, 288.9),
    magenta: oklch(0.686, 0.109, 289.93),

    darkCyan: oklch(0.647, 0.131, 154.34),
    cyan: oklch(0.717, 0.155, 153.8),
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
