import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-jpn-murasaki-yoru",
    label: "Black Atom — JPN ∷ Murasaki Yoru",
    appearance: "dark",
    status: "release",
    collection: {
        key: "jpn",
        label: "Japan",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.212, 0.028, 329.36),
    d20: oklch(0.275, 0.041, 330.32),
    d30: oklch(0.334, 0.053, 330.8),
    d40: oklch(0.39, 0.059, 330.16),

    m10: oklch(0.453, 0.072, 330.42),
    m20: oklch(0.498, 0.081, 330.78),
    m30: oklch(0.541, 0.078, 324.95),
    m40: oklch(0.581, 0.084, 325.1),

    l10: oklch(0.714, 0.061, 325.27),
    l20: oklch(0.789, 0.045, 323.6),
    l30: oklch(0.829, 0.039, 323.23),
    l40: oklch(0.906, 0.023, 323.62),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: oklch(0.617, 0.219, 28.4),
    red: oklch(0.677, 0.176, 25.7),

    darkGreen: oklch(0.7, 0.117, 163.39),
    green: oklch(0.75, 0.098, 165.36),

    darkYellow: oklch(0.775, 0.17, 64.87),
    yellow: oklch(0.761, 0.154, 78.01),

    darkBlue: oklch(0.68, 0.112, 226.16),
    blue: oklch(0.767, 0.087, 222.11),

    darkMagenta: oklch(0.537, 0.114, 305.64),
    magenta: oklch(0.705, 0.168, 352.46),

    darkCyan: oklch(0.695, 0.06, 194.47),
    cyan: oklch(0.763, 0.048, 194.49),

    lightGray: primaries.m40,
    white: primaries.l30,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
