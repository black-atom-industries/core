import { AppearanceBadge } from "../appearance-badge";
import styles from "./index.module.css";

interface Props {
    name: string;
    appearance: "dark" | "light";
    active?: boolean;
    onClick: () => void;
}

export function ThemeListItem({ name, appearance, active = false, onClick }: Props) {
    return (
        <button
            type="button"
            className={styles.item}
            data-component="ThemeListItem"
            data-active={active}
            onClick={onClick}
        >
            <span className={styles.name}>{name}</span>
            <AppearanceBadge appearance={appearance} />
        </button>
    );
}
