import type { ThemeCreatorOptions, ThemeSyntaxColors } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

/**
 * Default collection dark syntax - teal (keywords/types/functions) + amber (strings/numbers)
 * a10/a20 = teal accents, a30/a40 = amber accents
 */
export default function (
    { primaries, feedback, accents }: ThemeCreatorOptions,
): ThemeSyntaxColors {
    const funcColor = primaries.l30;
    const memberColor = primaries.m30;

    return {
        variable: {
            default: primaries.l10,
            builtin: primaries.l10,
            member: memberColor,
            parameter: accents.a20,
        },
        property: {
            default: memberColor,
        },
        string: {
            default: accents.a20,
            doc: accents.a20,
            regexp: accents.a20,
            escape: accents.a20,
        },
        constant: {
            default: primaries.l10,
            builtin: primaries.l20,
        },
        module: {
            default: primaries.l20,
        },
        boolean: {
            default: accents.a20,
        },
        number: {
            default: accents.a20,
        },
        type: {
            default: accents.a10,
            builtin: accents.a20,
        },
        attribute: {
            default: accents.a10,
            builtin: accents.a20,
        },
        func: {
            default: primaries.l30,
            builtin: primaries.l20,
            method: primaries.l20,
        },
        constructor: {
            default: primaries.l30,
        },
        keyword: {
            default: accents.a30 ?? accents.a10,
            import: accents.a40 ?? accents.a20,
            export: accents.a40 ?? accents.a20,
        },
        operator: {
            default: primaries.l20,
        },
        punctuation: {
            default: primaries.l10,
            delimiter: primaries.l10,
            bracket: primaries.l10,
            special: primaries.l10,
        },
        comment: {
            default: oklch(0.51, 0.025, 145),
            doc: oklch(0.51, 0.025, 145),
            todo: feedback.success,
            error: feedback.negative,
            warn: feedback.warning,
            info: feedback.info,
            hint: feedback.info,
        },
        markup: {
            heading: {
                h1: accents.a10,
                h2: accents.a10,
                h3: accents.a10,
                h4: primaries.l10,
                h5: primaries.l10,
                h6: primaries.l10,
            },
            list: {
                default: primaries.m40,
                checked: feedback.success,
                unchecked: primaries.m40,
            },
            strong: accents.a10,
            italic: accents.a10,
            strikethrough: primaries.m40,
            quote: primaries.m30,
            math: primaries.m30,
            link: accents.a10,
            code: {
                fg: primaries.l10,
                bg: primaries.d10,
            },
        },
        tag: {
            default: accents.a10,
            builtin: accents.a20,
            attribute: primaries.m40!,
            delimiter: primaries.m40!,
        },
    };
}
