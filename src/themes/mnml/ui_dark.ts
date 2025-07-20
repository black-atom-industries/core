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
            default: primaries.d10,
            panel: primaries.d20,
            float: primaries.d20,
            active: primaries.d30,
            disabled: primaries.d40,
            hover: primaries.d30,
            selection: primaries.d40,
            search: primaries.d40,
            contrast: primaries.l10,
            ...shared,
        },
        fg: {
            default: primaries.l30,
            subtle: primaries.m40,
            accent: accents.a10,
            disabled: primaries.m20,
            contrast: primaries.d20,
            ...shared,
        },
    };
}
