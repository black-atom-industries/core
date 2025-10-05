import { Palette, Primaries, UI } from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    return {
        bg: {
            default: primaries.l30,
            panel: primaries.l20,
            float: primaries.l20,
            active: primaries.l10,
            disabled: primaries.m30,
            hover: primaries.l10,
            selection: primaries.l40,
            search: primaries.l40,
            contrast: primaries.d20,
            negative: tint({ color: palette.red, with: primaries.l30 }),
            warn: tint({ color: palette.yellow, with: primaries.l30 }),
            info: tint({ color: palette.blue, with: primaries.l30 }),
            hint: tint({ color: palette.darkYellow, with: primaries.l30 }),
            positive: tint({ color: palette.green, with: primaries.l30 }),
            add: tint({ color: palette.green, with: primaries.l30 }),
            delete: tint({ color: palette.red, with: primaries.l30 }),
            modify: tint({ color: palette.blue, with: primaries.l30 }),
        },
        fg: {
            default: primaries.d20,
            subtle: primaries.m10,
            disabled: primaries.m20,
            accent: palette.yellow,
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
    };
}
