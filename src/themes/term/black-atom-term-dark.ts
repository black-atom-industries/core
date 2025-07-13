import * as Theme from "../../types/theme.ts";

import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-term-dark",
    label: "Black Atom — TRM ∷ Dark",
    appearance: "dark",
    status: "development",
    collection: {
        key: "term",
        label: "TERM",
    },
};

const primaries: Theme.Primaries = {
    d10: "#000000", // Pure black
    d20: "#1a1a1a", // Very dark gray
    d30: "#333333", // Dark gray
    d40: "#4d4d4d", // Medium-dark gray

    m10: "#666666", // Mid-dark gray
    m20: "#808080", // True middle gray
    m30: "#999999", // Mid-light gray
    m40: "#b3b3b3", // Light-mid gray

    l10: "#cccccc", // Light gray
    l20: "#e6e6e6", // Very light gray
    l30: "#f5f5f5", // Almost white
    l40: "#ffffff", // Pure white
};

const palette: Theme.Palette = {
    black: primaries.d10, // Pure black
    gray: primaries.m10, // Mid-dark gray

    darkRed: primaries.m20, // Grayscale instead of red
    red: primaries.m30, // Lighter gray instead of red

    darkGreen: primaries.m20, // Grayscale instead of green
    green: primaries.m30, // Lighter gray instead of green

    darkYellow: primaries.m20, // Grayscale instead of yellow
    yellow: primaries.m30, // Lighter gray instead of yellow

    darkBlue: primaries.m20, // Grayscale instead of blue
    blue: primaries.m30, // Lighter gray instead of blue

    darkMagenta: primaries.m10, // Grayscale instead of magenta
    magenta: primaries.m20, // Lighter gray instead of magenta

    darkCyan: primaries.m10, // Grayscale instead of cyan
    cyan: primaries.m20, // Lighter gray instead of cyan

    lightGray: primaries.m30, // Light-mid gray
    white: primaries.l10, // Light gray
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
