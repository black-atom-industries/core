import { createFileRoute } from "@tanstack/react-router";
import { useThemes } from "../queries/themes";
import { collectionStats } from "../lib/stats";
import { groupByCollection } from "../lib/theme-utils";
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
    const { data: themes, isLoading } = useThemes();

    if (isLoading || !themes) {
        return (
            <Placeholder minHeight={200}>
                <p>Loading…</p>
            </Placeholder>
        );
    }

    const collections = groupByCollection(themes);

    return (
        <DashboardPageLayout>
            {Array.from(collections, ([collectionKey, collectionThemes]) => {
                const stats = collectionStats(collectionThemes);
                return (
                    <DashboardSection key={collectionKey}>
                        <CollectionLabel>
                            {collectionKey} · {stats.themeCount} themes · {stats.darkCount} dark,
                            {" "}
                            {stats.lightCount} light · avg {stats.avgContrast.toFixed(1)}:1
                        </CollectionLabel>
                        <DashboardCardGrid>
                            {collectionThemes.map((t) => (
                                <ThemePreviewCard
                                    key={t.meta.key}
                                    theme={t}
                                />
                            ))}
                        </DashboardCardGrid>
                    </DashboardSection>
                );
            })}
        </DashboardPageLayout>
    );
}
