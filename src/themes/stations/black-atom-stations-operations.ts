import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-stations-operations",
    label: "Black Atom — STA ∷ Operations",
    appearance: "dark",
    status: "release",
    collection: {
        key: "stations",
        label: "Stations",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.247, 0.014, 196.27),
    d20: oklch(0.295, 0.021, 181.1),
    d30: oklch(0.338, 0.027, 173.11),
    d40: oklch(0.401, 0.033, 172.67),

    m10: oklch(0.543, 0.049, 173.68),
    m20: oklch(0.59, 0.062, 162),
    m30: oklch(0.679, 0.059, 166.44),
    m40: oklch(0.76, 0.051, 171.53),

    l10: oklch(0.847, 0.081, 163.39),
    l20: oklch(0.879, 0.073, 163.55),
    l30: oklch(0.913, 0.059, 160.2),
    l40: oklch(0.938, 0.052, 158.88),
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: oklch(0.72, 0.147, 355.7),
    red: oklch(0.757, 0.129, 355.17),

    darkGreen: oklch(0.71, 0.157, 143.69),
    green: oklch(0.769, 0.126, 144.23),

    darkYellow: oklch(0.804, 0.115, 76.67),
    yellow: oklch(0.842, 0.142, 124.48),

    darkBlue: primaries.m40,
    blue: primaries.l20,

    darkMagenta: oklch(0.763, 0.071, 271.99),
    magenta: oklch(0.806, 0.049, 274.83),

    darkCyan: oklch(0.728, 0.129, 155.8),
    cyan: oklch(0.802, 0.123, 156.83),

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
