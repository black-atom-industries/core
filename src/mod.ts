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
 * import { themeBundle } from "@black-atom/core";
 * import type { Definition, Key } from "@black-atom/core";
 *
 * // Access a specific theme
 * const theme: Definition = themeBundle["black-atom-jpn-koyo-yoru"]!;
 *
 * console.log(theme.meta.label); // "Black Atom — JPN ∷ Koyo Yoru"
 * console.log(theme.ui.bg.default); // hex color for the background
 * console.log(theme.syntax.keyword.default); // hex color for keywords
 * ```
 */

export type * from "./types/theme.ts";
export { themeBundle } from "./themes/bundle.ts";
