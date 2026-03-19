import type { ReactNode } from "react";
import styles from "./ChromeCard.module.css";

interface Props {
    children: ReactNode;
}

export function ChromeCard({ children }: Props) {
    return <div className={styles.card} data-component="ChromeCard">{children}</div>;
}
