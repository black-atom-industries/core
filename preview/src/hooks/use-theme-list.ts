import { useQuery } from "@tanstack/react-query";
import type { ThemeCollectionKey } from "@core/types/theme.ts";
import type { ThemeMeta } from "@core/types/theme.ts";

interface CollectionGroup {
    collection: ThemeCollectionKey;
    themes: ThemeMeta[];
}

export interface ThemesResponse {
    collections: CollectionGroup[];
}

export function useThemeList() {
    return useQuery<ThemesResponse>({
        queryKey: ["themes"],
        queryFn: () => fetch("/api/themes").then((r) => r.json()),
    });
}
