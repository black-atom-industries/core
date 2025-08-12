import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_light.ts";
import ui from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mono-light",
    label: "Black Atom — MNM ∷ Mono Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#000000",
    d20: "#242424",
    d30: "#333333",
    d40: "#404040",

    m10: "#5a5a5a",
    m20: "#666666",
    m30: "#737373",
    m40: "#8c8c8c",

    l10: "#c0c0c0",
    l20: "#cccccc",
    l30: "#e1e1e1",
    l40: "#f3f3f3",
};

const accents: Theme.MnmlAccents = {
    a10: primaries.d10,
    a20: primaries.d30,
};

const palette = basePalette(primaries, {
    debug: false,
    override: (palette) => ({
        ...palette,
        white: accents.a10,
        lightGray: accents.a20,
    }),
});

const feedback: Theme.MnmlFeedback = {
    info: "#3498db",
    warning: "#eab308",
    negative: "#e74c3c",
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
