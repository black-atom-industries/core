import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { DEFAULT_THEME_KEY } from "@core/types/theme.ts";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";
import { apiClient } from "../lib/api-client";

const TOPIC = "themes" as const;

function queryKey(keys: string[]) {
    return [TOPIC, ...keys];
}

type UseThemeQueryOptions<T extends ThemeDefinition> = Omit<
    UseQueryOptions<T>,
    "queryKey" | "queryFn"
>;

export function useThemes(queryOptions?: UseQueryOptions<ThemeDefinition[]>) {
    return useQuery<ThemeDefinition[]>({
        queryKey: queryKey(["all"]),
        queryFn: ({ signal }) => apiClient<ThemeDefinition[]>("/themes", { signal }),
        ...queryOptions,
    });
}

export function useTheme(
    key: ThemeKey = DEFAULT_THEME_KEY,
    queryOptions?: UseThemeQueryOptions<ThemeDefinition>,
) {
    return useQuery<ThemeDefinition>({
        queryKey: queryKey([key]),
        queryFn: ({ signal }) => apiClient<ThemeDefinition>(`/themes/${key}`, { signal }),
        enabled: !!key,
        ...queryOptions,
    });
}
