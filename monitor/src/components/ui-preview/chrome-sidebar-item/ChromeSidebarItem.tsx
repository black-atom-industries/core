import type { ReactNode } from "react";
import styles from "./ChromeSidebarItem.module.css";

interface Props {
    active?: boolean;
    children: ReactNode;
}

export function ChromeSidebarItem({ active = false, children }: Props) {
    return (
        <div
            className={styles.item}
            data-component="ChromeSidebarItem"
            data-active={active ? "true" : undefined}
        >
            {children}
        </div>
    );
}
