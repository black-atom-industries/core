import { StatCard } from "../../components/stat-card";
import { ContrastDisplay } from "../../components/ui-preview/contrast-display";
import { HueStrip } from "../../components/ui-preview/hue-strip";
import { LightnessBar } from "../../components/ui-preview/lightness-bar";
import { StatsRowLayout } from "../../components/ui-preview/stats-row-layout";

interface ContrastData {
    ratio: number;
    grade: "AAA" | "AA" | "fail";
}

interface Props {
    contrast: ContrastData;
    paletteColors: string[];
    darkestPrimary: string;
    lightestPrimary: string;
}

export function StatsRow({
    contrast,
    paletteColors,
    darkestPrimary,
    lightestPrimary,
}: Props) {
    return (
        <StatsRowLayout data-partial="StatsRow">
            <StatCard label="Contrast (fg/bg)">
                <ContrastDisplay ratio={contrast.ratio} grade={contrast.grade} />
            </StatCard>

            <StatCard label="Hue spread">
                <HueStrip colors={paletteColors} />
            </StatCard>

            <StatCard label="Lightness range">
                <LightnessBar from={darkestPrimary} to={lightestPrimary} />
            </StatCard>
        </StatsRowLayout>
    );
}
