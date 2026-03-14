import type { ReactNode } from "react";
import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    leftNav: ReactNode;
    main: ReactNode;
    rightSidebar: ReactNode;
};

export function AppLayout({ leftNav, main, rightSidebar, ...rest }: Props) {
    return (
        <div className={styles.shell} data-layout="AppLayout" {...rest}>
            <nav className={styles.leftNav}>{leftNav}</nav>
            <main className={styles.main}>{main}</main>
            <aside className={styles.rightSidebar}>{rightSidebar}</aside>
        </div>
    );
}
