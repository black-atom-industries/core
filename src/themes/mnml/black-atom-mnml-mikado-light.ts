import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mikado-light",
    label: "Black Atom — MNM ∷ Mikado Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#121b21",
    d20: "#0f212d",
    d30: "#1c2b34",
    d40: "#2d404b",

    m10: "#576a76",
    m20: "#627684",
    m30: "#6c8392",
    m40: "#8a9da8",

    l10: "#a8b9c0",
    l20: "#b4c3c9",
    l30: "#c3cfd4",
    l40: "#d2dbdf",
};

const accents: Theme.MnmlAccents = {
    a10: "#cc9700",
    a20: "#4a6d82",
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
