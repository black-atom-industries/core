import type * as Theme from "../../types/theme.ts";

export default function (
    primaries: Theme.Primaries,
    palette: Omit<Theme.Palette, "black" | "gray" | "lightGray" | "white">,
): Theme.Palette {
    return {
        ...palette,
        black: primaries.d40,
        gray: primaries.m10,
        lightGray: primaries.l20,
        white: primaries.l30,
    };
}
