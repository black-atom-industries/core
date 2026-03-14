import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
    children: ReactNode;
}

export function NavSection({ children }: Props) {
    return <div className={styles.navSection} data-layout="NavSection">{children}</div>;
}
