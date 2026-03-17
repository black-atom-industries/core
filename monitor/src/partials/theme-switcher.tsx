import { useMemo, useState } from "react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { CommandPalette } from "../components/command-palette";
import type { CommandItem } from "../components/command-palette";
import { groupByCollection } from "../lib/theme-utils";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";

type Props = {
    themes: ThemeDefinition[];
    currentThemeKey: ThemeKey;
    onSelect: (key: ThemeKey) => void;
};

export function ThemeSwitcher({ themes, currentThemeKey, onSelect }: Props) {
    const [open, setOpen] = useState(false);

    useHotkey("Mod+K", () => setOpen((prev) => !prev));

    const items: CommandItem[] = useMemo(() => {
        const collections = groupByCollection(themes);
        const result: CommandItem[] = [];
        for (const [collectionKey, collectionThemes] of collections) {
            for (const t of collectionThemes) {
                result.push({
                    id: t.meta.key,
                    label: t.meta.name,
                    group: collectionKey,
                    meta: t.meta.appearance,
                    selected: t.meta.key === currentThemeKey,
                    onSelect: () => onSelect(t.meta.key as ThemeKey),
                });
            }
        }
        return result;
    }, [themes, currentThemeKey, onSelect]);

    return (
        <CommandPalette
            items={items}
            open={open}
            onOpenChange={setOpen}
            placeholder="Search themes..."
            emptyMessage="No themes found."
        />
    );
}
