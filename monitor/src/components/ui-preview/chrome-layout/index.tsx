import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function ChromeLayout({ children }: Props) {
    return <div className={styles.chromeLayout}>{children}</div>;
}
