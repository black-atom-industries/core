import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { groupByCollection } from "../../lib/theme-utils";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";
import styles from "./index.module.css";

type Props = {
    themes: ThemeDefinition[];
    currentThemeKey: ThemeKey;
    currentThemeLabel: string;
    onSelect: (key: ThemeKey) => void;
};

export function ThemeSwitcher({ themes, currentThemeKey, currentThemeLabel, onSelect }: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const collections = useMemo(() => groupByCollection(themes), [themes]);

    const flatFiltered = useMemo(() => {
        const lower = query.toLowerCase();
        const result: { theme: ThemeDefinition; collection: string }[] = [];
        for (const [collectionKey, items] of collections) {
            for (const t of items) {
                if (
                    !query || t.meta.name.toLowerCase().includes(lower) ||
                    collectionKey.toLowerCase().includes(lower)
                ) {
                    result.push({ theme: t, collection: collectionKey });
                }
            }
        }
        return result;
    }, [collections, query]);

    const groupedFiltered = useMemo(() => {
        const groups = new Map<string, ThemeDefinition[]>();
        for (const { theme, collection } of flatFiltered) {
            if (!groups.has(collection)) groups.set(collection, []);
            groups.get(collection)!.push(theme);
        }
        return groups;
    }, [flatFiltered]);

    const handleSelect = useCallback((key: ThemeKey) => {
        onSelect(key);
        setOpen(false);
    }, [onSelect]);

    // ⌘K shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    // Focus input and reset state when opened
    useEffect(() => {
        if (open) {
            setQuery("");
            setHighlightIndex(0);
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [open]);

    // Reset highlight when query changes
    useEffect(() => {
        setHighlightIndex(0);
    }, [query]);

    // Keyboard nav in the list
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const item = flatFiltered[highlightIndex];
            if (item) handleSelect(item.theme.meta.key as ThemeKey);
        }
    };

    // Scroll highlighted item into view
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const highlighted = list.querySelector(`[data-index="${highlightIndex}"]`);
        if (highlighted) {
            highlighted.scrollIntoView({ block: "nearest" });
        }
    }, [highlightIndex]);

    let itemIndex = 0;

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className={styles.trigger} title="Switch theme (⌘K)">
                <span>{currentThemeLabel}</span>
                <kbd className={styles.kbd}>⌘K</kbd>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop} />
                <Dialog.Popup className={styles.palette} onKeyDown={handleKeyDown}>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="text"
                        placeholder="Search themes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div ref={listRef} className={styles.list} role="listbox">
                        {flatFiltered.length === 0 && (
                            <div className={styles.empty}>No themes found.</div>
                        )}
                        {Array.from(
                            groupedFiltered,
                            ([collectionKey, items]) => (
                                <div key={collectionKey} className={styles.group}>
                                    <div className={styles.groupLabel}>{collectionKey}</div>
                                    {items.map((t) => {
                                        const idx = itemIndex++;
                                        return (
                                            <div
                                                key={t.meta.key}
                                                className={styles.item}
                                                data-index={idx}
                                                data-highlighted={idx === highlightIndex ||
                                                    undefined}
                                                data-selected={t.meta.key === currentThemeKey ||
                                                    undefined}
                                                role="option"
                                                aria-selected={t.meta.key === currentThemeKey}
                                                onClick={() => handleSelect(t.meta.key as ThemeKey)}
                                                onMouseEnter={() =>
                                                    setHighlightIndex(idx)}
                                            >
                                                <span>{t.meta.name}</span>
                                                <span className={styles.appearance}>
                                                    {t.meta.appearance}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ),
                        )}
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
