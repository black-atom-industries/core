import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function StatsAndExamples({ children }: Props) {
    return <div className={styles.statsAndExamples}>{children}</div>;
}
