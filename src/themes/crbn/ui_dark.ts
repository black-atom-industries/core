import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    // Note: The original code used darken(palette.darkYellow, 0.25) for selection and search
    // Since we don't have that function here, we'll use the primaries directly
    return {
        bg: {
            default: primaries[0],
            panel: primaries[1],
            float: primaries[1],
            active: primaries[2],
            disabled: primaries[3],
            hover: primaries[2],
            selection: "#3C2D00", // Darkened version of yellow
            search: "#3C2D00", // Darkened version of yellow
            contrast: primaries[8],
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
            default: primaries[8],
            subtle: primaries[6],
            accent: palette.yellow,
            disabled: primaries[5],
            contrast: primaries[1],
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
