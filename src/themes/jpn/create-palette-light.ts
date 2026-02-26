import type { ThemePaletteColors, ThemePrimaryColors } from "../../types/theme.ts";
import { createPalette } from "../create-palette.ts";

export default function (
    primaries: ThemePrimaryColors,
    palette: Omit<ThemePaletteColors, "black" | "gray" | "lightGray" | "white">,
    opts?: Parameters<typeof createPalette>[1],
): ThemePaletteColors {
    return createPalette({
        ...palette,
        black: primaries.d40,
        gray: primaries.m10,
        lightGray: primaries.l10,
        white: primaries.l20,
    }, opts);
}
