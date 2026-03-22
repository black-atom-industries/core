/**
 * @module
 *
 * Core theme definitions and generation engine for the Black Atom Industries theme ecosystem.
 *
 * This package provides type-safe access to all Black Atom theme definitions,
 * including color primaries, palettes, UI tokens, and syntax highlighting colors.
 *
 * @example
 * ```ts
 * import { themeMap, themeKeyMetaMap } from "@black-atom/core";
 * import type { ThemeDefinition, ThemeKey } from "@black-atom/core";
 *
 * // Access theme meta (narrowed to exact literal types)
 * const meta = themeKeyMetaMap["black-atom-jpn-koyo-yoru"];
 *
 * // Access a specific theme definition
 * const theme: ThemeDefinition = themeMap["black-atom-jpn-koyo-yoru"]!;
 *
 * console.log(theme.ui.bg.default); // hex color for the background
 * console.log(theme.syntax.keyword.default); // hex color for keywords
 * ```
 */

export * from "./types/theme.ts";
export * from "./types/themes.ts";

export { themeMap } from "./themes/map.ts";

export { collectionOrder } from "./config.ts";
