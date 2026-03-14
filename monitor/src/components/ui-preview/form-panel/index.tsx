import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function FormPanel({ children }: Props) {
    return <div className={styles.formPanel}>{children}</div>;
}
