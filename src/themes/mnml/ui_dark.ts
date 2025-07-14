import { Accents, Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette, accents: Accents): UI {
    return {
        bg: {
            default: primaries.d10,
            panel: primaries.d20,
            float: primaries.d20,
            active: primaries.d30,
            disabled: primaries.d40,
            hover: primaries.d30,
            selection: primaries.d40,
            search: primaries.d40,
            contrast: primaries.l10,
            negative: palette.red,
            warn: accents.a20,
            info: palette.blue,
            hint: accents.a30,
            positive: palette.green,
            add: palette.green,
            delete: palette.red,
            modify: palette.blue,
        },
        fg: {
            default: primaries.l10,
            subtle: primaries.m30,
            accent: accents.a10,
            disabled: primaries.m20,
            contrast: primaries.d20,
            negative: palette.red,
            warn: accents.a20,
            info: palette.blue,
            hint: accents.a30,
            positive: palette.green,
            add: palette.green,
            delete: palette.red,
            modify: palette.blue,
        },
    };
}
