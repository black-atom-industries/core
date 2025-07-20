import * as Theme from "../../types/theme.ts";
import palette_light from "./palette_light.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-mnml-orange-light",
    label: "Black Atom — MNM ∷ Orange Light",
    appearance: "light",
    status: "development",
    collection: {
        key: "mnml",
        label: "MNM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#131517",
    d20: "#1f2326",
    d30: "#2d3338",
    d40: "#3b4249",

    m10: "#507294",
    m20: "#698cae",
    m30: "#8caac1",
    m40: "#adc1d3",

    l10: "#e5ebf1",
    l20: "#ebf1f4",
    l30: "#f2f6f9",
    l40: "#ffffff",
};

const accents: Theme.MnmlAccents = {
    a10: "#ff6619",
    a20: "#ff3f00",
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
