import * as Theme from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (
    primaries: Theme.Primaries,
    feedback: Theme.MnmlFeedback,
    accents: Theme.MnmlAccents,
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
            default: primaries.d10,
            panel: primaries.d20,
            float: primaries.d20,
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
            subtle: primaries.m40,
            accent: accents.a10,
            disabled: primaries.m20,
            contrast: primaries.d20,
            ...sharedFg,
        },
    };
}
