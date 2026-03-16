import type { ThemeContrastResult } from "@core/lib/stats.ts";
import { StatsBarLayout } from "../../components/stats-bar-layout";

interface Props {
    contrast: ThemeContrastResult;
    collectionLabel: string;
    hueSpreadColors: string[];
    lightnessRange: [string, string];
}

export function ThemeStatsPartial(
    { contrast, collectionLabel, hueSpreadColors, lightnessRange }: Props,
) {
    const contrastColor = contrast.level === "fail"
        ? "var(--ba-ui-fg-negative)"
        : "var(--ba-ui-fg-positive)";

    return (
        <StatsBarLayout
            items={[
                {
                    label: "Contrast",
                    value: (
                        <span style={{ color: contrastColor }}>{contrast.ratio.toFixed(2)}:1</span>
                    ),
                },
                {
                    label: "WCAG",
                    value: (
                        <span style={{ color: contrastColor }}>{contrast.level.toUpperCase()}</span>
                    ),
                },
                {
                    label: "Hue Spread",
                    value: (
                        <div style={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            {hueSpreadColors.map((c, i) => (
                                <div key={i} style={{ width: 6, height: 12, background: c }} />
                            ))}
                        </div>
                    ),
                },
                {
                    label: "Lightness",
                    value: (
                        <div
                            style={{
                                height: 10,
                                borderRadius: 1,
                                background: `linear-gradient(to right, ${lightnessRange[0]}, ${
                                    lightnessRange[1]
                                })`,
                            }}
                        />
                    ),
                },
                { label: "Collection", value: collectionLabel },
            ]}
        />
    );
}
