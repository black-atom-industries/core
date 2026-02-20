import type * as Theme from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (
    primaries: Theme.Primaries,
    feedback: Theme.Feedback,
    accents: Theme.Accents,
): Theme.UI {
    function t(color: string) {
        return tint({ color, with: primaries.d10 });
    }

    const sharedFg = {
        negative: feedback.negative,
        info: feedback.info,
        hint: feedback.warning,
        warn: feedback.warning,
        positive: feedback.success,
        add: feedback.success,
        delete: feedback.negative,
        modify: feedback.info,
    };

    const sharedBg = {
        negative: t(feedback.negative),
        info: t(feedback.info),
        hint: t(feedback.warning),
        warn: t(feedback.warning),
        positive: t(feedback.success),
        add: t(feedback.success),
        delete: t(feedback.negative),
        modify: t(feedback.info),
    };

    return {
        bg: {
            default: primaries.d20,
            panel: primaries.d10,
            float: primaries.d10,
            active: primaries.d30,
            disabled: primaries.d40,
            hover: primaries.d30,
            selection: primaries.d40,
            search: primaries.d40,
            contrast: primaries.l10,
            ...sharedBg,
        },
        fg: {
            default: primaries.l30,
            subtle: primaries.m30,
            accent: accents.a10,
            disabled: primaries.m20,
            contrast: primaries.d20,
            ...sharedFg,
        },
    };
}
