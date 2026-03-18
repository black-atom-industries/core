import type { ReactNode } from "react";
import styles from "./code-block.module.css";

type Props = {
    children: ReactNode;
};

export function CodeBlock({ children }: Props) {
    return (
        <pre className={styles.codeBlock} data-component="CodeBlock">
            <code>{children}</code>
        </pre>
    );
}
