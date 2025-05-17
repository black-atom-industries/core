import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    // Note: The original code used darken(palette.darkYellow, 0.25) for selection and search
    // Since we don't have that function here, we'll use the primaries directly
    return {
        bg: {
            default: primaries.d20,
            panel: primaries.d10,
            float: primaries.d10,
            active: primaries.d30,
            disabled: primaries.d40,
            hover: primaries.d30,
            selection: primaries.d40,
            search: primaries.d40,
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
