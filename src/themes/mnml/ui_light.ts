import { Accents, Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette, accents: Accents): UI {
    return {
        bg: {
            default: primaries.l40,
            panel: primaries.l30,
            float: primaries.l30,
            active: primaries.l10,
            disabled: primaries.m20,
            hover: primaries.l10,
            selection: primaries.l10,
            search: primaries.l10,
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
        fg: {
            default: primaries.d20,
            subtle: primaries.d40,
            accent: accents.a10,
            disabled: primaries.m20,
            contrast: primaries.l20,
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
