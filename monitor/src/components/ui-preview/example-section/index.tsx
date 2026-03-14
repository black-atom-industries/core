import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    label: string;
    children: ReactNode;
}

export function ExampleSection({ label, children }: Props) {
    return (
        <div className={styles.section}>
            <div className={styles.label}>{label}</div>
            {children}
        </div>
    );
}
