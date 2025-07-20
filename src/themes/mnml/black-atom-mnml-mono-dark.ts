import * as Theme from "../../types/theme.ts";

import palette from "./palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-mono-dark",
    label: "Black Atom — MNM ∷ Mono Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#000000",
    d20: "#1a1a1a",
    d30: "#2c2c2c",
    d40: "#404040",

    m10: "#676767",
    m20: "#737373",
    m30: "#7f7f7f",
    m40: "#999999",

    l10: "#c0c0c0",
    l20: "#cccccc",
    l30: "#d9d9d9",
    l40: "#e6e6e6",
};

const accents: Theme.MnmlAccents = {
    a10: primaries.l40,
    a20: primaries.l30,
};

const feedback: Theme.MnmlFeedback = {
    info: "#3498db",
    warning: "#eab308",
    negative: "#e74c3c",
    success: "#27ae60",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette: palette(primaries),
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
