import type { ReactNode } from "react";
import styles from "./ButtonGroup.module.css";

interface Props {
    children: ReactNode;
}

export function ButtonGroup({ children }: Props) {
    return <div className={styles.buttonGroup} data-layout="ButtonGroup">{children}</div>;
}
