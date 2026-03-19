import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { Dialog } from "@base-ui/react/dialog";
import styles from "./CommandPalette.module.css";

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

function filterItems(items: CommandItem[], query: string): CommandItem[] {
    if (!query) return items;
    const lower = query.toLowerCase();
    return items.filter(
        (item) =>
            item.label.toLowerCase().includes(lower) ||
            (item.group?.toLowerCase().includes(lower)),
    );
}

function groupItems(items: CommandItem[]): Map<string, CommandItem[]> {
    const groups = new Map<string, CommandItem[]>();
    for (const item of items) {
        const key = item.group ?? "";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(item);
    }
    return groups;
}

function scrollToIndex(list: HTMLDivElement | null, index: number) {
    if (!list) return;
    const el = list.querySelector(`[data-index="${index}"]`) as HTMLElement | null;
    if (!el) return;
    // Center the item in the list viewport
    const top = el.offsetTop - list.offsetTop;
    const center = top - list.clientHeight / 2 + el.clientHeight / 2;
    list.scrollTop = Math.max(0, center);
}

export function CommandPalette({
    items,
    open,
    onOpenChange,
    placeholder = "Search...",
    emptyMessage = "No results found.",
}: Props) {
    const listRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        defaultValues: { query: "" },
    });

    const query = useStore(form.store, (s) => s.values.query);
    const filtered = useMemo(() => filterItems(items, query), [items, query]);
    const grouped = useMemo(() => groupItems(filtered), [filtered]);

    const [highlightIndex, setHighlightIndex] = useState(0);

    const handleSelect = useCallback((item: CommandItem) => {
        item.onSelect();
        onOpenChange(false);
    }, [onOpenChange]);

    // Jump to selected item when not searching
    useEffect(() => {
        if (query) return;
        const idx = filtered.findIndex((item) => item.selected);
        if (idx >= 0) setHighlightIndex(idx);
    }, [filtered, query]);

    const highlightRef = useRef(highlightIndex);
    highlightRef.current = highlightIndex;

    // Initial scroll when list mounts (callback ref fires when DOM is ready)
    const listCallbackRef = useCallback((node: HTMLDivElement | null) => {
        listRef.current = node;
        if (node) scrollToIndex(node, highlightRef.current);
    }, []);

    // Scroll on keyboard navigation
    useEffect(() => {
        scrollToIndex(listRef.current, highlightIndex);
    }, [highlightIndex]);

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

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop} />
                <Dialog.Popup className={styles.palette} onKeyDown={handleKeyDown}>
                    <form.Field
                        name="query"
                        listeners={{
                            onChange: () => setHighlightIndex(0),
                        }}
                        children={(field) => (
                            <input
                                className={styles.input}
                                type="text"
                                autoFocus
                                placeholder={placeholder}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        )}
                    />
                    <div
                        ref={listCallbackRef}
                        className={styles.list}
                        role="listbox"
                        aria-label={placeholder}
                        aria-activedescendant={filtered[highlightIndex]
                            ? `cmd-item-${filtered[highlightIndex].id}`
                            : undefined}
                    >
                        {filtered.length === 0 && <div className={styles.empty}>{emptyMessage}
                        </div>}
                        {Array.from(
                            grouped,
                            ([groupKey, groupItems]) => (
                                <div key={groupKey} className={styles.group}>
                                    {groupKey && <div className={styles.groupLabel}>{groupKey}
                                    </div>}
                                    {groupItems.map((item) => {
                                        const idx = filtered.indexOf(item);
                                        return (
                                            <div
                                                key={item.id}
                                                id={`cmd-item-${item.id}`}
                                                className={styles.item}
                                                data-index={idx}
                                                data-highlighted={idx === highlightIndex ||
                                                    undefined}
                                                data-selected={item.selected || undefined}
                                                role="option"
                                                aria-selected={item.selected}
                                                onClick={() => handleSelect(item)}
                                                onMouseEnter={() =>
                                                    setHighlightIndex(idx)}
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
