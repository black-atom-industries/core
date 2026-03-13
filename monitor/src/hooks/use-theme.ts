import { useQuery } from "@tanstack/react-query";
import type { ThemeDefinition } from "@core/types/theme.ts";

export function useTheme(key: string | null) {
    return useQuery<ThemeDefinition>({
        queryKey: ["theme", key],
        queryFn: ({ signal }) => fetch(`/api/themes/${key}`, { signal }).then((r) => r.json()),
        enabled: !!key,
    });
}
