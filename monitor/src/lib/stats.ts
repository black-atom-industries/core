import { contrastRatio, wcagGrade } from "@core/lib/contrast.ts";

type ThemeForStats = {
    meta: { appearance: "dark" | "light" };
    ui: { fg: { default: string }; bg: { default: string } };
};

type ThemeForOrgStats = {
    meta: { appearance: "dark" | "light" };
    contrast: { ratio: number };
};

type CollectionForStats = {
    collection: string;
    themes: ThemeForStats[];
};

type CollectionForOrgStats = {
    collection: string;
    themes: ThemeForOrgStats[];
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

export function orgStats(collections: CollectionForOrgStats[]): OrgStatsResult {
    const allThemes = collections.flatMap((c) => c.themes);
    const contrasts = allThemes.map((t) => t.contrast.ratio);
    return {
        themeCount: allThemes.length,
        collectionCount: collections.length,
        darkCount: allThemes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: allThemes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.reduce((a, b) => a + b, 0) / contrasts.length,
    };
}
