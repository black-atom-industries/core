import type { OrgStatsResult } from "@core/lib/stats.ts";
import { StatsBarLayout } from "../../components/stats-bar-layout";

interface Props {
    stats: OrgStatsResult;
}

export function OrgStatsPartial({ stats }: Props) {
    return (
        <StatsBarLayout
            items={[
                { label: "Themes", value: stats.themeCount },
                { label: "Collections", value: stats.collectionCount },
                { label: "Dark / Light", value: `${stats.darkCount} / ${stats.lightCount}` },
                {
                    label: "Avg Contrast",
                    value: (
                        <span style={{ color: "var(--ba-ui-fg-positive)" }}>
                            {stats.avgContrast.toFixed(1)}:1
                        </span>
                    ),
                },
            ]}
        />
    );
}
