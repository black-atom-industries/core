/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { collectionStats, orgStats, themeContrast } from "./stats.ts";

const darkTheme = {
    meta: {
        key: "test-dark",
        name: "Dark",
        appearance: "dark" as const,
        status: "release" as const,
        collection: { key: "default", label: "Default" },
    },
    ui: { fg: { default: "#c5cad0" }, bg: { default: "#1a1d23" } },
} as Parameters<typeof themeContrast>[0];

const lightTheme = {
    meta: {
        key: "test-light",
        name: "Light",
        appearance: "light" as const,
        status: "release" as const,
        collection: { key: "default", label: "Default" },
    },
    ui: { fg: { default: "#353230" }, bg: { default: "#f0ece7" } },
} as Parameters<typeof themeContrast>[0];

Deno.test("themeContrast returns ratio and WCAG level", () => {
    const result = themeContrast(darkTheme);
    assertEquals(typeof result.ratio, "number");
    assertEquals(result.ratio > 1, true);
    assertEquals(["AAA", "AA", "fail"].includes(result.level), true);
});

Deno.test("themeContrast uses ui.fg.default vs ui.bg.default", () => {
    const result = themeContrast(darkTheme);
    assertEquals(result.ratio > 7, true);
    assertEquals(result.level, "AAA");
});

Deno.test("collectionStats computes counts and avg contrast", () => {
    const result = collectionStats([darkTheme, lightTheme]);
    assertEquals(result.themeCount, 2);
    assertEquals(result.darkCount, 1);
    assertEquals(result.lightCount, 1);
    assertEquals(typeof result.avgContrast, "number");
    assertEquals(result.avgContrast > 1, true);
});

Deno.test("collectionStats with single theme", () => {
    const result = collectionStats([darkTheme]);
    assertEquals(result.themeCount, 1);
    assertEquals(result.darkCount, 1);
    assertEquals(result.lightCount, 0);
});

const jpnTheme = {
    meta: {
        key: "test-jpn",
        name: "Koyo",
        appearance: "dark" as const,
        status: "release" as const,
        collection: { key: "jpn", label: "JPN" },
    },
    ui: { fg: { default: "#c5cad0" }, bg: { default: "#1a1d23" } },
} as Parameters<typeof themeContrast>[0];

Deno.test("orgStats aggregates across all themes", () => {
    const result = orgStats([darkTheme, lightTheme, jpnTheme]);
    assertEquals(result.themeCount, 3);
    assertEquals(result.collectionCount, 2);
    assertEquals(result.darkCount, 2);
    assertEquals(result.lightCount, 1);
    assertEquals(typeof result.avgContrast, "number");
});
