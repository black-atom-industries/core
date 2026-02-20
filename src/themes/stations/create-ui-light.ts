import type { Palette, Primaries, UI } from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    function t(color: string) {
        return tint({ color, with: primaries.l30 });
    }

    return {
        bg: {
            default: primaries.l30,
            panel: primaries.l20,
            float: primaries.l20,
            active: primaries.l10,
            disabled: primaries.m40,
            hover: primaries.l10,
            selection: primaries.l10,
            search: primaries.l10,
            contrast: primaries.d20,
            negative: t(palette.red),
            warn: t(palette.yellow),
            info: t(palette.blue),
            hint: t(palette.darkYellow),
            positive: t(palette.green),
            add: t(palette.green),
            delete: t(palette.red),
            modify: t(palette.blue),
        },
        fg: {
            default: primaries.d20,
            subtle: primaries.m30,
            disabled: primaries.m40,
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
