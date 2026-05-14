import type { ThemePaletteColorsNext, ThemePrimaryColorsNext } from "../../types/theme-next.ts";

export default function (
    primaries: ThemePrimaryColorsNext,
    palette: Omit<ThemePaletteColorsNext, "black" | "gray" | "lightGray" | "white">,
): ThemePaletteColorsNext {
    return {
        ...palette,
        black: primaries.d40,
        gray: primaries.m10,
        lightGray: primaries.l10,
        white: primaries.l30,
    };
}
