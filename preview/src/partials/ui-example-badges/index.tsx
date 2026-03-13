import styles from "./index.module.css";

interface Props {
    success: string;
    warning: string;
    error: string;
    info: string;
}

export function UiExampleBadges({ success, warning, error, info }: Props) {
    const states = [
        { label: "success", color: success },
        { label: "warning", color: warning },
        { label: "error", color: error },
        { label: "info", color: info },
    ];

    return (
        <div className={styles.example}>
            <div className={styles.label}>Notifications</div>
            <div className={styles.list}>
                {states.map(({ label, color }) => (
                    <div key={label} className={styles.item}>
                        <span
                            className={styles.dot}
                            style={{ background: color }}
                        />
                        <span className={styles.itemLabel}>{label}</span>
                        <span className={styles.message}>
                            Something {label === "error" ? "went wrong" : "happened"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
