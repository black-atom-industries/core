import type { ReactNode } from "react";
import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    leftNav: ReactNode;
    main: ReactNode;
    rightSidebar?: ReactNode;
    bottomBar?: ReactNode;
};

export function AppLayout({ leftNav, main, rightSidebar, bottomBar, ...rest }: Props) {
    return (
        <div className={styles.root} data-layout="AppLayout" {...rest}>
            <div className={styles.body}>
                <nav className={styles.leftNav}>{leftNav}</nav>
                <main className={styles.main}>{main}</main>
                {rightSidebar && <aside className={styles.rightSidebar}>{rightSidebar}</aside>}
            </div>
            {bottomBar && <div className={styles.bottomBar}>{bottomBar}</div>}
        </div>
    );
}
