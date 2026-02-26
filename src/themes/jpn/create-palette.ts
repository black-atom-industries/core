import type { ThemePalette, ThemePrimaries } from "../../types/theme.ts";

export default function (
    primaries: ThemePrimaries,
    palette: Omit<ThemePalette, "black" | "gray" | "lightGray" | "white">,
): ThemePalette {
    return {
        ...palette,
        black: primaries.d40,
        gray: primaries.m10,
        lightGray: primaries.l20,
        white: primaries.l30,
    };
}
