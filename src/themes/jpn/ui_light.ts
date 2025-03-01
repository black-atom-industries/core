import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    return {
        bg: {
            default: primaries[10],
            panel: primaries[9],
            float: primaries[9],
            active: primaries[8],
            disabled: primaries[7],
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
            disabled: primaries[5],
            accent: palette.yellow,
            contrast: primaries[10],
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
