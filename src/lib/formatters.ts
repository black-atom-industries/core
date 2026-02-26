import type { ThemeMeta } from "../types/theme.ts";

/**
 * Construct a full display label from theme metadata.
 *
 * - Default collection: `"Black Atom — Dark"`
 * - Other collections: `"Black Atom — STA ∷ Engineering"`
 */
export function formatThemeLabel(meta: ThemeMeta): string {
    if (meta.collection.key === "default") {
        return `Black Atom — ${meta.name}`;
    }
    return `Black Atom — ${meta.collection.label} ∷ ${meta.name}`;
}
