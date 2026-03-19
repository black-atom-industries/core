import styles from "./AnalyticsSidebar.module.css";

type Props = { aa: number; aaa: number };

function getHealth(rate: number): "good" | "warn" | "poor" {
    if (rate >= 0.9) return "good";
    if (rate >= 0.7) return "warn";
    return "poor";
}

export function PassRateSummary({ aa, aaa }: Props) {
    return (
        <div className={styles.summary}>
            <div className={styles.summaryLabel}>CONTRAST HEALTH</div>
            <div className={styles.summaryRow}>
                <span className={styles.summaryValue} data-health={getHealth(aa)}>
                    {Math.round(aa * 100)}%
                </span>
                <span className={styles.summaryDetail}>AA pass rate</span>
            </div>
            <div className={styles.summaryRow}>
                <span
                    className={styles.summaryValueSecondary}
                    data-health={getHealth(aaa)}
                >
                    {Math.round(aaa * 100)}%
                </span>
                <span className={styles.summaryDetail}>AAA pass rate</span>
            </div>
        </div>
    );
}
