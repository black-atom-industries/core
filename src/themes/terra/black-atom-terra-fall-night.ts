import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import createPalette from "./create-palette.ts";
import createSyntax from "./create-syntax-dark.ts";
import createUi from "./create-ui-dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-night",
    label: "Black Atom — TER ∷ Fall Night",
    appearance: "dark",
    status: "release",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.18, 0.025, 50.0),
    d20: oklch(0.22, 0.025, 50.0),
    d30: oklch(0.26, 0.025, 50.0),
    d40: oklch(0.30, 0.025, 50.0),

    m10: oklch(0.50, 0.075, 50.0),
    m20: oklch(0.60, 0.075, 50.0),
    m30: oklch(0.65, 0.075, 50.0),
    m40: oklch(0.70, 0.075, 50.0),

    l10: oklch(0.75, 0.05, 50.0),
    l20: oklch(0.80, 0.05, 50.0),
    l30: oklch(0.85, 0.05, 50.0),
    l40: oklch(0.90, 0.0439, 50.0),
};

const palette = createPalette(primaries, {
    darkRed: oklch(0.6, 0.14, 30),
    red: oklch(0.7, 0.14, 30),

    darkGreen: oklch(0.655, 0.05, 127.63),
    green: oklch(0.698, 0.05, 127.55),

    darkYellow: oklch(0.699, 0.15, 50.77),
    yellow: oklch(0.699, 0.15, 72.07),

    darkBlue: oklch(0.655, 0.101, 50.7),
    blue: oklch(0.699, 0.101, 52.11),

    darkMagenta: oklch(0.656, 0.101, 36.23),
    magenta: oklch(0.701, 0.1, 40.54),

    darkCyan: oklch(0.655, 0.049, 175.15),
    cyan: oklch(0.7, 0.05, 174.22),
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
