import { MnmlAccents, Palette, Primaries, UI } from "../../types/theme.ts";
import feedback from "./feedback_light.ts";

export default function (primaries: Primaries, palette: Palette, accents: MnmlAccents): UI {
    return {
        bg: {
            default: primaries.l40,
            panel: primaries.l30,
            float: primaries.l30,
            active: primaries.l30,
            disabled: primaries.m20,
            hover: primaries.l10,
            selection: primaries.l10,
            search: primaries.l10,
            contrast: primaries.d20,
            negative: feedback.red,
            info: feedback.blue,
            hint: feedback.yellow,
            warn: feedback.yellow,
            positive: feedback.green,
            add: feedback.green,
            delete: feedback.red,
            modify: feedback.blue,
        },
        fg: {
            default: primaries.d20,
            subtle: primaries.d40,
            accent: accents.a10,
            disabled: primaries.m20,
            contrast: primaries.l20,
            negative: feedback.red,
            info: feedback.blue,
            hint: feedback.yellow,
            warn: feedback.yellow,
            positive: feedback.green,
            add: feedback.green,
            delete: feedback.red,
            modify: feedback.blue,
        },
    };
}
