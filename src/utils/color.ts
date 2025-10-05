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
 * Darkens a color by blending it with black or a custom background
 * @param params - Darken parameters
 * @param params.color - Color to darken (hex)
 * @param params.amount - Amount to darken (0-1). Lower = more darkening, higher = less darkening (default: 0.15)
 * @param params.bg - Background color to blend with (default: black)
 * @returns Darkened hex color
 * @example
 * darken({ color: '#ff0000' }) // Returns '#260000' (85% black + 15% red using default amount)
 * darken({ color: '#ff0000', amount: 0.1 }) // Returns '#1a0000' (90% black + 10% red = heavily darkened)
 * darken({ color: '#ff0000', amount: 0.5 }) // Returns '#800000' (50% black + 50% red = medium darkening)
 * darken({ color: '#f44747', amount: 0.15, bg: '#1e1e1e' }) // Returns '#3c2424' (subtle red background)
 */
export function darken(
    { color, amount = 0.15, bg = "#000000" }: { color: string; amount?: number; bg?: string },
): HexColor {
    return blend({ fg: color, bg: bg, alpha: Math.abs(amount) });
}

/**
 * Lightens a color by blending it with white or a custom foreground
 * @param params - Lighten parameters
 * @param params.color - Color to lighten (hex)
 * @param params.amount - Amount to lighten (0-1). Lower = more lightening, higher = less lightening (default: 0.15)
 * @param params.fg - Foreground color to blend with (default: white)
 * @returns Lightened hex color
 * @example
 * lighten({ color: '#ff0000' }) // Returns '#ffd9d9' (85% white + 15% red using default amount)
 * lighten({ color: '#ff0000', amount: 0.1 }) // Returns '#ffe6e6' (90% white + 10% red = heavily lightened)
 * lighten({ color: '#ff0000', amount: 0.5 }) // Returns '#ff8080' (50% white + 50% red = medium lightening)
 */
export function lighten(
    { color, amount = 0.15, fg = "#ffffff" }: { color: string; amount?: number; fg?: string },
): HexColor {
    return blend({ fg: color, bg: fg, alpha: Math.abs(amount) });
}
