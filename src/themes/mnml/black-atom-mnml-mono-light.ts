import * as Theme from "../../types/theme.ts";
import palette_light from "./palette_light.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

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
    d20: "#1a1a1a",
    d30: "#2c2c2c",
    d40: "#404040",

    m10: "#565656",
    m20: "#6c6c6c",
    m30: "#828282",
    m40: "#9a9a9a",

    l10: "#b2b2b2",
    l20: "#cbcbcb",
    l30: "#e5e5e5",
    l40: "#ffffff",
};

const accents: Theme.MnmlAccents = {
    a10: primaries.d10,
    a20: primaries.d20,
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
