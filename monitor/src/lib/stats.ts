import { contrastRatio, wcagGrade } from "@core/lib/contrast.ts";

type ThemeForStats = {
    meta: { appearance: "dark" | "light"; collection: { key: string } };
    ui: { fg: { default: string }; bg: { default: string } };
};

export interface ThemeContrastResult {
    ratio: number;
    level: "AAA" | "AA" | "fail";
}

export interface CollectionStatsResult {
    themeCount: number;
    darkCount: number;
    lightCount: number;
    avgContrast: number;
}

export interface OrgStatsResult {
    themeCount: number;
    collectionCount: number;
    darkCount: number;
    lightCount: number;
    avgContrast: number;
}

export function themeContrast(theme: ThemeForStats): ThemeContrastResult {
    const ratio = contrastRatio(theme.ui.fg.default, theme.ui.bg.default);
    return { ratio, level: wcagGrade(ratio) };
}

export function collectionStats(themes: ThemeForStats[]): CollectionStatsResult {
    const contrasts = themes.map((t) => themeContrast(t).ratio);
    return {
        themeCount: themes.length,
        darkCount: themes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: themes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.reduce((a, b) => a + b, 0) / contrasts.length,
    };
}

export function orgStats(themes: ThemeForStats[]): OrgStatsResult {
    const contrasts = themes.map((t) => themeContrast(t).ratio);
    const collectionCount = new Set(themes.map((t) => t.meta.collection.key)).size;
    return {
        themeCount: themes.length,
        collectionCount,
        darkCount: themes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: themes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.reduce((a, b) => a + b, 0) / contrasts.length,
    };
}
