import type { ReactNode } from "react";
import styles from "./ChromePanel.module.css";

interface Props {
    header: string;
    children: ReactNode;
}

export function ChromePanel({ header, children }: Props) {
    return (
        <div className={styles.panel} data-component="ChromePanel">
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
