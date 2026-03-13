import { StatCard } from "../../components/stat-card";
import styles from "./index.module.css";

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
    const { ratio, grade } = contrast;

    return (
        <div className={styles.row}>
            <StatCard label="Contrast (fg/bg)">
                <span className={styles.ratio} data-grade={grade}>
                    {ratio.toFixed(2)}:1
                </span>
                <span className={styles.grade} data-grade={grade}>
                    {grade}
                </span>
            </StatCard>

            <StatCard label="Hue spread">
                <div className={styles.hueStrip}>
                    {paletteColors.map((color, i) => (
                        <div
                            key={`${i}-${color}`}
                            className={styles.hueChunk}
                            style={{ background: color }}
                        />
                    ))}
                </div>
            </StatCard>

            <StatCard label="Lightness range">
                <div
                    className={styles.lightnessBar}
                    style={{
                        background:
                            `linear-gradient(to right, ${darkestPrimary}, ${lightestPrimary})`,
                    }}
                />
            </StatCard>
        </div>
    );
}
