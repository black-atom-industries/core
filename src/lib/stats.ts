import { wcagContrast } from "culori";
import { wcagGrade } from "./wcag.ts";
import type { ThemeDefinition } from "../types/theme.ts";

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

export function themeContrast(theme: ThemeDefinition): ThemeContrastResult {
    const ratio = wcagContrast(theme.ui.fg.default, theme.ui.bg.default);
    return { ratio, level: wcagGrade(ratio) };
}

export function collectionStats(themes: ThemeDefinition[]): CollectionStatsResult {
    const contrasts = themes.map((t) => themeContrast(t).ratio);
    return {
        themeCount: themes.length,
        darkCount: themes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: themes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.length ? contrasts.reduce((a, b) => a + b, 0) / contrasts.length : 0,
    };
}

export function orgStats(themes: ThemeDefinition[]): OrgStatsResult {
    const contrasts = themes.map((t) => themeContrast(t).ratio);
    const collectionCount = new Set(themes.map((t) => t.meta.collection.key)).size;
    return {
        themeCount: themes.length,
        collectionCount,
        darkCount: themes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: themes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.length ? contrasts.reduce((a, b) => a + b, 0) / contrasts.length : 0,
    };
}
