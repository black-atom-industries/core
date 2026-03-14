import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function TokenCol({ children }: Props) {
    return <div className={styles.tokenCol} data-layout="TokenCol">{children}</div>;
}
