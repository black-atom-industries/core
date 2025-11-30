import * as Theme from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-osman-light",
    label: "Black Atom — MNM ∷ Osman Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: oklch(0.15, 0.008, 64),
    d20: oklch(0.32, 0.015, 64),
    d30: oklch(0.36, 0.015, 64),
    d40: oklch(0.40, 0.015, 64),

    m10: oklch(0.50, 0.020, 64),
    m20: oklch(0.55, 0.020, 64),
    m30: oklch(0.60, 0.020, 64),
    m40: oklch(0.65, 0.020, 64),

    l10: oklch(0.82, 0.012, 64),
    l20: oklch(0.86, 0.012, 64),
    l30: oklch(0.980, 0.013, 64),
    l40: oklch(0.995, 0.010, 64),
};

const accents: Theme.MnmlAccents = {
    a10: oklch(0.625, 0.200, 255),
    a20: oklch(0.625, 0.225, 28),
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        blue: accents.a10,
        darkBlue: accents.a10,
        red: accents.a20,
        darkRed: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: accents.a10,
    warning: oklch(0.70, 0.15, 85),
    negative: accents.a20,
    success: oklch(0.65, 0.15, 150),
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: {
        ...syntax(primaries, feedback, accents),
        keyword: {
            default: accents.a20,
            import: accents.a10,
            export: accents.a10,
        },
    },
};

export default theme;
