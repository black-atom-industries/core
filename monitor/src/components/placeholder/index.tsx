import type { ReactNode } from "react";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    minHeight?: number;
    children: ReactNode;
}

export function Placeholder({ minHeight = 300, children, ...rest }: Props) {
    return (
        <div
            className={styles.placeholder}
            data-component="Placeholder"
            style={{ minHeight, height: "100%" }}
            {...rest}
        >
            {children}
        </div>
    );
}
