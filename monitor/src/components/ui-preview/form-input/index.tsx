import type { InputHTMLAttributes } from "react";
import styles from "./index.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function FormInput(props: Props) {
    return <input {...props} className={styles.input} />;
}
