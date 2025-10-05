import { HexColor } from "../types/theme.ts";

/**
 * Converts a hex color string to RGB array
 */
function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        throw new Error(`Invalid hex color: ${hex}`);
    }
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
    ];
}

/**
 * Converts RGB values to hex color string
 */
function rgbToHex(r: number, g: number, b: number): HexColor {
    const toHex = (n: number) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}` as HexColor;
}

/**
 * Blends two colors together
 * @param params - Blend parameters
 * @param params.fg - Foreground color (hex)
 * @param params.bg - Background color (hex)
 * @param params.alpha - Blend amount (0-1). 0 = bg, 1 = fg
 * @returns Blended hex color
 * @example
 * blend({ fg: '#ff0000', bg: '#000000', alpha: 0.5 }) // Returns '#800000' (50% red)
 * blend({ fg: '#ff0000', bg: '#000000', alpha: 0 }) // Returns '#000000' (full bg)
 * blend({ fg: '#ff0000', bg: '#000000', alpha: 1 }) // Returns '#ff0000' (full fg)
 */
export function blend({ fg, bg, alpha }: { fg: string; bg: string; alpha: number }): HexColor {
    const [fgR, fgG, fgB] = hexToRgb(fg);
    const [bgR, bgG, bgB] = hexToRgb(bg);

    const blendChannel = (fgChannel: number, bgChannel: number): number => {
        const result = alpha * fgChannel + (1 - alpha) * bgChannel;
        return Math.min(Math.max(0, result), 255);
    };

    return rgbToHex(
        blendChannel(fgR, bgR),
        blendChannel(fgG, bgG),
        blendChannel(fgB, bgB),
    );
}

/**
 * Tints a base color with another color
 * @param params - Tint parameters
 * @param params.color - Color to tint with (hex)
 * @param params.with - Base color to apply tint to (default: black)
 * @param params.amount - Amount of tint to apply (0-1). Lower = more base color, higher = more tint (default: 0.15)
 * @returns Tinted hex color
 * @example
 * tint({ color: '#ff0000', with: '#1e1e1e' }) // Returns '#3c2424' (dark background with 15% red tint)
 * tint({ color: '#ff0000', with: '#f5f5f5' }) // Returns '#f5d2d2' (light background with 15% red tint)
 * tint({ color: '#ff0000', with: '#000000', amount: 0.1 }) // Returns '#1a0000' (10% red on black)
 * tint({ color: '#ff0000', with: '#000000', amount: 0.5 }) // Returns '#800000' (50% red on black)
 */
export function tint(
    { color, with: baseColor = "#000000", amount = 0.15 }: {
        color: string;
        with?: string;
        amount?: number;
    },
): HexColor {
    return blend({ fg: color, bg: baseColor, alpha: Math.abs(amount) });
}
