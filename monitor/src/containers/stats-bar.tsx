import { useMatchRoute, useSearch } from "@tanstack/react-router";
import { useTheme, useThemes } from "../queries/themes";
import { orgStats, themeContrast } from "../lib/stats";
import { OrgStatsPartial } from "../partials/stats-bar/org-stats";
import { ThemeStatsPartial } from "../partials/stats-bar/theme-stats";

export function StatsBarContainer() {
    const matchRoute = useMatchRoute();
    const isDashboard = !!matchRoute({ to: "/" });

    const { themeKey } = useSearch({ from: "__root__" });
    const { data: theme } = useTheme(themeKey);
    const { data: themes } = useThemes();

    if (isDashboard && themes) {
        const stats = orgStats(themes);
        return <OrgStatsPartial stats={stats} />;
    }

    if (!isDashboard && theme) {
        const contrast = themeContrast(theme);
        const hueSpreadColors = [
            theme.palette.red,
            theme.palette.yellow,
            theme.palette.green,
            theme.palette.cyan,
            theme.palette.blue,
            theme.palette.magenta,
        ];
        const lightnessRange: [string, string] = [theme.primaries.d10, theme.primaries.l40];
        return (
            <ThemeStatsPartial
                contrast={contrast}
                collectionLabel={theme.meta.collection.label}
                hueSpreadColors={hueSpreadColors}
                lightnessRange={lightnessRange}
            />
        );
    }

    return null;
}
