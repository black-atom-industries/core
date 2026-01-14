import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-spring-night",
    label: "Black Atom — TER ∷ Spring Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.24, 0.005, 173.99),
    d20: oklch(0.26, 0.007, 164.43),
    d30: oklch(0.287, 0.008, 169.81),
    d40: oklch(0.327, 0.008, 169.94),

    m10: oklch(0.383, 0.022, 163.57),
    m20: oklch(0.482, 0.026, 163.63),
    m30: oklch(0.571, 0.032, 162.48),
    m40: oklch(0.657, 0.029, 162.75),

    l10: oklch(0.744, 0.035, 79.2),
    l20: oklch(0.786, 0.03, 82.58),
    l30: oklch(0.859, 0.02, 87.52),
    l40: oklch(0.897, 0.016, 95.24),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.576, 0.129, 31.54),
    red: oklch(0.618, 0.1, 32.01),

    darkGreen: oklch(0.702, 0.123, 140.78),
    green: oklch(0.81, 0.105, 147.58),

    darkYellow: oklch(0.752, 0.119, 55.94),
    yellow: oklch(0.752, 0.1, 78.73),

    darkBlue: oklch(0.705, 0.095, 270.31),
    blue: oklch(0.778, 0.074, 256.94),

    darkMagenta: oklch(0.782, 0.062, 342.39),
    magenta: oklch(0.795, 0.058, 307.1),

    darkCyan: oklch(0.64, 0.066, 162.06),
    cyan: oklch(0.714, 0.048, 171.45),
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
