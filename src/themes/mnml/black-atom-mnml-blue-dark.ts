import * as Theme from "../../types/theme.ts";

import basePalette from "./base_palette.ts";
import syntax from "./syntax_dark.ts";
import ui from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-blue-dark",
    label: "Black Atom — MNM ∷ Blue Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#17191c",
    d20: "#191d23",
    d30: "#22272e",
    d40: "#333a45",

    m10: "#5d6570",
    m20: "#68717e",
    m30: "#727c8c",
    m40: "#8f97a3",

    l10: "#adbcd3",
    l20: "#bcc8db",
    l30: "#cbd6e7",
    l40: "#dae4f2",
};

const accents: Theme.MnmlAccents = {
    a10: "#57a5ff",
    a20: "#3493ff",
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
    warning: "#f7c423",
    negative: "#e64433",
    success: "#43d480",
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui(primaries, feedback, accents),
    syntax: syntax(primaries, feedback, accents),
};

export default theme;
