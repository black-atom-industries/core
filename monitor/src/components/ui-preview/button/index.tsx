import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./index.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary";
    children: ReactNode;
}

export function Button({ variant, children, ...rest }: Props) {
    return (
        <button
            {...rest}
            className={variant === "primary" ? styles.btnPrimary : styles.btnSecondary}
            data-component="Button"
        >
            {children}
        </button>
    );
}
