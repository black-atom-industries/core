import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-blue-light",
    label: "Black Atom — MNM ∷ Blue Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#23262a",
    d20: "#2a313b",
    d30: "#363d48",
    d40: "#404956",

    m10: "#515862",
    m20: "#5c6470",
    m30: "#67707e",
    m40: "#818a98",

    l10: "#b8c8e0",
    l20: "#d2def0",
    l30: "#e1e9f5",
    l40: "#ebf1fa",
};

const accents: Theme.MnmlAccents = {
    a10: "#3862dc",
    a20: "#1550FF",
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        blue: accents.a10,
        darkBlue: accents.a10,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: accents.a20,
    warning: "#f7bd08",
    negative: "#e64433",
    success: "#2fd073",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
