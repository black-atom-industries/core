import * as Theme from "../../types/theme.ts";

import syntax_light from "./syntax_light.ts";
import ui_light from "./ui_light.ts";

const meta: Theme.Meta = {
    key: "black-atom-terra-fall-day",
    label: "Black Atom — TER ∷ Fall Day",
    appearance: "light",
    status: "development",
    collection: {
        key: "terra",
        label: "TERRA",
    },
};

const primaries: Theme.Primaries = {
    d10: "#1e1e1e",
    d20: "#232323",
    d30: "#2c2928",
    d40: "#322e2b",

    m10: "#665c54",
    m20: "#7c6f64",
    m30: "#928374",
    m40: "#a89984",

    l10: "#ccc5b2",
    l20: "#d7d2c3",
    l30: "#e4decd",
    l40: "#eeeadf",
};

const palette: Theme.Palette = {
    black: primaries.d30,
    gray: primaries.m20,

    darkRed: "#d4673e",
    red: "#e8845f",

    darkGreen: "#3d5a1e",
    green: "#487024",

    darkYellow: "#d67f37",
    yellow: "#de9d3f",

    darkBlue: "#3d668e",
    blue: "#5980a6",

    darkMagenta: "#ab80a8",
    magenta: "#a58bc1",

    darkCyan: "#296a50",
    cyan: "#348764",

    lightGray: primaries.l10,
    white: primaries.l30,
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_light(primaries, palette),
    syntax: syntax_light(primaries, palette),
};

export default theme;
