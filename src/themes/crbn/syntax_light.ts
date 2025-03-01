import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries[1],
            builtin: primaries[1],
            member: primaries[2],
            parameter: palette.darkYellow,
        },
        property: {
            default: primaries[2],
        },
        string: {
            default: primaries[3],
            doc: primaries[5],
            regexp: primaries[0],
            escape: primaries[0],
        },
        constant: {
            default: primaries[0],
            builtin: primaries[0],
        },
        module: {
            default: palette.blue,
        },
        boolean: {
            default: palette.gray,
        },
        number: {
            default: primaries[3],
        },
        type: {
            default: primaries[0],
            builtin: primaries[2],
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
            default: primaries[2],
            import: primaries[4],
            export: primaries[4],
        },
        operator: {
            default: palette.black,
        },
        punctuation: {
            default: palette.black,
            delimiter: palette.black,
            bracket: palette.black,
            special: palette.black,
        },
        comment: {
            default: palette.gray,
            doc: primaries[4],
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
                fg: primaries[5],
                bg: primaries[9],
            },
        },
        tag: {
            default: palette.yellow,
            builtin: palette.darkYellow,
            attribute: primaries[4],
            delimiter: primaries[3],
        },
    };
}
