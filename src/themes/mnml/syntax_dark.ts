import { Accents, Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette, accents: Accents): Syntax {
    return {
        variable: {
            default: primaries.l10,
            builtin: primaries.l10,
            member: accents.a20,
            parameter: accents.a10,
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
            default: palette.blue,
        },
        boolean: {
            default: palette.gray,
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
            default: primaries.l20,
            import: palette.red,
            export: palette.darkRed,
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
            default: palette.gray,
            doc: primaries.m20,
            todo: palette.green,
            error: palette.red,
            warn: accents.a10,
            info: palette.blue,
            hint: accents.a20,
        },
        markup: {
            heading: {
                h1: accents.a10,
                h2: accents.a10,
                h3: accents.a10,
                h4: palette.gray,
                h5: palette.gray,
                h6: palette.gray,
            },
            list: {
                default: palette.gray,
                checked: palette.green,
                unchecked: palette.gray,
            },
            strong: accents.a10,
            italic: accents.a10,
            strikethrough: accents.a10,
            quote: palette.green,
            math: palette.darkGreen,
            link: palette.green,
            code: {
                fg: primaries.l10,
                bg: primaries.d40,
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
