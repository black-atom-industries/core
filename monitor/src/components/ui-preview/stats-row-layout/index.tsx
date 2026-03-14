import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function StatsRowLayout({ children, ...rest }: Props) {
    return <div className={styles.row} data-layout="StatsRowLayout" {...rest}>{children}</div>;
}
