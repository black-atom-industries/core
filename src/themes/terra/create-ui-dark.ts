import type { ThemeCreatorOptions, ThemeUiColors } from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (
    { primaries, palette, feedback, accents }: ThemeCreatorOptions,
): ThemeUiColors {
    function t(color: string) {
        return tint({ color, with: primaries.d10 });
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
            default: primaries.l30,
            subtle: primaries.m40,
            disabled: primaries.m30,
            accent: accents.a10,
            contrast: primaries.d20,
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
