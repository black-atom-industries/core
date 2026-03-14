import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function ChromeSidebar({ children }: Props) {
    return <aside className={styles.sidebar}>{children}</aside>;
}
