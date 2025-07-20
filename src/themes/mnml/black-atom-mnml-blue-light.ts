import * as Theme from "../../types/theme.ts";
import palette_light from "./palette_light.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

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
    d10: "#000000",
    d20: "#1a1a1a",
    d30: "#333333",
    d40: "#4d4d4d",

    m10: "#666666",
    m20: "#808080",
    m30: "#999999",
    m40: "#b3b3b3",

    l10: "#cccccc",
    l20: "#e6e6e6",
    l30: "#f5f5f5",
    l40: "#ffffff",
};

const accents: Theme.MnmlAccents = {
    a10: "#1550FF",
    a20: "#2c5ce8",
};

const palette = palette_light(primaries, accents);

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette, accents),
    syntax: syntax_light(primaries, palette, accents),
};

export default theme;
