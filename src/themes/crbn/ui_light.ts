import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    // Note: The original code used lighten(palette.darkYellow, 0.1) for selection and search
    // Since we don't have that function here, we'll use the primaries directly
    return {
        bg: {
            default: primaries[8],
            panel: primaries[7],
            float: primaries[7],
            active: primaries[6],
            disabled: primaries[3],
            hover: primaries[6],
            selection: "#FFB066", // Lightened version of dark yellow
            search: "#FFB066", // Lightened version of dark yellow
            contrast: primaries[0],
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
            subtle: primaries[0],
            accent: palette.yellow,
            disabled: primaries[3],
            contrast: primaries[7],
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
