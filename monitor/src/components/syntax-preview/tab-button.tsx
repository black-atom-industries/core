import styles from "./tab-button.module.css";

type Props = {
    label: string;
    active?: boolean;
    onClick: () => void;
};

export function TabButton({ label, active = false, onClick }: Props) {
    return (
        <button
            type="button"
            className={styles.tabButton}
            data-component="TabButton"
            data-active={active}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
