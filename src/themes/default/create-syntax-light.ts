import type { ThemeCreatorOptions, ThemeSyntaxColors } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

/**
 * Default collection light syntax - dark teal (keywords/types/functions) + rust amber (strings/numbers)
 * a10/a20 = teal accents, a30/a40 = amber accents
 */
export default function (
    { primaries, feedback, accents }: ThemeCreatorOptions,
): ThemeSyntaxColors {
    const memberColor = primaries.m20;

    return {
        variable: {
            default: primaries.d40,
            builtin: primaries.d40,
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
            default: primaries.d40,
            builtin: primaries.d30,
        },
        module: {
            default: primaries.d30,
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
            default: primaries.d30,
            builtin: primaries.d20,
            method: primaries.d20,
        },
        constructor: {
            default: primaries.d30,
        },
        keyword: {
            default: accents.a30 ?? accents.a10,
            import: accents.a40 ?? accents.a20,
            export: accents.a40 ?? accents.a20,
        },
        operator: {
            default: primaries.d30,
        },
        punctuation: {
            default: primaries.d40,
            delimiter: primaries.d40,
            bracket: primaries.d40,
            special: primaries.d40,
        },
        comment: {
            default: oklch(0.52, 0.025, 145),
            doc: oklch(0.52, 0.025, 145),
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
                h4: primaries.d40,
                h5: primaries.d40,
                h6: primaries.d40,
            },
            list: {
                default: primaries.m10,
                checked: feedback.success,
                unchecked: primaries.m10,
            },
            strong: accents.a10,
            italic: accents.a10,
            strikethrough: primaries.m10,
            quote: primaries.m20,
            math: primaries.m20,
            link: accents.a10,
            code: {
                fg: primaries.d40,
                bg: primaries.l20,
            },
        },
        tag: {
            default: accents.a10,
            builtin: accents.a20,
            attribute: primaries.m10!,
            delimiter: primaries.m10!,
        },
    };
}
