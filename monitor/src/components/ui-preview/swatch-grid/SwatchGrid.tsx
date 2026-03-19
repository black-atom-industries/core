import type { ReactNode } from "react";
import styles from "./SwatchGrid.module.css";

interface Props {
    children: ReactNode;
}

export function SwatchGrid({ children }: Props) {
    return <div className={styles.swatchGrid} data-layout="SwatchGrid">{children}</div>;
}
