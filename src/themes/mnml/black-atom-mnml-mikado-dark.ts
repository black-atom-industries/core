import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mikado-dark",
    label: "Black Atom — MNM ∷ Mikado Dark",
    appearance: "dark",
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
    a10: "#ffc41b",
    a20: "#5c88a3",
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        yellow: accents.a10,
        darkYellow: accents.a10,
        blue: accents.a20,
        darkBlue: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: accents.a20,
    warning: accents.a10,
    negative: "#DB504A",
    success: "#44884e",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
