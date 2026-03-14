import styles from "./index.module.css";

interface Props {
    color: string;
    label: string;
    message: string;
}

export function StatusItem({ color, label, message }: Props) {
    return (
        <div className={styles.item}>
            <span className={styles.dot} style={{ background: color }} />
            <span className={styles.label}>{label}</span>
            <span className={styles.message}>{message}</span>
        </div>
    );
}
