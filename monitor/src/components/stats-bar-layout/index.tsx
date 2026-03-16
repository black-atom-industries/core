import type { ReactNode } from "react";
import styles from "./index.module.css";

interface StatItem {
    label: string;
    value: ReactNode;
}

interface Props {
    items: StatItem[];
}

export function StatsBarLayout({ items }: Props) {
    return (
        <div className={styles.bar} data-component="StatsBarLayout">
            {items.map((item) => (
                <div key={item.label} className={styles.item}>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.value}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}
