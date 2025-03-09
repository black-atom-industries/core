import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    // Note: The original code used darken(palette.darkYellow, 0.25) for selection and search
    // Since we don't have that function here, we'll use the primaries directly
    return {
        bg: {
            default: primaries.d10,
            panel: primaries.d20,
            float: primaries.d20,
            active: primaries.d30,
            disabled: primaries.d40,
            hover: primaries.d30,
            selection: "#3C2D00", // Darkened version of yellow
            search: "#3C2D00", // Darkened version of yellow
            contrast: primaries.l10,
            negative: palette.red,
            warn: palette.yellow,
            info: palette.blue,
            hint: palette.darkYellow,
            positive: palette.green,
            add: palette.green,
            delete: palette.red,
            modify: palette.blue,
        },
        fg: {
            default: primaries.l10,
            subtle: primaries.m30,
            accent: palette.yellow,
            disabled: primaries.m20,
            contrast: primaries.d20,
            negative: palette.red,
            warn: palette.yellow,
            info: palette.blue,
            hint: palette.darkYellow,
            positive: palette.green,
            add: palette.green,
            delete: palette.red,
            modify: palette.blue,
        },
    };
}
