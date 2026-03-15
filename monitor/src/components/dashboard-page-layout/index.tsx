import type { ReactNode } from "react";
import styles from "./index.module.css";

interface SectionProps {
    children: ReactNode;
}

export function DashboardPageLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.page} data-layout="DashboardPageLayout">
            {children}
        </div>
    );
}

export function DashboardSection({ children }: SectionProps) {
    return <div className={styles.section}>{children}</div>;
}

export function DashboardCardGrid({ children }: SectionProps) {
    return <div className={styles.cardGrid}>{children}</div>;
}
