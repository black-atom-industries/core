import type { ContrastPair } from "@core/lib/contrast-analysis.ts";
import styles from "./index.module.css";

type Props = { pair: ContrastPair };

export function ContrastPairRow({ pair }: Props) {
    return (
        <div className={styles.pairRow} data-grade={pair.level}>
            <span className={styles.pairKeys}>
                {pair.fg.key} / {pair.bg.key}
            </span>
            <span className={styles.pairResult}>
                {pair.ratio.toFixed(1)} {pair.level}
            </span>
        </div>
    );
}
