import * as Theme from "../../types/theme.ts";

export default function (
    primaries: Theme.Primaries,
    feedback: Theme.MnmlFeedback,
    accents: Theme.MnmlAccents,
): Theme.UI {
    const shared = {
        negative: feedback.negative,
        info: feedback.info,
        hint: feedback.warning,
        warn: feedback.warning,
        positive: feedback.success,
        add: feedback.success,
        delete: feedback.negative,
        modify: feedback.info,
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
            ...shared,
        },
        fg: {
            default: primaries.d20,
            subtle: primaries.m10,
            accent: accents.a10,
            disabled: primaries.m30,
            contrast: primaries.l20,
            ...shared,
        },
    };
}
