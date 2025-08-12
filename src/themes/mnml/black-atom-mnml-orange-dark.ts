import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-orange-dark",
    label: "Black Atom — MNM ∷ Orange Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#171a1c",
    d20: "#1b1f21",
    d30: "#24292c",
    d40: "#363e42",

    m10: "#67727f",
    m20: "#74848c",
    m30: "#809098",
    m40: "#9da8af",

    l10: "#b3c4cd",
    l20: "#c1cfd6",
    l30: "#d1dce1",
    l40: "#dee8ed",
};

const accents: Theme.MnmlAccents = {
    a10: "#ff8e33",
    a20: "#ff6833",
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
