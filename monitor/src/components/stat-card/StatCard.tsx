import styles from "./StatCard.module.css";

interface Props {
    label: string;
    children: React.ReactNode;
}

export function StatCard({ label, children }: Props) {
    return (
        <div className={styles.card} data-component="StatCard">
            <span className={styles.label}>{label}</span>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
