import { assertEquals } from "@std/assert";
import { tint } from "./color.ts";

Deno.test("tint() - default base (black)", () => {
    // Heavy tint (90% black + 10% red)
    assertEquals(tint({ color: "#ff0000", amount: 0.1 }), "#030000");

    // Medium tint (50% black + 50% red)
    assertEquals(tint({ color: "#ff0000", amount: 0.5 }), "#630000");

    // Full tint color (100% original color)
    assertEquals(tint({ color: "#ff0000", amount: 1 }), "#ff0000");

    // No tint (100% base)
    assertEquals(tint({ color: "#ff0000", amount: 0 }), "#000000");
});

Deno.test("tint() - custom base color", () => {
    // Tint dark gray with red
    assertEquals(tint({ color: "#ff0000", amount: 0.15, with: "#1e1e1e" }), "#3e2521");

    // Tint with gray scale
    assertEquals(tint({ color: "#ffffff", amount: 0.25, with: "#000000" }), "#222222");
});

Deno.test("tint() - negative amount (should use absolute value)", () => {
    assertEquals(tint({ color: "#ff0000", amount: -0.5 }), "#630000");
});

Deno.test("tint() - real-world examples", () => {
    // Subtle red background for diagnostics (dark theme)
    const darkBg = "#2a2a2a";
    const red = "#ff0000";
    const subtleRedBg = tint({ color: red, amount: 0.2, with: darkBg });
    assertEquals(subtleRedBg, "#53312c");

    // Subtle red background for diagnostics (light theme)
    const lightBg = "#f0f0f0";
    const red2 = "#ff0000";
    const subtleRedBgLight = tint({ color: red2, amount: 0.2, with: lightBg });
    assertEquals(subtleRedBgLight, "#fbcfc7");
});

Deno.test("tint() - boundary values", () => {
    // Amount = 0 should give full base color
    assertEquals(tint({ color: "#ff0000", amount: 0 }), "#000000");
    assertEquals(tint({ color: "#ff0000", amount: 0, with: "#ffffff" }), "#ffffff");

    // Amount = 1 should give full tint color
    assertEquals(tint({ color: "#ff0000", amount: 1 }), "#ff0000");
    assertEquals(tint({ color: "#00ff00", amount: 1, with: "#ffffff" }), "#00ff00");
});

Deno.test("tint() - hex format variations", () => {
    // Lowercase hex
    assertEquals(tint({ color: "#ff0000", amount: 0.5 }), "#630000");

    // Uppercase hex
    assertEquals(tint({ color: "#FF0000", amount: 0.5 }), "#630000");

    // Mixed case
    assertEquals(tint({ color: "#Ff0000", amount: 0.5 }), "#630000");
});

Deno.test("tint() - OKLCH perceptual uniformity", () => {
    // OKLCH should produce perceptually uniform gradients
    // These tests verify the function works with various color combinations
    const teal = tint({ color: "#00ffff", amount: 0.3, with: "#000000" });
    const purple = tint({ color: "#ff00ff", amount: 0.3, with: "#0000ff" });

    // Just verify they're valid hex colors (start with # and have 6 hex digits)
    assertEquals(teal.match(/^#[0-9a-f]{6}$/i) !== null, true);
    assertEquals(purple.match(/^#[0-9a-f]{6}$/i) !== null, true);
});
