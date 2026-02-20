import { formatHex, oklch as toOklch } from "culori";
import type { HexColor } from "../types/theme.ts";

/**
 * Represents a color extracted from an image
 */
export interface ExtractedColor {
    hex: HexColor;
    oklch: { l: number; c: number; h: number };
    pixelCount: number;
    percentage: number;
}

/**
 * Represents a palette suggestion with color harmony
 */
export interface PaletteSuggestion {
    name: string;
    description: string;
    accent: { l: number; c: number; h: number };
    primaries: {
        hue: number;
        chromaRange: [number, number];
        reasoning: string;
    };
    harmony: {
        type: "complementary" | "analogous" | "triadic";
        colors: Array<{ l: number; c: number; h: number }>;
    };
}

/**
 * Result of palette extraction from an image
 */
export interface PaletteExtractionResult {
    dominantColors: ExtractedColor[];
    suggestions: PaletteSuggestion[];
    metadata: {
        totalPixels: number;
        uniqueColors: number;
        avgLightness: number;
        avgChroma: number;
        suggestedAppearance: "dark" | "light" | "both";
    };
}

/**
 * Options for palette extraction
 */
export interface PaletteExtractionOptions {
    imagePath: string;
    numColors?: number;
    appearance?: "dark" | "light" | "auto";
}

/**
 * Adjustments to apply to a palette suggestion
 */
export interface PaletteAdjustments {
    hueShift?: number;
    chromaMultiplier?: number;
    lightnessShift?: number;
}

/**
 * Extracts dominant colors from an image using ImageMagick
 */
async function extractDominantColors(
    imagePath: string,
    numColors: number,
): Promise<ExtractedColor[]> {
    const command = new Deno.Command("magick", {
        args: [
            imagePath,
            "-resize",
            "400x400",
            "-colors",
            numColors.toString(),
            "-unique-colors",
            "-format",
            "%c",
            "histogram:info:-",
        ],
        stdout: "piped",
        stderr: "piped",
    });

    const { stdout, stderr, code } = await command.output();

    if (code !== 0) {
        const errorText = new TextDecoder().decode(stderr);
        throw new Error(`ImageMagick failed: ${errorText}`);
    }

    const output = new TextDecoder().decode(stdout);
    return parseHistogramOutput(output);
}

/**
 * Parses ImageMagick histogram output to extract colors
 */
function parseHistogramOutput(output: string): ExtractedColor[] {
    const colorRegex = /^\s*(\d+):\s*\([^)]+\)\s+(#[0-9A-Fa-f]{6})/gm;
    const colors: ExtractedColor[] = [];
    let totalPixels = 0;
    let match;

    while ((match = colorRegex.exec(output)) !== null) {
        const pixelCount = parseInt(match[1], 10);
        const hex = match[2].toUpperCase() as HexColor;
        const oklchColor = toOklch(hex);

        if (oklchColor) {
            colors.push({
                hex,
                oklch: {
                    l: oklchColor.l,
                    c: oklchColor.c ?? 0,
                    h: oklchColor.h ?? 0,
                },
                pixelCount,
                percentage: 0,
            });
            totalPixels += pixelCount;
        }
    }

    colors.forEach((c) => {
        c.percentage = (c.pixelCount / totalPixels) * 100;
    });

    return colors.sort((a, b) => b.pixelCount - a.pixelCount);
}

/**
 * Normalizes hue to 0-359 range
 */
function normalizeHue(hue: number): number {
    while (hue < 0) hue += 360;
    while (hue >= 360) hue -= 360;
    return hue;
}

/**
 * Generates complementary color (180° opposite)
 */
function getComplementary(
    color: { l: number; c: number; h: number },
): { l: number; c: number; h: number } {
    return {
        l: color.l,
        c: color.c,
        h: normalizeHue(color.h + 180),
    };
}

/**
 * Generates analogous colors (±30°)
 */
function getAnalogous(
    color: { l: number; c: number; h: number },
): Array<{ l: number; c: number; h: number }> {
    return [
        { l: color.l, c: color.c, h: normalizeHue(color.h - 30) },
        color,
        { l: color.l, c: color.c, h: normalizeHue(color.h + 30) },
    ];
}

/**
 * Generates triadic colors (120° apart)
 */
function _getTriadic(
    color: { l: number; c: number; h: number },
): Array<{ l: number; c: number; h: number }> {
    return [
        color,
        { l: color.l, c: color.c, h: normalizeHue(color.h + 120) },
        { l: color.l, c: color.c, h: normalizeHue(color.h + 240) },
    ];
}

