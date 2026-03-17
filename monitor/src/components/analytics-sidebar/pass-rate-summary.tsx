import styles from "./index.module.css";

type Props = { aa: number; aaa: number };

export function PassRateSummary({ aa, aaa }: Props) {
    return (
        <div className={styles.summary}>
            <div className={styles.summaryLabel}>CONTRAST HEALTH</div>
            <div className={styles.summaryRow}>
                <span className={styles.summaryValue}>{Math.round(aa * 100)}%</span>
                <span className={styles.summaryDetail}>AA pass rate</span>
            </div>
            <div className={styles.summaryRow}>
                <span className={styles.summaryValueSecondary}>
                    {Math.round(aaa * 100)}%
                </span>
                <span className={styles.summaryDetail}>AAA pass rate</span>
            </div>
        </div>
    );
}
