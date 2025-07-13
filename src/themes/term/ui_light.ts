import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    return {
        bg: {
            default: primaries.l40, // Pure white background
            panel: primaries.l30, // Slightly darker for contrast
            float: primaries.l30, // Same as panel
            active: primaries.l10, // Active line highlighting
            disabled: primaries.m20, // Disabled elements
            hover: primaries.l10, // Hover states
            selection: primaries.l10, // Text selection
            search: primaries.l10, // Search highlights
            contrast: primaries.d20, // High contrast areas
            negative: palette.red, // Error backgrounds
            warn: palette.yellow, // Warning backgrounds
            info: palette.blue, // Info backgrounds
            hint: palette.darkYellow, // Hint backgrounds
            positive: palette.green, // Success backgrounds
            add: palette.green, // Addition highlights
            delete: palette.red, // Deletion highlights
            modify: palette.blue, // Modification highlights
        },
        fg: {
            default: primaries.d20, // Main text (dark gray)
            subtle: primaries.d40, // Subdued text
            accent: primaries.d10, // No color accent - just darker gray
            disabled: primaries.m20, // Disabled text
            contrast: primaries.l20, // High contrast text
            negative: palette.red, // Error text
            warn: palette.yellow, // Warning text
            info: palette.blue, // Info text
            hint: palette.darkYellow, // Hint text
            positive: palette.green, // Success text
            add: palette.green, // Addition text
            delete: palette.red, // Deletion text
            modify: palette.blue, // Modification text
        },
    };
}
