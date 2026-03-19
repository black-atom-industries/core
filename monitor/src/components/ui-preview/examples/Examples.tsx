import type { ReactNode } from "react";
import styles from "./Examples.module.css";

interface Props {
    children: ReactNode;
}

export function Examples({ children }: Props) {
    return <div className={styles.examples} data-layout="Examples">{children}</div>;
}
