import type { ThemeFeedbackColors, ThemePaletteColors } from "../../types/theme.ts";

export default function (palette: ThemePaletteColors): ThemeFeedbackColors {
    return {
        negative: palette.red,
        success: palette.green,
        info: palette.blue,
        warning: palette.yellow,
    };
}
