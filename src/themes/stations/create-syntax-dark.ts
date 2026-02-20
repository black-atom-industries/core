import type { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: palette.blue,
            builtin: palette.blue,
            member: palette.darkBlue,
            parameter: palette.darkYellow,
        },
        property: {
            default: palette.darkBlue,
        },
        string: {
            default: palette.green,
            doc: palette.green,
            regexp: palette.red,
            escape: palette.red,
        },
        constant: {
            default: primaries.l20,
            builtin: palette.darkRed,
        },
        module: {
            default: palette.darkBlue,
        },
        boolean: {
            default: palette.darkGreen,
        },
        number: {
            default: palette.darkGreen,
        },
        type: {
            default: palette.cyan,
            builtin: palette.darkCyan,
        },
        attribute: {
            default: palette.darkYellow,
            builtin: palette.darkYellow,
        },
        func: {
            default: palette.yellow,
            builtin: palette.yellow,
            method: palette.yellow,
        },
        constructor: {
            default: palette.yellow,
        },
        keyword: {
            default: palette.magenta,
            import: palette.red,
            export: palette.red,
        },
        operator: {
            default: palette.magenta,
        },
        punctuation: {
            default: palette.lightGray,
            delimiter: primaries.m40,
            bracket: palette.lightGray,
            special: palette.lightGray,
        },
        comment: {
            default: palette.gray,
            doc: palette.darkGreen,
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
                h4: palette.lightGray,
                h5: palette.lightGray,
                h6: palette.lightGray,
            },
            list: {
                default: palette.lightGray,
                checked: palette.green,
                unchecked: palette.lightGray,
            },
            strong: palette.yellow,
            italic: palette.yellow,
            strikethrough: palette.yellow,
            quote: palette.green,
            math: palette.darkGreen,
            link: palette.green,
            code: {
                fg: palette.gray,
                bg: palette.black,
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries.m40,
            delimiter: primaries.l10,
        },
    };
}
