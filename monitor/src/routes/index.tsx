import { createFileRoute } from "@tanstack/react-router";
import { useThemes } from "../queries/themes";
import { Placeholder } from "../components/placeholder";
import { CollectionLabel } from "../components/collection-label";
import { ThemePreviewCard } from "../components/theme-preview-card";
import {
    DashboardCardGrid,
    DashboardPageLayout,
    DashboardSection,
} from "../components/dashboard-page-layout";

export const Route = createFileRoute("/")({
    component: Component,
});

function Component() {
    const { data, isLoading } = useThemes();

    if (isLoading || !data) {
        return (
            <Placeholder minHeight={200}>
                <p>Loading…</p>
            </Placeholder>
        );
    }

    return (
        <DashboardPageLayout>
            {data.collections.map((group) => {
                const darkCount = group.themes.filter((t) => t.meta.appearance === "dark").length;
                const lightCount = group.themes.length - darkCount;
                const avgContrast = group.themes.reduce((sum, t) => sum + t.contrast.ratio, 0) /
                    group.themes.length;
                return (
                    <DashboardSection key={group.collection}>
                        <CollectionLabel>
                            {group.collection} · {group.themes.length} themes · {darkCount} dark,
                            {" "}
                            {lightCount} light · avg {avgContrast.toFixed(1)}:1
                        </CollectionLabel>
                        <DashboardCardGrid>
                            {group.themes.map((t) => (
                                <ThemePreviewCard
                                    key={t.meta.key}
                                    name={t.meta.name}
                                    appearance={t.meta.appearance}
                                    primaries={t.primaries}
                                    palette={t.palette}
                                    contrastRatio={t.contrast.ratio}
                                    themeKey={t.meta.key}
                                />
                            ))}
                        </DashboardCardGrid>
                    </DashboardSection>
                );
            })}
        </DashboardPageLayout>
    );
}
