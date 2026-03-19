import type { ReactNode } from "react";
import styles from "./ExampleSection.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    children: ReactNode;
}

export function ExampleSection({ label, children, ...rest }: Props) {
    return (
        <div className={styles.section} data-layout="ExampleSection" {...rest}>
            <div className={styles.label}>{label}</div>
            {children}
        </div>
    );
}
