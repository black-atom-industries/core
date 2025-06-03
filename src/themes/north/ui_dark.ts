import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    return {
        bg: {
            default: primaries.d20,
            panel: primaries.d10,
            float: primaries.d10,
            active: primaries.d30,
            disabled: primaries.m10,
            hover: primaries.d30,
            selection: primaries.d40,
            search: primaries.d40,
            contrast: primaries.l30,
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
            default: primaries.l30,
            subtle: primaries.l10,
            disabled: primaries.m30,
            accent: palette.yellow,
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