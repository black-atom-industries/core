import styles from "./index.module.css";

interface Props {
    appearance: "dark" | "light";
}

export function AppearanceBadge({ appearance }: Props) {
    return (
        <span className={styles.badge} data-appearance={appearance}>
            {appearance}
        </span>
    );
}
