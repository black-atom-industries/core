import * as Theme from "../../types/theme.ts";
import { darken } from "../../utils/color.ts";

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
        negative: darken({ color: feedback.negative, bg: primaries.l40 }),
        info: darken({ color: feedback.info, bg: primaries.l40 }),
        hint: darken({ color: feedback.warning, bg: primaries.l40 }),
        warn: darken({ color: feedback.warning, bg: primaries.l40 }),
        positive: darken({ color: feedback.success, bg: primaries.l40 }),
        add: darken({ color: feedback.success, bg: primaries.l40 }),
        delete: darken({ color: feedback.negative, bg: primaries.l40 }),
        modify: darken({ color: feedback.info, bg: primaries.l40 }),
    };

    return {
        bg: {
            default: primaries.l40,
            panel: primaries.l30,
            float: primaries.l30,
            active: primaries.l20,
            disabled: primaries.l10,
            hover: primaries.l20,
            selection: primaries.l10,
            search: primaries.l10,
            contrast: primaries.d40,
            ...sharedBg,
        },
        fg: {
            default: primaries.d20,
            subtle: primaries.m10,
            accent: accents.a10,
            disabled: primaries.m30,
            contrast: primaries.l20,
            ...sharedFg,
        },
    };
}
