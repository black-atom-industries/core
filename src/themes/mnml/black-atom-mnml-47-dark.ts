import * as Theme from "../../types/theme.ts";

import palette from "./palette.ts";
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

    m10: "#5d7065",
    m20: "#687e71",
    m30: "#728c7c",
    m40: "#8fa397",

    l10: "#d3c3ad",
    l20: "#dbcfbc",
    l30: "#e7dccb",
    l40: "#f2f2da",
};

const accents: Theme.MnmlAccents = {
    a10: "#02b193",
    a20: "#ff8b4d",
};

const feedback: Theme.MnmlFeedback = {
    info: "#6eb7cf",
    warning: "#e4ae67",
    negative: "#f77b63",
    success: "#34cca7",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette: palette(primaries),
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
