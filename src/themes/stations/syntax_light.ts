import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.m10,
            builtin: primaries.d30,
            member: primaries.m10,
            parameter: palette.darkYellow,
        },
        property: {
            default: primaries.m10,
        },
        string: {
            default: palette.green,
            doc: palette.green,
            regexp: palette.red,
            escape: palette.red,
        },
        constant: {
            default: palette.gray,
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
            default: palette.gray,
            delimiter: primaries.m40,
            bracket: palette.gray,
            special: palette.gray,
        },
        comment: {
            default: primaries.m30,
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
                fg: primaries.m20,
                bg: primaries.l20,
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries.m10,
            delimiter: palette.darkGreen,
        },
    };
}
