import type { ContrastPair } from "@core/lib/contrast-analysis.ts";
import styles from "./index.module.css";

type Props = { pair: ContrastPair };

export function WorstPairCard({ pair }: Props) {
    return (
        <div className={styles.worstPair} data-grade={pair.level}>
            <div className={styles.worstPairLabel}>LEAST CONTRAST</div>
            <div className={styles.worstPairKeys}>
                {pair.fg.key} / {pair.bg.key}
            </div>
            <div className={styles.worstPairResult}>
                <span>{pair.ratio.toFixed(2)}:1</span>
                <span className={styles.worstPairBadge} data-grade={pair.level}>
                    {pair.level.toUpperCase()}
                </span>
            </div>
        </div>
    );
}
