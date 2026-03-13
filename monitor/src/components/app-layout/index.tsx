import type { ReactNode } from "react";
import styles from "./index.module.css";

type Props = {
    leftNav: ReactNode;
    main: ReactNode;
    rightSidebar: ReactNode;
    style?: React.CSSProperties;
};

export function AppLayout({ leftNav, main, rightSidebar, style }: Props) {
    return (
        <div className={styles.shell} style={style}>
            <nav className={styles.leftNav}>{leftNav}</nav>
            <main className={styles.main}>{main}</main>
            <aside className={styles.rightSidebar}>{rightSidebar}</aside>
        </div>
    );
}
