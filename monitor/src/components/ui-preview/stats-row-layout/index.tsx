import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function StatsRowLayout({ children }: Props) {
    return <div className={styles.row}>{children}</div>;
}
