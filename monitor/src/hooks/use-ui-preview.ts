import { useTheme } from "./use-theme";
import { contrastRatio, wcagGrade } from "@core/lib/contrast.ts";
import type { ThemeDefinition } from "@core/types/theme.ts";

export interface ContrastData {
    ratio: number;
    grade: "AAA" | "AA" | "fail";
}

export interface UiPreviewData {
    theme: ThemeDefinition;
    contrast: ContrastData;
    paletteColors: string[];
    darkestPrimary: string;
    lightestPrimary: string;
    notificationColors: { success: string; warning: string; error: string; info: string };
}

export function useUiPreview(themeKey: string): {
    data: UiPreviewData | null;
    isLoading: boolean;
} {
    // themeKey may be '' on first render before auto-select fires
    const { data: theme, isLoading } = useTheme(themeKey || null);

    if (!theme) {
        // treat empty key as loading so the UI shows a spinner, not a permanent blank
        return { data: null, isLoading: isLoading || !themeKey };
    }

    const ratio = contrastRatio(theme.ui.fg.default, theme.ui.bg.default);

    return {
        data: {
            theme,
            contrast: { ratio, grade: wcagGrade(ratio) },
            paletteColors: Object.values(theme.palette),
            darkestPrimary: theme.primaries.d10,
            lightestPrimary: theme.primaries.l40,
            notificationColors: {
                success: theme.palette.green,
                warning: theme.palette.yellow,
                error: theme.palette.red,
                info: theme.palette.blue,
            },
        },
        isLoading: false,
    };
}
