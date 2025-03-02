import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    // Note: The original code used lighten(palette.darkYellow, 0.1) for selection and search
    // Since we don't have that function here, we'll use the primaries directly
    return {
        bg: {
            default: primaries[10],
            panel: primaries[9],
            float: primaries[9],
            active: primaries[8],
            disabled: primaries[5],
            hover: primaries[8],
            selection: primaries[8],
            search: primaries[8],
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
        fg: {
            default: primaries[1],
            subtle: primaries[3],
            accent: palette.yellow,
            disabled: primaries[5],
            contrast: primaries[9],
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
