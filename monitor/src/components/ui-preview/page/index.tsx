import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Page({ children, ...rest }: Props) {
    return <div className={styles.page} data-layout="Page" {...rest}>{children}</div>;
}
