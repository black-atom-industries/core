import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function ChromeCard({ children }: Props) {
    return <div className={styles.card}>{children}</div>;
}
