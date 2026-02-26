import type { ThemePaletteColors, ThemePrimaryColors } from "../../types/theme.ts";

export default function (
    primaries: ThemePrimaryColors,
    palette: Omit<ThemePaletteColors, "black" | "gray" | "lightGray" | "white">,
): ThemePaletteColors {
    return {
        ...palette,
        black: primaries.d40,
        gray: primaries.m10,
        lightGray: primaries.m40,
        white: primaries.l10,
    };
}
