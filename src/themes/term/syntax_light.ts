import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.d40, // Dark gray for variables
            builtin: primaries.d30, // Slightly darker for builtins
            member: primaries.m10, // Mid-dark gray for members
            parameter: primaries.d20, // Darker for parameters
        },
        property: {
            default: primaries.m10, // Mid-dark gray for properties
        },
        string: {
            default: primaries.d30, // Dark gray for strings
            doc: primaries.d40, // Dark for doc strings
            regexp: primaries.d10, // Darkest for regex
            escape: primaries.d10, // Darkest for escape sequences
        },
        constant: {
            default: primaries.d20, // Dark gray for constants
            builtin: primaries.d10, // Darkest for builtins
        },
        module: {
            default: primaries.d20, // Dark gray for modules
        },
        boolean: {
            default: primaries.m20, // Mid-gray for booleans
        },
        number: {
            default: primaries.d40, // Dark gray for numbers
        },
        type: {
            default: primaries.d10, // Darkest gray for types
            builtin: primaries.d10, // Same for builtin types
        },
        attribute: {
            default: primaries.m30, // Mid-gray for attributes
            builtin: primaries.m30, // Same for builtin attributes
        },
        func: {
            default: primaries.d20, // Dark gray for functions
            builtin: primaries.m30, // Mid for builtins
            method: primaries.d20, // Dark for methods
        },
        constructor: {
            default: primaries.d20, // Dark gray for constructors
        },
        keyword: {
            default: primaries.d30, // Dark gray for keywords
            import: primaries.d10, // Darkest for import
            export: primaries.d20, // Dark for export
        },
        operator: {
            default: primaries.d20, // Dark gray for operators
        },
        punctuation: {
            default: primaries.d40, // Dark gray for punctuation
            delimiter: primaries.d40, // Same for delimiters
            bracket: primaries.d40, // Same for brackets
            special: primaries.d40, // Same for special punctuation
        },
        comment: {
            default: primaries.m20, // Mid-gray for comments
            doc: primaries.m30, // Mid for doc comments
            todo: primaries.d30, // Dark for todos (no green)
            error: primaries.d10, // Darkest for errors (no red)
            warn: primaries.d20, // Dark for warnings (no yellow)
            info: primaries.d30, // Dark for info (no blue)
            hint: primaries.m30, // Mid for hints
        },
        markup: {
            heading: {
                h1: primaries.d10, // Darkest for main headings
                h2: primaries.d20, // Dark for sub headings
                h3: primaries.d30, // Medium-dark for h3
                h4: primaries.m10, // Mid-dark for h4
                h5: primaries.m20, // Mid for h5
                h6: primaries.m30, // Mid-light for h6
            },
            list: {
                default: primaries.m20, // Mid-gray for lists
                checked: primaries.d30, // Dark for checked (no green)
                unchecked: primaries.m20, // Mid for unchecked
            },
            strong: primaries.d20, // Dark for bold
            italic: primaries.d30, // Dark for italic
            strikethrough: primaries.m30, // Mid for strikethrough
            quote: primaries.d40, // Dark for quotes (no green)
            math: primaries.d30, // Dark for math (no color)
            link: primaries.d20, // Dark for links (no green)
            code: {
                fg: primaries.d40, // Dark text
                bg: primaries.l20, // Light background
            },
        },
        tag: {
            default: primaries.d20, // Dark for tags
            builtin: primaries.m30, // Mid for builtin tags
            attribute: primaries.m10, // Mid-dark for attributes
            delimiter: primaries.d40, // Dark for delimiters
        },
    };
}
