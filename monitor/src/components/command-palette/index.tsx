import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
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

export function CommandPalette({
    items,
    open,
    onOpenChange,
    placeholder = "Search...",
    emptyMessage = "No results found.",
}: Props) {
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [filtered, setFiltered] = useState<CommandItem[]>(items);
    const listRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        defaultValues: { query: "" },
    });

    const grouped = useMemo(() => groupItems(filtered), [filtered]);

    const handleSelect = useCallback((item: CommandItem) => {
        item.onSelect();
        onOpenChange(false);
    }, [onOpenChange]);

    // Scroll highlighted item into view
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const highlighted = list.querySelector(`[data-index="${highlightIndex}"]`);
        if (highlighted) {
            highlighted.scrollIntoView({ block: "nearest" });
        }
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

    let itemIndex = 0;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop} />
                <Dialog.Popup className={styles.palette} onKeyDown={handleKeyDown}>
                    <form.Field
                        name="query"
                        listeners={{
                            onChange: ({ value }) => {
                                setFiltered(filterItems(items, value));
                                setHighlightIndex(0);
                            },
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
                    <div ref={listRef} className={styles.list} role="listbox">
                        {filtered.length === 0 && <div className={styles.empty}>{emptyMessage}
                        </div>}
                        {Array.from(
                            grouped,
                            ([groupKey, groupItems]) => (
                                <div key={groupKey} className={styles.group}>
                                    {groupKey && <div className={styles.groupLabel}>{groupKey}
                                    </div>}
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
