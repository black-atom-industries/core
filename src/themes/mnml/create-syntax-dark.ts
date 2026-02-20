import type * as Theme from "../../types/theme.ts";

export default function (
    primaries: Theme.Primaries,
    feedback: Theme.Feedback,
    accents: Theme.Accents,
): Theme.Syntax {
    return {
        variable: {
            default: primaries.l20,
            builtin: primaries.l10,
            member: accents.a20,
            parameter: accents.a20,
        },
        property: {
            default: accents.a20,
        },
        string: {
            default: primaries.l20,
            doc: primaries.l10,
            regexp: primaries.l40,
            escape: primaries.l40,
        },
        constant: {
            default: primaries.l10,
            builtin: primaries.l20,
        },
        module: {
            default: primaries.l20,
        },
        boolean: {
            default: primaries.m40,
        },
        number: {
            default: primaries.l10,
        },
        type: {
            default: primaries.l40,
            builtin: primaries.l40,
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
            default: primaries.l30,
            import: primaries.l40,
            export: primaries.l40,
        },
        operator: {
            default: primaries.l30,
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
                h4: primaries.m40,
                h5: primaries.m40,
                h6: primaries.m40,
            },
            list: {
                default: primaries.m40,
                checked: feedback.success,
                unchecked: primaries.m40,
            },
            strong: accents.a10,
            italic: accents.a10,
            strikethrough: accents.a10,
            quote: primaries.m20,
            math: primaries.m20,
            link: accents.a20,
            code: {
                fg: primaries.l10,
                bg: primaries.d10,
            },
        },
        tag: {
            default: accents.a10,
            builtin: accents.a20,
            attribute: primaries.m30,
            delimiter: primaries.l10,
        },
    };
}
