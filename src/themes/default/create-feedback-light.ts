import type { ThemeFeedbackColors } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

export default function (): ThemeFeedbackColors {
    return {
        negative: oklch(0.75, 0.25, 0),
        success: oklch(0.62, 0.25, 145),
        info: oklch(0.62, 0.25, 200),
        warning: oklch(0.75, 0.25, 65),
    };
}
