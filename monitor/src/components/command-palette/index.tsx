import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import styles from "./index.module.css";

/** A single item in the command palette. */
export interface CommandItem {
    id: string;
    label: string;
    group?: string;
    meta?: string;
    selected?: boolean;
    onSelect: () => void;
}

type Props = {
    items: CommandItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    placeholder?: string;
    emptyMessage?: string;
};

export function CommandPalette({
    items,
    open,
    onOpenChange,
    placeholder = "Search...",
    emptyMessage = "No results found.",
}: Props) {
    const [query, setQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        if (!query) return items;
        const lower = query.toLowerCase();
        return items.filter(
            (item) =>
                item.label.toLowerCase().includes(lower) ||
                (item.group?.toLowerCase().includes(lower)),
        );
    }, [items, query]);

    const grouped = useMemo(() => {
        const groups = new Map<string, CommandItem[]>();
        for (const item of filtered) {
            const key = item.group ?? "";
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(item);
        }
        return groups;
    }, [filtered]);

    const handleSelect = useCallback((item: CommandItem) => {
        item.onSelect();
        onOpenChange(false);
    }, [onOpenChange]);

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

    // Keyboard nav
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const item = filtered[highlightIndex];
            if (item) handleSelect(item);
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
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop} />
                <Dialog.Popup className={styles.palette} onKeyDown={handleKeyDown}>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div ref={listRef} className={styles.list} role="listbox">
                        {filtered.length === 0 && (
                            <div className={styles.empty}>{emptyMessage}</div>
                        )}
                        {Array.from(
                            grouped,
                            ([groupKey, groupItems]) => (
                                <div key={groupKey} className={styles.group}>
                                    {groupKey && (
                                        <div className={styles.groupLabel}>{groupKey}</div>
                                    )}
                                    {groupItems.map((item) => {
                                        const idx = itemIndex++;
                                        return (
                                            <div
                                                key={item.id}
                                                className={styles.item}
                                                data-index={idx}
                                                data-highlighted={idx === highlightIndex ||
                                                    undefined}
                                                data-selected={item.selected || undefined}
                                                role="option"
                                                aria-selected={item.selected}
                                                onClick={() => handleSelect(item)}
                                                onMouseEnter={() => setHighlightIndex(idx)}
                                            >
                                                <span>{item.label}</span>
                                                {item.meta && (
                                                    <span className={styles.meta}>
                                                        {item.meta}
                                                    </span>
                                                )}
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
