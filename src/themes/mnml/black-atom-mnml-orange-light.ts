import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-orange-light",
    label: "Black Atom — MNM ∷ Orange Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#23282a",
    d20: "#2d3438",
    d30: "#394145",
    d40: "#444a53",

    m10: "#515c62",
    m20: "#5c6470",
    m30: "#67767e",
    m40: "#819098",

    l10: "#bed2dc",
    l20: "#cddce4",
    l30: "#dce9ef",
    l40: "#edf5f9",
};

const accents: Theme.MnmlAccents = {
    a10: "#FF6513",
    a20: "#ff4700",
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: "#3498db",
    warning: accents.a10,
    negative: accents.a20,
    success: "#27ae60",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
