import styles from "./AppearanceBadge.module.css";

interface Props {
    appearance: "dark" | "light";
}

export function AppearanceBadge({ appearance }: Props) {
    return (
        <span
            className={styles.badge}
            data-component="AppearanceBadge"
            data-appearance={appearance}
        >
            {appearance}
        </span>
    );
}
