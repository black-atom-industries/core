import { useQuery } from "@tanstack/react-query";
import type { ThemeDefinition } from "@core/types/theme.ts";

export function useTheme(key: string | null) {
    return useQuery<ThemeDefinition>({
        queryKey: ["theme", key],
        queryFn: () => fetch(`/api/themes/${key}`).then((r) => r.json()),
        enabled: !!key,
    });
}