/**
 * Analyzes extracted colors and generates palette suggestions
 */
function analyzePalette(
    colors: ExtractedColor[],
    appearance: "dark" | "light" | "auto",
): PaletteExtractionResult {
    const totalPixels = colors.reduce((sum, c) => sum + c.pixelCount, 0);
    const avgLightness = colors.reduce((sum, c) => sum + c.oklch.l * c.pixelCount, 0) / totalPixels;
    const avgChroma = colors.reduce((sum, c) => sum + c.oklch.c * c.pixelCount, 0) /
        totalPixels;

    let suggestedAppearance: "dark" | "light" | "both";
    if (appearance === "auto") {
        if (avgLightness < 0.4) suggestedAppearance = "dark";
        else if (avgLightness > 0.7) suggestedAppearance = "light";
        else suggestedAppearance = "both";
    } else {
        suggestedAppearance = appearance;
    }

    const vibrantColors = colors.filter((c) => c.oklch.c > 0.08).sort((a, b) =>
        b.oklch.c - a.oklch.c
    );
    const mostVibrant = vibrantColors[0] || colors[0];
    const mostCommon = colors[0];

    const suggestions: PaletteSuggestion[] = [];

    suggestions.push({
        name: "Vibrant Accent",
        description: "Uses the most saturated color as primary accent",
        accent: mostVibrant.oklch,
        primaries: {
            hue: Math.round(mostVibrant.oklch.h),
            chromaRange: [0.015, 0.055],
            reasoning: "Low-chroma primaries with vibrant accent for subtle, professional feel",
        },
        harmony: {
            type: "complementary",
            colors: [mostVibrant.oklch, getComplementary(mostVibrant.oklch)],
        },
    });

    suggestions.push({
        name: "Analogous Harmony",
        description: "Uses adjacent colors for cohesive feel",
        accent: mostVibrant.oklch,
        primaries: {
            hue: Math.round(mostVibrant.oklch.h),
            chromaRange: [0.02, 0.06],
            reasoning: "Harmonious colors create gentle variation",
        },
        harmony: {
            type: "analogous",
            colors: getAnalogous(mostVibrant.oklch),
        },
    });

    suggestions.push({
        name: "Dominant Base",
        description: "Uses most common color as foundation",
        accent: mostCommon.oklch.c > 0.05 ? mostCommon.oklch : mostVibrant.oklch,
        primaries: {
            hue: Math.round(mostCommon.oklch.h),
            chromaRange: [0.01, 0.04],
            reasoning: "Understated, professional feel based on image's natural palette",
        },
        harmony: {
            type: "complementary",
            colors: [mostCommon.oklch, getComplementary(mostCommon.oklch)],
        },
    });

    return {
        dominantColors: colors,
        suggestions,
        metadata: {
            totalPixels,
            uniqueColors: colors.length,
            avgLightness,
            avgChroma,
            suggestedAppearance,
        },
    };
}

/**
 * Extracts color palette from an image
 */
export async function extractPaletteFromImage(
    options: PaletteExtractionOptions,
): Promise<PaletteExtractionResult> {
    const { imagePath, numColors = 10, appearance = "auto" } = options;

    try {
        await Deno.stat(imagePath);
    } catch {
        throw new Error(`Image not found: ${imagePath}`);
    }

    const colors = await extractDominantColors(imagePath, numColors);

    if (colors.length === 0) {
        throw new Error(
            "No colors could be extracted from the image. The image may be corrupted or in an unsupported format.",
        );
    }

    return analyzePalette(colors, appearance);
}

/**
 * Adjusts a palette suggestion with user-provided adjustments
 */
export function adjustPaletteSuggestion(
    suggestion: PaletteSuggestion,
    adjustments: PaletteAdjustments,
): PaletteSuggestion {
    const { hueShift = 0, chromaMultiplier = 1, lightnessShift = 0 } = adjustments;

    const adjustColor = (color: { l: number; c: number; h: number }) => ({
        l: Math.max(0, Math.min(1, color.l + lightnessShift)),
        c: Math.max(0, color.c * chromaMultiplier),
        h: normalizeHue(color.h + hueShift),
    });

    return {
        ...suggestion,
        accent: adjustColor(suggestion.accent),
        primaries: {
            ...suggestion.primaries,
            hue: normalizeHue(suggestion.primaries.hue + hueShift),
            chromaRange: [
                suggestion.primaries.chromaRange[0] * chromaMultiplier,
                suggestion.primaries.chromaRange[1] * chromaMultiplier,
            ],
        },
        harmony: {
            ...suggestion.harmony,
            colors: suggestion.harmony.colors.map(adjustColor),
        },
    };
}

