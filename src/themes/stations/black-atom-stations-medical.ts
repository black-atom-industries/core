import type * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-light.ts";
import createUi from "./create-ui-light.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-medical",
    label: "Black Atom — STA ∷ Medical",
    appearance: "light",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.271, 0.017, 259.78),
    d20: oklch(0.335, 0.025, 162.99),
    d30: oklch(0.394, 0.028, 164.41),
    d40: oklch(0.443, 0.03, 177.07),

    m10: oklch(0.494, 0.044, 172.8),
    m20: oklch(0.543, 0.057, 161.43),
    m30: oklch(0.643, 0.065, 166.03),
    m40: oklch(0.681, 0.054, 170.67),

    l10: oklch(0.851, 0.014, 167.11),
    l20: oklch(0.887, 0.01, 164.84),
    l30: oklch(0.923, 0.008, 164.93),
    l40: oklch(0.962, 0.007, 174.38),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.677, 0.148, 4.42),
    red: oklch(0.718, 0.166, 359.85),

    darkGreen: oklch(0.524, 0.127, 143.49),
    green: oklch(0.577, 0.143, 143.45),

    darkYellow: oklch(0.77, 0.164, 73.21),
    yellow: oklch(0.715, 0.204, 134.73),

    darkBlue: primaries.m20,
    blue: primaries.m10,

    darkMagenta: oklch(0.579, 0.15, 287.56),
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
