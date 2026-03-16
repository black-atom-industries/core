/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { groupByCollection } from "./theme-utils.ts";
import type { ThemeDefinition } from "@core/types/theme.ts";

const makeTheme = (key: string, collection: string) =>
    ({
        meta: {
            key,
            name: key,
            appearance: "dark",
            status: "release",
            collection: { key: collection, label: collection },
        },
    }) as unknown as ThemeDefinition;

Deno.test("groupByCollection groups themes by collection key", () => {
    const themes = [
        makeTheme("a", "default"),
        makeTheme("b", "jpn"),
        makeTheme("c", "default"),
    ];
    const result = groupByCollection(themes);
    assertEquals(result.size, 2);
    assertEquals(result.get("default")?.length, 2);
    assertEquals(result.get("jpn")?.length, 1);
});

Deno.test("groupByCollection preserves insertion order", () => {
    const themes = [
        makeTheme("a", "jpn"),
        makeTheme("b", "default"),
    ];
    const keys = Array.from(groupByCollection(themes).keys());
    assertEquals(keys[0], "jpn");
    assertEquals(keys[1], "default");
});

Deno.test("groupByCollection returns empty map for empty input", () => {
    assertEquals(groupByCollection([]).size, 0);
});
