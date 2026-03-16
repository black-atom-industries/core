/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { themeToCssVars } from "./theme-css-vars.ts";
import type { ThemeDefinition } from "@core/types/theme.ts";

const minimalTheme = {
    meta: {
        key: "test",
        name: "Test",
        appearance: "dark",
        status: "release",
        collection: { key: "default", label: "Default" },
    },
    primaries: {
        d10: "#010101",
        d20: "#020202",
        d30: "#030303",
        d40: "#040404",
        m10: "#050505",
        m20: "#060606",
        m30: "#070707",
        m40: "#080808",
        l10: "#090909",
        l20: "#0a0a0a",
        l30: "#0b0b0b",
        l40: "#0c0c0c",
    },
    palette: {
        black: "#000",
        gray: "#888",
        red: "#f00",
        darkRed: "#a00",
        yellow: "#ff0",
        darkYellow: "#aa0",
        green: "#0f0",
        darkGreen: "#0a0",
        cyan: "#0ff",
        darkCyan: "#0aa",
        blue: "#00f",
        darkBlue: "#00a",
        magenta: "#f0f",
        darkMagenta: "#a0a",
        lightGray: "#ccc",
        white: "#fff",
    },
    ui: { bg: { default: "#111", panel: "#222" }, fg: { default: "#eee", subtle: "#999" } },
    syntax: { variable: { default: "#abc", builtin: "#def" } },
} as unknown as ThemeDefinition;

Deno.test("themeToCssVars generates primaries vars", () => {
    const vars = themeToCssVars(minimalTheme);
    assertEquals(vars["--ba-primaries-d10" as keyof typeof vars], "#010101");
    assertEquals(vars["--ba-primaries-l40" as keyof typeof vars], "#0c0c0c");
});

Deno.test("themeToCssVars generates palette vars", () => {
    const vars = themeToCssVars(minimalTheme);
    assertEquals(vars["--ba-palette-red" as keyof typeof vars], "#f00");
    assertEquals(vars["--ba-palette-white" as keyof typeof vars], "#fff");
});

Deno.test("themeToCssVars generates ui vars", () => {
    const vars = themeToCssVars(minimalTheme);
    assertEquals(vars["--ba-ui-bg-default" as keyof typeof vars], "#111");
    assertEquals(vars["--ba-ui-fg-subtle" as keyof typeof vars], "#999");
});

Deno.test("themeToCssVars generates nested syntax vars", () => {
    const vars = themeToCssVars(minimalTheme);
    assertEquals(vars["--ba-syntax-variable-default" as keyof typeof vars], "#abc");
    assertEquals(vars["--ba-syntax-variable-builtin" as keyof typeof vars], "#def");
});

Deno.test("themeToCssVars excludes meta", () => {
    const vars = themeToCssVars(minimalTheme);
    const keys = Object.keys(vars);
    assertEquals(keys.some((k) => k.includes("meta")), false);
});
