import type { Feedback } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

const feedback: Feedback = {
    negative: oklch(0.70, 0.15, 5),
    success: oklch(0.70, 0.15, 150),
    info: oklch(0.70, 0.15, 200),
    warning: oklch(0.70, 0.15, 65),
};

export default feedback;
