import { Feedback } from "../../types/theme.ts";
import { oklch } from "../../utils/color.ts";

const feedback: Feedback = {
    negative: oklch(0.50, 0.25, 5),
    success: oklch(0.50, 0.25, 150),
    info: oklch(0.50, 0.25, 200),
    warning: oklch(0.50, 0.25, 65),
};

export default feedback;
