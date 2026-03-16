import type { ThemeCollectionKey, ThemeDefinition } from "@core/types/theme.ts";

/** Groups themes by their collection key. */
export function groupByCollection(
    themes: ThemeDefinition[],
): Map<ThemeCollectionKey, ThemeDefinition[]> {
    return Map.groupBy(themes, (t) => t.meta.collection.key);
}