/**
 * Generates TypeScript code for primaries from a palette suggestion
 */
export function generatePrimariesFromSuggestion(
    suggestion: PaletteSuggestion,
    appearance: "dark" | "light",
): string {
    const { hue, chromaRange } = suggestion.primaries;
    const [minChroma, maxChroma] = chromaRange;

    const lightnessRanges = appearance === "dark"
        ? {
            d: [0.199, 0.225, 0.252, 0.288],
            m: [0.450, 0.550, 0.650, 0.750],
            l: [0.835, 0.885, 0.935, 0.985],
        }
        : {
            d: [0.985, 0.935, 0.885, 0.835],
            m: [0.750, 0.650, 0.550, 0.450],
            l: [0.288, 0.252, 0.225, 0.199],
        };

    const chromaProgression = (index: number, total: number) => {
        const progress = index / (total - 1);
        return minChroma + (maxChroma - minChroma) * progress;
    };

    const formatOklch = (l: number, c: number, h: number) => {
        return `oklch(${l.toFixed(3)}, ${c.toFixed(3)}, ${h.toFixed(2)})`;
    };

    const lines: string[] = [];
    lines.push("const primaries: Theme.Primaries = {");

    lines.push("    d10: " + formatOklch(lightnessRanges.d[0], minChroma, hue) + ",");
    lines.push("    d20: " + formatOklch(lightnessRanges.d[1], minChroma, hue) + ",");
    lines.push("    d30: " + formatOklch(lightnessRanges.d[2], minChroma, hue) + ",");
    lines.push("    d40: " + formatOklch(lightnessRanges.d[3], minChroma, hue) + ",");
    lines.push("");
    lines.push("    m10: " + formatOklch(lightnessRanges.m[0], chromaProgression(0, 4), hue) + ",");
    lines.push("    m20: " + formatOklch(lightnessRanges.m[1], chromaProgression(1, 4), hue) + ",");
    lines.push("    m30: " + formatOklch(lightnessRanges.m[2], chromaProgression(2, 4), hue) + ",");
    lines.push("    m40: " + formatOklch(lightnessRanges.m[3], chromaProgression(3, 4), hue) + ",");
    lines.push("");
    lines.push("    l10: " + formatOklch(lightnessRanges.l[0], minChroma, hue) + ",");
    lines.push("    l20: " + formatOklch(lightnessRanges.l[1], minChroma, hue) + ",");
    lines.push("    l30: " + formatOklch(lightnessRanges.l[2], minChroma, hue) + ",");
    lines.push("    l40: " + formatOklch(lightnessRanges.l[3], minChroma, hue) + ",");
    lines.push("};");

    return lines.join("\n");
}

/**
 * Formats a palette extraction result for display
 */
export function formatPaletteResult(result: PaletteExtractionResult): string {
    const { dominantColors, suggestions, metadata } = result;
    const lines: string[] = [];

    lines.push("Image Analysis:");
    lines.push(
        `  Average Lightness: ${
            metadata.avgLightness.toFixed(2)
        } (suggests ${metadata.suggestedAppearance} theme)`,
    );
    lines.push(`  Average Chroma: ${metadata.avgChroma.toFixed(2)}`);
    lines.push(`  Dominant Colors: ${dominantColors.length} unique colors`);
    lines.push("");
    lines.push("Palette Suggestions:");
    lines.push("");

    suggestions.forEach((sug, i) => {
        const accentHex = formatHex({ mode: "oklch", ...sug.accent }) as HexColor;
        lines.push(`${i + 1}. ${sug.name}`);
        lines.push(`   ${sug.description}`);
        lines.push(
            `   Accent: oklch(${sug.accent.l.toFixed(2)}, ${sug.accent.c.toFixed(2)}, ${
                sug.accent.h.toFixed(0)
            }) = ${accentHex}`,
        );
        lines.push(`   Base Hue: ${sug.primaries.hue.toFixed(0)}°`);
        lines.push(
            `   Chroma Range: ${sug.primaries.chromaRange[0].toFixed(3)}-${
                sug.primaries.chromaRange[1].toFixed(3)
            }`,
        );
        lines.push(`   ${sug.primaries.reasoning}`);
        lines.push("");
    });

    return lines.join("\n");
}
