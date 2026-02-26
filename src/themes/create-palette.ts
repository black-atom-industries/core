import type { ThemePaletteColors } from "../types/theme.ts";

/** Hardcoded ANSI debug palette for visual testing of palette slot assignments. */
export const debugPalette: ThemePaletteColors = {
    black: "#000000",
    gray: "#808080",

    darkRed: "#8B0000",
    red: "#FF0000",

    darkYellow: "#B8860B",
    yellow: "#FFFF00",

    darkGreen: "#006400",
    green: "#00FF00",

    darkCyan: "#008B8B",
    cyan: "#00FFFF",

    darkBlue: "#00008B",
    blue: "#0080FF",

    darkMagenta: "#8B008B",
    magenta: "#FF00FF",

    lightGray: "#D3D3D3",
    white: "#FFFFFF",
};

export function createPalette(
    colors: ThemePaletteColors,
    opts?: {
        debug?: boolean;
        override?: (palette: ThemePaletteColors) => ThemePaletteColors;
    },
): ThemePaletteColors {
    if (opts?.debug) return debugPalette;
    if (opts?.override) return opts.override(colors);
    return colors;
}
