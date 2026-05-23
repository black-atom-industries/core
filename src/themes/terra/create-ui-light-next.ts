import type {
    ThemeAccentColorsNext,
    ThemeFeedbackColorsNext,
    ThemeGitColorsNext,
    ThemePrimaryColorsNext,
    ThemeUiColorsNext,
} from "../../types/theme-next.ts";

export default function (
    { primaries, feedback, git, accents }: {
        primaries: ThemePrimaryColorsNext;
        feedback: ThemeFeedbackColorsNext;
        git: ThemeGitColorsNext;
        accents: ThemeAccentColorsNext;
    },
): ThemeUiColorsNext {
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

            feedback: {
                negative: feedback.negative.darken(0.2),
                success: feedback.success.darken(0.2),
                info: feedback.info.darken(0.2),
                warning: feedback.warning.darken(0.2),
            },

            git: {
                add: git.add.darken(0.2),
                delete: git.delete.darken(0.2),
                modify: git.modify.darken(0.2),
            },
        },

        fg: {
            default: primaries.d20,
            subtle: primaries.m10,
            disabled: primaries.m20,
            accent: accents.a10,
            contrast: primaries.l30,

            feedback: {
                negative: feedback.negative.lighten(0.2).saturate(0.2),
                success: feedback.success.lighten(0.2).saturate(0.2),
                info: feedback.info.lighten(0.2).saturate(0.2),
                warning: feedback.warning.lighten(0.2).saturate(0.2),
            },

            git: {
                add: git.add.lighten(0.2),
                delete: git.delete.lighten(0.2),
                modify: git.modify.lighten(0.2),
            },
        },
    };
}
