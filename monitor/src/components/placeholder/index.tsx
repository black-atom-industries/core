import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    minHeight?: number;
    children: ReactNode;
}

export function Placeholder({ minHeight = 300, children }: Props) {
    return (
        <div className={styles.placeholder} style={{ minHeight, height: "100%" }}>
            {children}
        </div>
    );
}
