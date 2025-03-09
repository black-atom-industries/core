import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    // Note: The original code used lighten(palette.darkYellow, 0.1) for selection and search
    // Since we don't have that function here, we'll use the primaries directly
    return {
        bg: {
            default: primaries.l30,
            panel: primaries.l20,
            float: primaries.l20,
            active: primaries.l10,
            disabled: primaries.m20,
            hover: primaries.l10,
            selection: primaries.l10,
            search: primaries.l10,
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
        fg: {
            default: primaries.d20,
            subtle: primaries.d40,
            accent: palette.yellow,
            disabled: primaries.m20,
            contrast: primaries.l20,
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
