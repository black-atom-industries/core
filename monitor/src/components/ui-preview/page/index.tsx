import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function Page({ children }: Props) {
    return <div className={styles.page}>{children}</div>;
}
