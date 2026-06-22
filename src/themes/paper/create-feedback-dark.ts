import type { ThemeAccentColors, ThemeFeedbackColors } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

export default function (_accents: ThemeAccentColors): ThemeFeedbackColors {
    return {
        negative: oklch(0.68, 0.13, 20),
        success: oklch(0.76, 0.09, 120),
        info: oklch(0.74, 0.07, 225),
        warning: oklch(0.78, 0.09, 80),
    };
}
