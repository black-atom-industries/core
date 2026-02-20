import type * as Theme from "../types/theme.ts";
import { themeBundle } from "../themes/bundle.ts";

/**
 * Returns the statically bundled theme map.
 *
 * All themes are imported at compile time via src/themes/bundle.ts.
 * When adding new themes, update the bundle file.
 */
export function loadThemeMap(): Theme.ThemeMap {
    return themeBundle;
}
