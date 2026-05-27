import { formatHex, interpolate, oklch as libOklch } from "culori";
import type { HexColor } from "../types/colors.ts";

/**
 * Converts OKLCH color values to hex
 * @param l - Lightness (0-1)
 * @param c - Chroma (typically 0-0.4)
 * @param h - Hue (0-360 degrees)
 * @returns Hex color string
 * @example
 * oklch(0.7, 0.2, 180) // Returns '#00b3b3'
 */
export function oklch(l: number, c: number, h: number): HexColor {
    return formatHex(libOklch({ l, c, h })) as HexColor;
}

/**
 * Tints a base color with another color, preserving the tint color's hue.
 *
 * Uses hue-preserving OKLCH interpolation: the base color is neutralized (chroma
 * zeroed, hue aligned with the tint) before interpolation. This prevents the base
 * color's hue from bleeding through during mixing, which would otherwise cause
 * semantically wrong results when hues are far apart (e.g., orange tint on a
 * cool-white base producing green).
 *
 * @param params - Tint parameters
 * @param params.color - Tint color to apply (hex)
 * @param params.with - Base color to tint onto (default: black)
 * @param params.amount - Amount of tint (0-1). Lower = more base, higher = more tint (default: 0.25)
 * @returns Tinted hex color
 * @example
 * tint({ color: '#ff0000', with: '#1e1e1e' }) // Dark bg with red tint
 * tint({ color: '#ff0000', with: '#f5f5f5' }) // Light bg with red tint
 * tint({ color: '#ff0000', with: '#000000', amount: 0.1 }) // 10% red on black
 * tint({ color: '#ff0000', with: '#000000', amount: 0.5 }) // 50% red on black
 */
export function tint(
    { color, with: baseColor = "#000000", amount = 0.25 }: {
        color: string;
        with?: string;
        amount?: number;
    },
): HexColor {
    // Neutralize the base's chroma and lock its hue to the tint color.
    // This prevents hue interpolation artifacts when mixing warm tints
    // onto cool bases (or vice versa), which would otherwise pass through
    // unrelated hues (e.g., orange-on-white -> green).
    const base = libOklch(baseColor);
    const tint = libOklch(color);

    base.c = 0;
    base.h = tint.h;

    const baseAdj = formatHex(base);
    const interpolator = interpolate([baseAdj, color], "oklch");
    return formatHex(interpolator(Math.abs(amount))) as HexColor;
}
