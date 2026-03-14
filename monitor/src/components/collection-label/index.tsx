import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function CollectionLabel({ children }: Props) {
    return <div className={styles.collectionLabel}>{children}</div>;
}
