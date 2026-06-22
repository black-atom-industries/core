import type { ThemePaletteColors, ThemePrimaryColors } from "../../types/theme.ts";
import { createPalette } from "../create-palette.ts";

export default function (
    primaries: ThemePrimaryColors,
    opts?: Parameters<typeof createPalette>[1],
): ThemePaletteColors {
    return createPalette({
        black: primaries.d40,
        gray: primaries.m10,

        darkRed: primaries.m40,
        red: primaries.m40,

        darkYellow: primaries.m30,
        yellow: primaries.m30,

        darkGreen: primaries.m30,
        green: primaries.m30,

        darkCyan: primaries.m40,
        cyan: primaries.m40,

        darkBlue: primaries.m40,
        blue: primaries.m40,

        darkMagenta: primaries.m30,
        magenta: primaries.m30,

        lightGray: primaries.m40,
        white: primaries.m40,
    }, opts);
}
