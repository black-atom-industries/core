import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
    ThemeCollectionKey,
    ThemeDefinition,
    ThemeMeta,
    ThemePaletteColors,
    ThemePrimaryColors,
} from "@core/types/theme.ts";
import { apiClient } from "../lib/api-client";

const TOPIC = "themes" as const;

function queryKey(keys: string[]) {
    return [TOPIC, ...keys];
}

// -- Types --

interface CollectionGroup {
    collection: ThemeCollectionKey;
    themes: ThemeMeta[];
}

export interface ThemeListResponse {
    collections: CollectionGroup[];
}

export interface ThemeSummary {
    meta: ThemeMeta;
    primaries: ThemePrimaryColors;
    palette: ThemePaletteColors;
    bgDefault: string;
    fgDefault: string;
    contrast: { ratio: number; level: "AAA" | "AA" | "fail" };
}

export interface ThemesResponse {
    collections: Array<{
        collection: ThemeCollectionKey;
        themes: ThemeSummary[];
    }>;
}

// -- Queries --

type UseThemeListQueryOptions = Omit<
    UseQueryOptions<ThemeListResponse>,
    "queryKey" | "queryFn"
>;

export function useThemeList(queryOptions?: UseThemeListQueryOptions) {
    return useQuery<ThemeListResponse>({
        queryKey: queryKey(["list"]),
        queryFn: ({ signal }) => apiClient<ThemeListResponse>("/themes", { signal }),
        ...queryOptions,
    });
}

type UseThemeQueryOptions = Omit<
    UseQueryOptions<ThemeDefinition>,
    "queryKey" | "queryFn"
>;

export function useTheme(
    key: string | null,
    queryOptions?: UseThemeQueryOptions,
) {
    return useQuery<ThemeDefinition>({
        queryKey: queryKey(["detail", key ?? ""]),
        queryFn: ({ signal }) => apiClient<ThemeDefinition>(`/themes/${key}`, { signal }),
        enabled: !!key,
        ...queryOptions,
    });
}

type UseThemesQueryOptions = Omit<
    UseQueryOptions<ThemesResponse>,
    "queryKey" | "queryFn"
>;

export function useThemes(queryOptions?: UseThemesQueryOptions) {
    return useQuery<ThemesResponse>({
        queryKey: queryKey(["overview"]),
        queryFn: ({ signal }) => apiClient<ThemesResponse>("/themes/overview", { signal }),
        ...queryOptions,
    });
}
