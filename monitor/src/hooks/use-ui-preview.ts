import { useTheme } from "../queries/themes";
import { themeContrast } from "@core/lib/stats.ts";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";

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

export function useUiPreview(themeKey: ThemeKey): {
    data: UiPreviewData | null;
    isLoading: boolean;
} {
    const { data: theme, isLoading } = useTheme(themeKey);

    if (!theme) {
        return { data: null, isLoading };
    }

    const contrast = themeContrast(theme);

    return {
        data: {
            theme,
            contrast: { ratio: contrast.ratio, grade: contrast.level },
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
