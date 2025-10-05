import { Palette, Primaries, UI } from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

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
            negative: tint({ color: palette.red, with: primaries.d20 }),
            warn: tint({ color: palette.yellow, with: primaries.d20 }),
            info: tint({ color: palette.blue, with: primaries.d20 }),
            hint: tint({ color: palette.darkYellow, with: primaries.d20 }),
            positive: tint({ color: palette.green, with: primaries.d20 }),
            add: tint({ color: palette.green, with: primaries.d20 }),
            delete: tint({ color: palette.red, with: primaries.d20 }),
            modify: tint({ color: palette.blue, with: primaries.d20 }),
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
