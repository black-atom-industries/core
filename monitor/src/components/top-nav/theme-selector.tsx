import { useMemo, useState } from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { groupByCollection } from "../../lib/theme-utils";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";
import styles from "./theme-selector.module.css";

type Props = {
    themes: ThemeDefinition[];
    currentThemeKey: ThemeKey;
    currentThemeLabel: string;
    onSelect: (key: ThemeKey) => void;
};

export function ThemeSelector({ themes, currentThemeKey, currentThemeLabel, onSelect }: Props) {
    const [filter, setFilter] = useState("");

    const collections = useMemo(() => groupByCollection(themes), [themes]);

    const filtered = useMemo(() => {
        if (!filter) return collections;
        const lower = filter.toLowerCase();
        const result = new Map<string, ThemeDefinition[]>();
        for (const [key, items] of collections) {
            const matches = items.filter(
                (t) =>
                    t.meta.name.toLowerCase().includes(lower) ||
                    t.meta.collection.label.toLowerCase().includes(lower),
            );
            if (matches.length > 0) result.set(key, matches);
        }
        return result;
    }, [collections, filter]);

    return (
        <NavigationMenu.Root className={styles.root}>
            <NavigationMenu.List className={styles.list}>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className={styles.trigger}>
                        {currentThemeLabel || "Select theme"}
                        <NavigationMenu.Icon className={styles.icon}>
                            <ChevronIcon />
                        </NavigationMenu.Icon>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className={styles.content}>
                        <input
                            className={styles.filter}
                            type="text"
                            placeholder="Filter themes..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div className={styles.groups}>
                            {Array.from(
                                filtered,
                                ([collectionKey, items]) => (
                                    <div key={collectionKey} className={styles.group}>
                                        <div className={styles.groupLabel}>{collectionKey}</div>
                                        {items.map((t) => (
                                            <NavigationMenu.Link
                                                key={t.meta.key}
                                                className={styles.themeItem}
                                                data-active={t.meta.key === currentThemeKey ||
                                                    undefined}
                                                closeOnClick
                                                onClick={(e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    onSelect(t.meta.key as ThemeKey);
                                                    setFilter("");
                                                }}
                                                href="#"
                                            >
                                                <span>{t.meta.name}</span>
                                                <span className={styles.appearance}>
                                                    {t.meta.appearance}
                                                </span>
                                            </NavigationMenu.Link>
                                        ))}
                                    </div>
                                ),
                            )}
                        </div>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Portal>
                <NavigationMenu.Positioner
                    className={styles.positioner}
                    sideOffset={6}
                    align="end"
                >
                    <NavigationMenu.Popup className={styles.popup}>
                        <NavigationMenu.Viewport />
                    </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
        </NavigationMenu.Root>
    );
}

function ChevronIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
        </svg>
    );
}
