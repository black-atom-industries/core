import { Palette, Primaries, UI } from "../../types/theme.ts";

export default function (primaries: Primaries, palette: Palette): UI {
    return {
        bg: {
            default: primaries.d10,        // Pure black background
            panel: primaries.d20,          // Slightly lighter for contrast
            float: primaries.d20,          // Same as panel
            active: primaries.d30,         // Active line highlighting
            disabled: primaries.d40,       // Disabled elements
            hover: primaries.d30,          // Hover states
            selection: primaries.d40,      // Text selection
            search: primaries.d40,         // Search highlights
            contrast: primaries.l10,       // High contrast areas
            negative: palette.red,         // Error backgrounds
            warn: palette.yellow,          // Warning backgrounds
            info: palette.blue,            // Info backgrounds
            hint: palette.darkYellow,      // Hint backgrounds
            positive: palette.green,       // Success backgrounds
            add: palette.green,            // Addition highlights
            delete: palette.red,           // Deletion highlights
            modify: palette.blue,          // Modification highlights
        },
        fg: {
            default: primaries.l10,        // Main text (light gray)
            subtle: primaries.m30,         // Subdued text
            accent: primaries.l20,         // No color accent - just lighter gray
            disabled: primaries.m20,       // Disabled text
            contrast: primaries.d20,       // High contrast text
            negative: palette.red,         // Error text
            warn: palette.yellow,          // Warning text
            info: palette.blue,            // Info text
            hint: palette.darkYellow,      // Hint text
            positive: palette.green,       // Success text
            add: palette.green,            // Addition text
            delete: palette.red,           // Deletion text
            modify: palette.blue,          // Modification text
        },
    };
}