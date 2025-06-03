import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.d30,
            builtin: palette.darkBlue,
            parameter: primaries.d20,
            member: primaries.d30,
        },
        property: {
            default: primaries.d30,
        },
        constant: {
            default: primaries.d20,
            builtin: palette.darkBlue,
        },
        module: {
            default: palette.blue,
        },
        string: {
            default: palette.darkGreen,
            doc: palette.green,
            regexp: palette.darkCyan,
            escape: palette.cyan,
        },
        boolean: {
            default: palette.darkBlue,
        },
        number: {
            default: palette.darkMagenta,
        },
        type: {
            default: palette.darkCyan,
            builtin: palette.cyan,
        },
        attribute: {
            default: palette.cyan,
            builtin: palette.darkCyan,
        },
        func: {
            default: palette.darkBlue,
            builtin: palette.blue,
            method: palette.darkBlue,
        },
        constructor: {
            default: palette.darkBlue,
        },
        operator: {
            default: palette.darkCyan,
        },
        keyword: {
            default: palette.darkBlue,
            import: palette.blue,
            export: palette.blue,
        },
        punctuation: {
            default: primaries.m10,
            delimiter: primaries.m20,
            bracket: primaries.m10,
            special: palette.darkCyan,
        },
        comment: {
            default: primaries.m30,
            doc: primaries.m20,
            todo: palette.darkYellow,
            error: palette.darkRed,
            warn: palette.darkYellow,
            info: palette.darkBlue,
            hint: palette.darkCyan,
        },
        markup: {
            heading: {
                h1: palette.darkBlue,
                h2: palette.darkBlue,
                h3: palette.darkBlue,
                h4: primaries.d30,
                h5: primaries.d30,
                h6: primaries.d30,
            },
            list: {
                default: primaries.d30,
                checked: palette.darkGreen,
                unchecked: primaries.m10,
            },
            strong: palette.darkBlue,
            italic: palette.darkCyan,
            strikethrough: primaries.m20,
            quote: palette.green,
            math: palette.darkCyan,
            link: palette.darkCyan,
            code: {
                fg: primaries.d20,
                bg: primaries.l40,
            },
        },
        tag: {
            default: palette.darkBlue,
            builtin: palette.blue,
            attribute: palette.darkCyan,
            delimiter: primaries.m20,
        },
    };
}