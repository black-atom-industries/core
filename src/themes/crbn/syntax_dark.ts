import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.m20,
            builtin: primaries.m20,
            member: primaries.m10,
            parameter: palette.darkYellow,
        },
        property: {
            default: primaries.m30,
        },
        string: {
            default: primaries.m10,
            doc: primaries.d40,
            regexp: primaries.l10,
            escape: primaries.l10,
        },
        constant: {
            default: primaries.m20,
            builtin: primaries.m30,
        },
        module: {
            default: palette.yellow,
        },
        boolean: {
            default: palette.gray,
        },
        number: {
            default: primaries.m20,
        },
        type: {
            default: primaries.l10,
            builtin: primaries.m30,
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
            default: primaries.m40,
            import: primaries.m20,
            export: primaries.m20,
        },
        operator: {
            default: palette.white,
        },
        punctuation: {
            default: palette.white,
            delimiter: palette.white,
            bracket: palette.white,
            special: palette.white,
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
                fg: primaries.m30,
                bg: primaries.d20,
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries.m10,
            delimiter: primaries.m10,
        },
    };
}
