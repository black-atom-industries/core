import type { ThemeCreatorOptions, ThemeUiColors } from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (
    { primaries, palette, feedback, accents }: ThemeCreatorOptions,
): ThemeUiColors {
    function t(color: string) {
        return tint({ color, with: primaries.l40 });
    }

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
            negative: t(feedback.negative),
            warn: t(feedback.warning),
            info: t(feedback.info),
            hint: t(palette.darkYellow),
            positive: t(feedback.success),
            add: t(feedback.success),
            delete: t(feedback.negative),
            modify: t(feedback.info),
        },
        fg: {
            default: primaries.d20,
            subtle: primaries.m10,
            disabled: primaries.m20,
            accent: accents.a10,
            contrast: primaries.l30,
            negative: feedback.negative,
            warn: feedback.warning,
            info: feedback.info,
            hint: palette.darkYellow,
            positive: feedback.success,
            add: feedback.success,
            delete: feedback.negative,
            modify: feedback.info,
        },
    };
}
