import styles from "./index.module.css";

interface Props {
    label: string;
    icon: string;
    active?: boolean;
    onClick: () => void;
}

export function NavItem({ label, icon, active = false, onClick }: Props) {
    return (
        <button
            type="button"
            className={styles.item}
            data-active={active}
            onClick={onClick}
        >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
        </button>
    );
}
