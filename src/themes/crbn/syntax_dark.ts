import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries[5],
            builtin: primaries[5],
            member: primaries[4],
            parameter: palette.darkYellow,
        },
        property: {
            default: primaries[6],
        },
        string: {
            default: primaries[4],
            doc: primaries[3],
            regexp: primaries[8],
            escape: primaries[8],
        },
        constant: {
            default: primaries[5],
            builtin: primaries[6],
        },
        module: {
            default: palette.yellow,
        },
        boolean: {
            default: palette.gray,
        },
        number: {
            default: primaries[5],
        },
        type: {
            default: primaries[8],
            builtin: primaries[6],
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
            default: primaries[7],
            import: primaries[5],
            export: primaries[5],
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
            doc: primaries[5],
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
                fg: primaries[6],
                bg: primaries[1],
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries[4],
            delimiter: primaries[4],
        },
    };
}
