import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries[9],
            builtin: primaries[7],
            member: palette.blue,
            parameter: palette.darkYellow,
        },
        property: {
            default: palette.blue,
        },
        string: {
            default: palette.green,
            doc: palette.green,
            regexp: palette.red,
            escape: palette.red,
        },
        constant: {
            default: palette.darkBlue,
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
            default: palette.darkBlue,
        },
        punctuation: {
            default: palette.lightGray,
            delimiter: palette.darkBlue,
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
            strong: palette.yellow,
            italic: palette.yellow,
            strikethrough: palette.yellow,
            quote: palette.green,
            math: palette.darkGreen,
            link: palette.green,
            list: {
                default: palette.lightGray,
                checked: palette.green,
                unchecked: palette.lightGray,
            },
            code: {
                fg: palette.lightGray,
                bg: primaries[0],
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries[7],
            delimiter: primaries[8],
        },
    };
}
