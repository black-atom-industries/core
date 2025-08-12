import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-47-light",
    label: "Black Atom — MNM ∷ 47 Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#2a2723",
    d20: "#3b362a",
    d30: "#484436",
    d40: "#655f4b",

    m10: "#516258",
    m20: "#5c7064",
    m30: "#677e70",
    m40: "#81988a",

    l10: "#d3c3ad",
    l20: "#dbcfbc",
    l30: "#ece3d5",
    l40: "#f9f9ed",
};

const accents: Theme.MnmlAccents = {
    a10: "#016F5C",
    a20: "#FF6513",
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        green: accents.a10,
        darkGreen: accents.a10,
        yellow: accents.a20,
        darkYellow: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: "#3b94b1",
    warning: "#b57520",
    negative: "#f44624",
    success: "#2aa889",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
