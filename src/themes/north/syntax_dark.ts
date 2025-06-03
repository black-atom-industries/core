import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.l10,
            builtin: palette.blue,
            parameter: primaries.l20,
            member: primaries.l10,
        },
        property: {
            default: primaries.l10,
        },
        constant: {
            default: primaries.l20,
            builtin: palette.blue,
        },
        module: {
            default: palette.darkBlue,
        },
        string: {
            default: palette.green,
            doc: palette.darkGreen,
            regexp: palette.cyan,
            escape: palette.darkCyan,
        },
        boolean: {
            default: palette.blue,
        },
        number: {
            default: palette.magenta,
        },
        type: {
            default: palette.cyan,
            builtin: palette.darkCyan,
        },
        attribute: {
            default: palette.darkCyan,
            builtin: palette.cyan,
        },
        func: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            method: palette.darkYellow,
        },
        constructor: {
            default: palette.blue,
        },
        operator: {
            default: palette.cyan,
        },
        keyword: {
            default: palette.blue,
            import: palette.darkBlue,
            export: palette.darkBlue,
        },
        punctuation: {
            default: primaries.m30,
            delimiter: primaries.m20,
            bracket: primaries.m30,
            special: palette.cyan,
        },
        comment: {
            default: primaries.m20,
            doc: primaries.m30,
            todo: palette.yellow,
            error: palette.red,
            warn: palette.yellow,
            info: palette.blue,
            hint: palette.cyan,
        },
        markup: {
            heading: {
                h1: palette.blue,
                h2: palette.blue,
                h3: palette.blue,
                h4: primaries.l10,
                h5: primaries.l10,
                h6: primaries.l10,
            },
            list: {
                default: primaries.l10,
                checked: palette.green,
                unchecked: primaries.m30,
            },
            strong: palette.blue,
            italic: palette.cyan,
            strikethrough: primaries.m20,
            quote: palette.darkGreen,
            math: palette.cyan,
            link: palette.cyan,
            code: {
                fg: primaries.l20,
                bg: primaries.d10,
            },
        },
        tag: {
            default: palette.blue,
            builtin: palette.darkBlue,
            attribute: palette.cyan,
            delimiter: primaries.m20,
        },
    };
}

