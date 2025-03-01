import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    return {
        bg: {
            default: primaries[1],
            panel: primaries[0],
            float: primaries[0],
            active: primaries[2],
            disabled: primaries[4],
            hover: primaries[2],
            selection: primaries[3],
            search: primaries[3],
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
        fg: {
            default: primaries[10],
            subtle: primaries[8],
            disabled: primaries[6],
            accent: palette.yellow,
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
    };
}
