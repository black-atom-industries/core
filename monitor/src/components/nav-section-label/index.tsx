import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function NavSectionLabel({ children }: Props) {
    return <div className={styles.label}>{children}</div>;
}
