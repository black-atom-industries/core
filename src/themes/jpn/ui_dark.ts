import { Palette, Primaries, UI } from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    function t(color: string) {
        return tint({ color, with: primaries.d20 });
    }

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
            default: primaries.l30,
            subtle: primaries.m40,
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
