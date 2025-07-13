import { Palette, Primaries, Syntax } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): Syntax {
    return {
        variable: {
            default: primaries.l10,        // Light gray for variables
            builtin: primaries.l20,        // Slightly lighter for builtins
            member: primaries.m40,         // Mid-gray for members
            parameter: primaries.l30,      // Lighter for parameters
        },
        property: {
            default: primaries.m40,        // Mid-gray for properties
        },
        string: {
            default: primaries.l20,        // Light gray for strings
            doc: primaries.l10,            // Standard light for doc strings
            regexp: primaries.l40,         // Lighter for regex
            escape: primaries.l40,         // Lighter for escape sequences
        },
        constant: {
            default: primaries.l10,        // Light gray for constants
            builtin: primaries.l20,        // Slightly lighter for builtins
        },
        module: {
            default: primaries.l30,        // Light gray for modules
        },
        boolean: {
            default: primaries.m30,        // Mid-gray for booleans
        },
        number: {
            default: primaries.l10,        // Light gray for numbers
        },
        type: {
            default: primaries.l40,        // Lightest gray for types
            builtin: primaries.l40,        // Same for builtin types
        },
        attribute: {
            default: primaries.m20,        // Mid-dark gray for attributes
            builtin: primaries.m20,        // Same for builtin attributes
        },
        func: {
            default: primaries.l30,        // Light gray for functions
            builtin: primaries.m20,        // Mid-dark for builtins
            method: primaries.l30,         // Light for methods
        },
        constructor: {
            default: primaries.l30,        // Light gray for constructors
        },
        keyword: {
            default: primaries.l20,        // Light gray for keywords
            import: primaries.l40,         // Lighter for import
            export: primaries.l30,         // Light for export
        },
        operator: {
            default: primaries.l30,        // Light gray for operators
        },
        punctuation: {
            default: primaries.l10,        // Light gray for punctuation
            delimiter: primaries.l10,      // Same for delimiters
            bracket: primaries.l10,        // Same for brackets
            special: primaries.l10,        // Same for special punctuation
        },
        comment: {
            default: primaries.m30,        // Mid-gray for comments
            doc: primaries.m20,            // Mid-dark for doc comments
            todo: primaries.l20,           // Light for todos (no green)
            error: primaries.l40,          // Lighter for errors (no red)
            warn: primaries.l30,           // Light for warnings (no yellow)
            info: primaries.l20,           // Light for info (no blue)
            hint: primaries.m20,           // Mid-dark for hints
        },
        markup: {
            heading: {
                h1: primaries.l40,         // Lightest for main headings
                h2: primaries.l30,         // Light for sub headings
                h3: primaries.l20,         // Medium-light for h3
                h4: primaries.m40,         // Mid-gray for h4
                h5: primaries.m30,         // Mid for h5
                h6: primaries.m20,         // Mid-dark for h6
            },
            list: {
                default: primaries.m30,    // Mid-gray for lists
                checked: primaries.l20,    // Light for checked (no green)
                unchecked: primaries.m30,  // Mid for unchecked
            },
            strong: primaries.l30,         // Light for bold
            italic: primaries.l20,         // Light for italic
            strikethrough: primaries.m20,  // Mid-dark for strikethrough
            quote: primaries.l10,          // Light for quotes (no green)
            math: primaries.l20,           // Light for math (no color)
            link: primaries.l30,           // Light for links (no green)
            code: {
                fg: primaries.l10,         // Light text
                bg: primaries.d40,         // Dark background
            },
        },
        tag: {
            default: primaries.l30,        // Light for tags
            builtin: primaries.m20,        // Mid-dark for builtin tags
            attribute: primaries.m30,      // Mid for attributes
            delimiter: primaries.l10,      // Light for delimiters
        },
    };
}