import { Accents, Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette, accents: Accents): Syntax {
    return {
        variable: {
            default: primaries.d40,
            builtin: primaries.d40,
            member: accents.a20,
            parameter: accents.a10,
        },
        property: {
            default: accents.a20,
        },
        string: {
            default: primaries.d30,
            doc: primaries.d40,
            regexp: primaries.d10,
            escape: primaries.d10,
        },
        constant: {
            default: primaries.d20,
            builtin: primaries.d10,
        },
        module: {
            default: palette.blue,
        },
        boolean: {
            default: palette.gray,
        },
        number: {
            default: primaries.d40,
        },
        type: {
            default: primaries.d10,
            builtin: primaries.d40,
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
            default: primaries.d30,
            import: palette.red,
            export: palette.darkRed,
        },
        operator: {
            default: primaries.d20,
        },
        punctuation: {
            default: primaries.d40,
            delimiter: primaries.d40,
            bracket: primaries.d40,
            special: primaries.d40,
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
                fg: primaries.d40,
                bg: primaries.l20,
            },
        },
        tag: {
            default: accents.a10,
            builtin: accents.a20,
            attribute: primaries.m10,
            delimiter: primaries.d40,
        },
    };
}
