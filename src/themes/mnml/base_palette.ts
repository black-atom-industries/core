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
            black: "#000000", // Pure BLACK
            gray: "#808080", // Medium GRAY (50% gray)

            darkRed: "#8B0000", // Dark RED (clearly darker)
            red: "#FF0000", // Pure bright RED

            darkYellow: "#B8860B", // Dark GOLDENROD (dark yellow)
            yellow: "#FFFF00", // Pure bright YELLOW

            darkGreen: "#006400", // Dark GREEN (clearly darker)
            green: "#00FF00", // Pure bright GREEN (lime)

            darkCyan: "#008B8B", // Dark CYAN
            cyan: "#00FFFF", // Pure bright CYAN (aqua)

            darkBlue: "#00008B", // Dark BLUE
            blue: "#0080FF", // Bright SKY BLUE (more visible than pure blue)

            darkMagenta: "#8B008B", // Dark MAGENTA
            magenta: "#FF00FF", // Pure bright MAGENTA (fuchsia)

            lightGray: "#D3D3D3", // Light GRAY (clearly lighter)
            white: "#FFFFFF", // Pure WHITE
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
        white: primaries.l20,
    };

    if (opts.override) {
        return opts.override(palette);
    }

    return palette;
}
