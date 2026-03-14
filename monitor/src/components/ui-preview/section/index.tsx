import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function Section({ children }: Props) {
    return <section className={styles.section} data-layout="Section">{children}</section>;
}
