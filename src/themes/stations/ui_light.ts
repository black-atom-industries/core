import { Palette, Primaries, UI } from "../../types/theme.ts";
import { darken } from "../../utils/color.ts";

export default function (primaries: Primaries, palette: Palette): UI {
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
            negative: darken({ color: palette.red, bg: primaries.l30 }),
            warn: darken({ color: palette.yellow, bg: primaries.l30 }),
            info: darken({ color: palette.blue, bg: primaries.l30 }),
            hint: darken({ color: palette.darkYellow, bg: primaries.l30 }),
            positive: darken({ color: palette.green, bg: primaries.l30 }),
            add: darken({ color: palette.green, bg: primaries.l30 }),
            delete: darken({ color: palette.red, bg: primaries.l30 }),
            modify: darken({ color: palette.blue, bg: primaries.l30 }),
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
