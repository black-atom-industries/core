import type { ThemeKeyDefinitionMap } from "../types/theme.ts";
import { themeMap } from "../themes/map.ts";

/**
 * Returns the statically bundled theme map.
 *
 * All themes are imported at compile time via src/themes/bundle.ts.
 * When adding new themes, update the bundle file.
 */
export function loadThemeMap(): ThemeKeyDefinitionMap {
    return themeMap;
}
