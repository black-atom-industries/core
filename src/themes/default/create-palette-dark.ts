import type { ThemePaletteColors, ThemePrimaryColors } from "../../types/theme.ts";

export default function (
    primaries: ThemePrimaryColors,
    opts: {
        debug?: boolean;
        override?: (palette: ThemePaletteColors) => ThemePaletteColors;
    } = {
        debug: false,
    },
): ThemePaletteColors {
    if (opts.debug) {
        return {
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
    }

    const palette: ThemePaletteColors = {
        black: primaries.d40,
        gray: primaries.m20,

        darkRed: primaries.m40,
        red: primaries.m40,

        darkYellow: primaries.m30,
        yellow: primaries.m30,

        darkGreen: primaries.m40,
        green: primaries.m40,

        darkCyan: primaries.m40,
        cyan: primaries.m40,

        darkBlue: primaries.m20,
        blue: primaries.m20,

        darkMagenta: primaries.m30,
        magenta: primaries.m30,

        lightGray: primaries.l20,
        white: primaries.l30,
    };

    if (opts.override) {
        return opts.override(palette);
    }

    return palette;
}
