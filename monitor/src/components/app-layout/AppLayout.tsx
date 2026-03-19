import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    topBar: ReactNode;
    leftSidebar?: ReactNode;
    main: ReactNode;
};

export function AppLayout({ topBar, leftSidebar, main, ...rest }: Props) {
    return (
        <div className={styles.root} data-layout="AppLayout" {...rest}>
            <header className={styles.topBar}>{topBar}</header>
            <div className={styles.body}>
                {leftSidebar && <aside className={styles.leftSidebar}>{leftSidebar}</aside>}
                <main className={styles.main}>{main}</main>
            </div>
        </div>
    );
}
