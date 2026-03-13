import type { CollectionGroup } from "../api";
import styles from "./ThemeSelector.module.css";

interface Props {
    collections: CollectionGroup[];
    selected: string | null;
    onSelect: (key: string) => void;
    bg: string;
    subtleFg: string;
}

export function ThemeSelector({ collections, selected, onSelect, bg, subtleFg }: Props) {
    return (
        <aside className={styles.sidebar}>
            {collections.map((group) => (
                <div key={group.collection} className={styles.group}>
                    <div className={styles.groupLabel}>{group.collection}</div>
                    {group.themes.map((t) => (
                        <button
                            type="button"
                            key={t.key}
                            className={styles.themeButton}
                            data-active={t.key === selected}
                            onClick={() => onSelect(t.key)}
                        >
                            <span
                                className={styles.dot}
                                style={{
                                    background: t.appearance === "dark" ? bg : subtleFg,
                                }}
                            />
                            {t.name}
                        </button>
                    ))}
                </div>
            ))}
        </aside>
    );
}
