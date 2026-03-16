import { useMemo, useState } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { groupByCollection } from "../../lib/theme-utils";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";
import styles from "./theme-selector.module.css";

type Props = {
    themes: ThemeDefinition[];
    currentThemeKey: ThemeKey;
    currentThemeLabel: string;
    onSelect: (key: ThemeKey) => void;
};

interface ThemeGroup {
    collection: string;
    items: ThemeDefinition[];
}

export function ThemeSelector({ themes, currentThemeKey, currentThemeLabel, onSelect }: Props) {
    const [query, setQuery] = useState("");

    const groups: ThemeGroup[] = useMemo(() => {
        const collections = groupByCollection(themes);
        return Array.from(collections, ([collection, items]) => ({ collection, items }));
    }, [themes]);

    return (
        <Combobox.Root
            items={groups}
            value={currentThemeKey}
            inputValue={query}
            onInputValueChange={setQuery}
            onValueChange={(value) => {
                if (value) {
                    onSelect(value as ThemeKey);
                    setQuery("");
                }
            }}
        >
            <Combobox.InputGroup className={styles.inputGroup}>
                <Combobox.Input
                    className={styles.input}
                    placeholder={currentThemeLabel || "Select theme..."}
                />
                <Combobox.Trigger className={styles.trigger}>
                    <Combobox.Icon className={styles.icon}>
                        <ChevronIcon />
                    </Combobox.Icon>
                </Combobox.Trigger>
            </Combobox.InputGroup>

            <Combobox.Portal>
                <Combobox.Positioner className={styles.positioner} sideOffset={6} align="end">
                    <Combobox.Popup className={styles.popup}>
                        <Combobox.List className={styles.list}>
                            {groups.map((group) => (
                                <Combobox.Group key={group.collection} className={styles.group}>
                                    <Combobox.GroupLabel className={styles.groupLabel}>
                                        {group.collection}
                                    </Combobox.GroupLabel>
                                    {group.items.map((t) => (
                                        <Combobox.Item
                                            key={t.meta.key}
                                            value={t.meta.key}
                                            className={styles.item}
                                        >
                                            <span>{t.meta.name}</span>
                                            <span className={styles.appearance}>
                                                {t.meta.appearance}
                                            </span>
                                        </Combobox.Item>
                                    ))}
                                </Combobox.Group>
                            ))}
                        </Combobox.List>
                    </Combobox.Popup>
                </Combobox.Positioner>
            </Combobox.Portal>
        </Combobox.Root>
    );
}

function ChevronIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
        </svg>
    );
}
