import type { ReactNode } from "react";
import styles from "./syntax-preview-layout.module.css";

type Props = {
    children: ReactNode;
};

export function SyntaxPreviewLayout({ children }: Props) {
    return (
        <div className={styles.root} data-layout="SyntaxPreviewLayout">
            {children}
        </div>
    );
}
