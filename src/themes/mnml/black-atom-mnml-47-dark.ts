import type * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-47-dark",
    label: "Black Atom — MNM ∷ 47 Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1c1a17",
    d20: "#232019",
    d30: "#2e2b22",
    d40: "#454133",

    m10: "#61705d",
    m20: "#6d7e68",
    m30: "#788c72",
    m40: "#93a38f",

    l10: "#b2d7a8",
    l20: "#c0dfb9",
    l30: "#d0e7cb",
    l40: "#e0efdc",
};

const accents: Theme.MnmlAccents = {
    a10: "#02b193",
    a20: "#ff8b4d",
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
    info: "#805E73",
    warning: "#EDE5A6",
    negative: "#f77b63",
    success: accents.a10,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
