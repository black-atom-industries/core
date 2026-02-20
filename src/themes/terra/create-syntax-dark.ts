import type { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: palette.blue,
            builtin: palette.darkBlue,
            member: palette.darkBlue,
            parameter: palette.darkYellow,
        },
        property: {
            default: palette.darkBlue,
        },
        constant: {
            default: palette.darkYellow,
            builtin: palette.darkYellow,
        },
        module: {
            default: palette.darkBlue,
        },
        string: {
            default: palette.green,
            doc: palette.green,
            regexp: palette.darkYellow,
            escape: palette.red,
        },
        boolean: {
            default: palette.darkYellow,
        },
        number: {
            default: palette.darkYellow,
        },
        type: {
            default: palette.cyan,
            builtin: palette.darkCyan,
        },
        attribute: {
            default: palette.cyan,
            builtin: palette.cyan,
        },
        func: {
            default: palette.yellow,
            builtin: palette.yellow,
            method: palette.yellow,
        },
        constructor: {
            default: palette.yellow,
        },
        operator: {
            default: palette.magenta,
        },
        keyword: {
            default: palette.magenta,
            import: palette.red,
            export: palette.red,
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
                fg: primaries.l10,
                bg: primaries.d30,
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.yellow,
            attribute: palette.darkYellow,
            delimiter: palette.darkYellow,
        },
    };
}
