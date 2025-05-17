import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.l10,
            builtin: primaries.l10,
            member: primaries.m40,
            parameter: palette.darkYellow,
        },
        property: {
            default: primaries.m40,
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
                fg: primaries.l10,
                bg: primaries.d40,
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries.m30,
            delimiter: primaries.l10,
        },
    };
}
