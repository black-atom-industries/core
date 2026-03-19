import type { ReactNode } from "react";
import styles from "./StatusList.module.css";

interface Props {
    children: ReactNode;
}

export function StatusList({ children }: Props) {
    return <div className={styles.statusList} data-component="StatusList">{children}</div>;
}
