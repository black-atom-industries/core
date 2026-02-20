import type * as Theme from "../../types/theme.ts";
import type { Feedback } from "../../types/theme.ts";

/**
 * Default collection dark syntax - minimal grayscale with 2 accents
 * a10 = teal (primary accent for strings, keywords, functions)
 * a20 = purple (secondary accent for properties, parameters)
 */
export default function (
    primaries: Theme.Primaries,
    feedback: Feedback,
    accents: Theme.Accents,
): Theme.Syntax {
    return {
        variable: {
            default: primaries.l10,
            builtin: primaries.l10,
            member: primaries.m30,
            parameter: accents.a40 ?? accents.a20,
        },
        property: {
            default: primaries.m30,
        },
        string: {
            default: accents.a20,
            doc: accents.a20,
            regexp: primaries.l30,
            escape: primaries.l30,
        },
        constant: {
            default: primaries.l10,
            builtin: primaries.l20,
        },
        module: {
            default: primaries.l20,
        },
        boolean: {
            default: primaries.l10,
        },
        number: {
            default: primaries.l10,
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
            default: primaries.l20,
        },
        punctuation: {
            default: primaries.l10,
            delimiter: primaries.l10,
            bracket: primaries.l10,
            special: primaries.l10,
        },
        comment: {
            default: primaries.m30,
            doc: primaries.m30,
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
            link: accents.a20,
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
