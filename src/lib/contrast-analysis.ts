import type { WcagGrade } from "./wcag.ts";

/** A defined fg/bg key pairing that occurs in real UI. */
export interface PairingDef {
    fg: string;
    bg: string;
}

/** A category of intended pairings. */
export interface PairingCategory {
    name: string;
    pairs: PairingDef[];
}

/** Computed contrast result for a single pairing. */
export interface ContrastPair {
    fg: { key: string; color: string };
    bg: { key: string; color: string };
    ratio: number;
    level: WcagGrade;
}

/** Computed category with resolved contrast pairs. */
export interface ContrastCategory {
    name: string;
    pairs: ContrastPair[];
}

/** Full contrast analysis result for a theme. */
export interface ThemeContrastAnalysis {
    primary: ContrastPair;
    categories: ContrastCategory[];
    passRate: { aa: number; aaa: number };
    worstPair: ContrastPair;
}

/**
 * Global intended pairings config.
 * Defines which fg/bg combinations actually occur in real UI.
 * Exported so adapters/tools can reference it.
 */
export const INTENDED_PAIRINGS: PairingCategory[] = [
    {
        name: "Content on surfaces",
        pairs: [
            { fg: "fg.default", bg: "bg.default" },
            { fg: "fg.default", bg: "bg.panel" },
            { fg: "fg.default", bg: "bg.float" },
            { fg: "fg.subtle", bg: "bg.default" },
            { fg: "fg.subtle", bg: "bg.panel" },
            { fg: "fg.subtle", bg: "bg.float" },
            { fg: "fg.accent", bg: "bg.default" },
            { fg: "fg.accent", bg: "bg.panel" },
            { fg: "fg.accent", bg: "bg.float" },
            { fg: "fg.disabled", bg: "bg.default" },
        ],
    },
    {
        name: "Interactive states",
        pairs: [
            { fg: "fg.default", bg: "bg.active" },
            { fg: "fg.default", bg: "bg.hover" },
            { fg: "fg.default", bg: "bg.selection" },
            { fg: "fg.default", bg: "bg.search" },
        ],
    },
    {
        name: "Feedback",
        pairs: [
            { fg: "fg.negative", bg: "bg.negative" },
            { fg: "fg.warn", bg: "bg.warn" },
            { fg: "fg.positive", bg: "bg.positive" },
            { fg: "fg.info", bg: "bg.info" },
            { fg: "fg.hint", bg: "bg.hint" },
            { fg: "fg.negative", bg: "bg.default" },
            { fg: "fg.warn", bg: "bg.default" },
            { fg: "fg.positive", bg: "bg.default" },
            { fg: "fg.info", bg: "bg.default" },
            { fg: "fg.hint", bg: "bg.default" },
        ],
    },
    {
        name: "Diff",
        pairs: [
            { fg: "fg.add", bg: "bg.add" },
            { fg: "fg.delete", bg: "bg.delete" },
            { fg: "fg.modify", bg: "bg.modify" },
        ],
    },
    {
        name: "Contrast inversion",
        pairs: [
            { fg: "fg.contrast", bg: "bg.contrast" },
        ],
    },
];
