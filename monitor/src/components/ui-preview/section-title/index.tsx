import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function SectionTitle({ children }: Props) {
    return <h2 className={styles.sectionTitle}>{children}</h2>;
}
