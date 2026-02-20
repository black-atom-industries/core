import { formatHex, interpolate, oklch as libOklch } from "culori";
import type { HexColor } from "../types/theme.ts";

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
 * Tints a base color with another color using OKLCH interpolation
 * @param params - Tint parameters
 * @param params.color - Color to tint with (hex)
 * @param params.with - Base color to apply tint to (default: black)
 * @param params.amount - Amount of tint to apply (0-1). Lower = more base color, higher = more tint (default: 0.15)
 * @returns Tinted hex color
 * @example
 * tint({ color: '#ff0000', with: '#1e1e1e' }) // Returns dark background with 15% red tint
 * tint({ color: '#ff0000', with: '#f5f5f5' }) // Returns light background with 15% red tint
 * tint({ color: '#ff0000', with: '#000000', amount: 0.1 }) // Returns 10% red on black
 * tint({ color: '#ff0000', with: '#000000', amount: 0.5 }) // Returns 50% red on black
 */
export function tint(
    { color, with: baseColor = "#000000", amount = 0.25 }: {
        color: string;
        with?: string;
        amount?: number;
    },
): HexColor {
    const interpolator = interpolate([baseColor, color], "oklch");
    return formatHex(interpolator(Math.abs(amount))) as HexColor;
}
