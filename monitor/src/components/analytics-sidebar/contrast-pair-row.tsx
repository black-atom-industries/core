import type { ContrastPair } from "@core/lib/contrast-analysis.ts";
import { ContrastSwatch } from "../contrast-swatch";
import styles from "./AnalyticsSidebar.module.css";

type Props = { pair: ContrastPair };

export function ContrastPairRow({ pair }: Props) {
    return (
        <div className={styles.pairRow} data-grade={pair.level}>
            <span className={styles.pairKeys}>
                <ContrastSwatch fgColor={pair.fg.color} bgColor={pair.bg.color} />
                {pair.fg.key} / {pair.bg.key}
            </span>
            <span className={styles.pairResult}>
                {pair.ratio.toFixed(2)} {pair.level}
            </span>
        </div>
    );
}
