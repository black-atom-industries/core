import * as Theme from "../../types/theme.ts";
import { Feedback } from "../../types/theme.ts";

/**
 * Default collection light syntax - minimal grayscale with 4 accents
 * a10/a20 = teal variants
 * a30/a40 = purple variants (keywords)
 */
export default function (
    primaries: Theme.Primaries,
    feedback: Feedback,
    accents: Theme.Accents,
): Theme.Syntax {
    return {
        variable: {
            default: primaries.d40,
            builtin: primaries.d40,
            member: primaries.m20,
            parameter: accents.a40 ?? accents.a20,
        },
        property: {
            default: primaries.m20,
        },
        string: {
            default: accents.a20,
            doc: accents.a20,
            regexp: primaries.d20,
            escape: primaries.d20,
        },
        constant: {
            default: primaries.d40,
            builtin: primaries.d30,
        },
        module: {
            default: primaries.d30,
        },
        boolean: {
            default: primaries.d40,
        },
        number: {
            default: primaries.d40,
        },
        type: {
            default: accents.a10,
            builtin: accents.a20,
        },
        attribute: {
            default: accents.a20,
            builtin: accents.a20,
        },
        func: {
            default: accents.a10,
            builtin: accents.a20,
            method: accents.a20,
        },
        constructor: {
            default: accents.a10,
        },
        keyword: {
            default: accents.a30!,
            import: accents.a40!,
            export: accents.a40!,
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
            default: primaries.m20,
            doc: primaries.m20,
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
            link: accents.a20,
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
