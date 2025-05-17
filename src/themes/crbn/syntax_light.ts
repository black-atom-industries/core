import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.d40,
            builtin: primaries.d40,
            member: primaries.m10,
            parameter: palette.darkYellow,
        },
        property: {
            default: primaries.m10,
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
            default: palette.darkYellow,
            builtin: palette.darkYellow,
        },
        func: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            method: palette.yellow,
        },
        constructor: {
            default: palette.yellow,
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
            warn: palette.yellow,
            info: palette.blue,
            hint: palette.darkYellow,
        },
        markup: {
            heading: {
                h1: palette.yellow,
                h2: palette.yellow,
                h3: palette.yellow,
                h4: palette.gray,
                h5: palette.gray,
                h6: palette.gray,
            },
            list: {
                default: palette.gray,
                checked: palette.green,
                unchecked: palette.gray,
            },
            strong: palette.yellow,
            italic: palette.yellow,
            strikethrough: palette.yellow,
            quote: palette.green,
            math: palette.darkGreen,
            link: palette.green,
            code: {
                fg: primaries.d40,
                bg: primaries.l20,
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries.m10,
            delimiter: primaries.d40,
        },
    };
}
