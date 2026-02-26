import type { ThemeAccentColors, ThemeFeedbackColors } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

export default function (_accents: ThemeAccentColors): ThemeFeedbackColors {
    return {
        negative: oklch(0.65, 0.20, 25),
        success: oklch(0.65, 0.20, 120),
        info: oklch(0.65, 0.20, 225),
        warning: oklch(0.65, 0.20, 80),
    };
}
