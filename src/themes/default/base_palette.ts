import * as Theme from "../../types/theme.ts";

export default function (
    primaries: Theme.Primaries,
    opts: {
        debug: boolean;
        override?: (palette: Theme.Palette) => Theme.Palette;
    } = {
        debug: false,
    },
): Theme.Palette {
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

    const palette: Theme.Palette = {
        black: primaries.m10,
        gray: primaries.m10,

        darkRed: primaries.m40,
        red: primaries.m40,

        darkYellow: primaries.m30,
        yellow: primaries.m30,

        darkGreen: primaries.m30,
        green: primaries.m30,

        darkCyan: primaries.m40,
        cyan: primaries.m40,

        darkBlue: primaries.m20,
        blue: primaries.m20,

        darkMagenta: primaries.m30,
        magenta: primaries.m30,

        lightGray: primaries.l10,
        white: primaries.l10,
    };

    if (opts.override) {
        return opts.override(palette);
    }

    return palette;
}
