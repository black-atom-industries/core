import * as Theme from "../../types/theme.ts";
import { tint } from "../../utils/color.ts";

export default function (
    primaries: Theme.Primaries,
    feedback: Theme.MnmlFeedback,
    accents: Theme.MnmlAccents,
): Theme.UI {
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
        negative: tint({ color: feedback.negative, with: primaries.d10 }),
        info: tint({ color: feedback.info, with: primaries.d10 }),
        hint: tint({ color: feedback.warning, with: primaries.d10 }),
        warn: tint({ color: feedback.warning, with: primaries.d10 }),
        positive: tint({ color: feedback.success, with: primaries.d10 }),
        add: tint({ color: feedback.success, with: primaries.d10 }),
        delete: tint({ color: feedback.negative, with: primaries.d10 }),
        modify: tint({ color: feedback.info, with: primaries.d10 }),
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
