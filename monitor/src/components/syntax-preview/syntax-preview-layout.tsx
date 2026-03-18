import type { ReactNode } from "react";
import styles from "./syntax-preview-layout.module.css";

type Props = {
    sidebar: ReactNode;
    main: ReactNode;
};

export function SyntaxPreviewLayout({ sidebar, main }: Props) {
    return (
        <div className={styles.root} data-layout="SyntaxPreviewLayout">
            {sidebar}
            <div className={styles.sticky}>{main}</div>
        </div>
    );
}
