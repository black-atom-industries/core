import { assertEquals, assertThrows } from "jsr:@std/assert";
import { blend, darken, lighten } from "./color.ts";

Deno.test("blend() - basic blending", () => {
    // 50/50 blend
    assertEquals(blend({ fg: "#ff0000", bg: "#000000", alpha: 0.5 }), "#800000");

    // Full background (alpha = 0)
    assertEquals(blend({ fg: "#ff0000", bg: "#000000", alpha: 0 }), "#000000");

    // Full foreground (alpha = 1)
    assertEquals(blend({ fg: "#ff0000", bg: "#000000", alpha: 1 }), "#ff0000");
});

Deno.test("blend() - complex color blending", () => {
    // Blend red and blue
    assertEquals(blend({ fg: "#ff0000", bg: "#0000ff", alpha: 0.5 }), "#800080");

    // Blend with gray
    assertEquals(blend({ fg: "#ffffff", bg: "#808080", alpha: 0.5 }), "#c0c0c0");
});

Deno.test("blend() - edge cases", () => {
    // Same colors
    assertEquals(blend({ fg: "#123456", bg: "#123456", alpha: 0.5 }), "#123456");

    // White and black
    assertEquals(blend({ fg: "#ffffff", bg: "#000000", alpha: 0.25 }), "#404040");
});

Deno.test("blend() - invalid hex color throws error", () => {
    assertThrows(
        () => blend({ fg: "invalid", bg: "#000000", alpha: 0.5 }),
        Error,
        "Invalid hex color",
    );

    assertThrows(
        () => blend({ fg: "#ff0000", bg: "not-a-color", alpha: 0.5 }),
        Error,
        "Invalid hex color",
    );
});

Deno.test("darken() - default background (black)", () => {
    // Heavily darkened (90% black + 10% red)
    assertEquals(darken({ color: "#ff0000", amount: 0.1 }), "#1a0000");

    // Medium darkening (50% black + 50% red)
    assertEquals(darken({ color: "#ff0000", amount: 0.5 }), "#800000");

    // No darkening (100% original color)
    assertEquals(darken({ color: "#ff0000", amount: 1 }), "#ff0000");

    // Complete darkening (100% black)
    assertEquals(darken({ color: "#ff0000", amount: 0 }), "#000000");
});

Deno.test("darken() - custom background", () => {
    // Darken with custom dark gray background
    assertEquals(darken({ color: "#f44747", amount: 0.1, bg: "#1e1e1e" }), "#332222");

    // Darken with medium gray background
    assertEquals(darken({ color: "#ffffff", amount: 0.5, bg: "#808080" }), "#c0c0c0");
});

Deno.test("darken() - negative amount (should use absolute value)", () => {
    assertEquals(darken({ color: "#ff0000", amount: -0.5 }), "#800000");
});

Deno.test("lighten() - default foreground (white)", () => {
    // Heavily lightened (90% white + 10% red)
    assertEquals(lighten({ color: "#ff0000", amount: 0.1 }), "#ffe6e6");

    // Medium lightening (50% white + 50% red)
    assertEquals(lighten({ color: "#ff0000", amount: 0.5 }), "#ff8080");

    // No lightening (100% original color)
    assertEquals(lighten({ color: "#ff0000", amount: 1 }), "#ff0000");

    // Complete lightening (100% white)
    assertEquals(lighten({ color: "#ff0000", amount: 0 }), "#ffffff");
});

Deno.test("lighten() - custom foreground", () => {
    // Lighten with custom light gray foreground
    assertEquals(lighten({ color: "#000000", amount: 0.5, fg: "#e0e0e0" }), "#707070");
});

Deno.test("lighten() - negative amount (should use absolute value)", () => {
    assertEquals(lighten({ color: "#ff0000", amount: -0.5 }), "#ff8080");
});

Deno.test("color utilities - real-world examples", () => {
    // Subtle red background for diagnostics (dark theme)
    const darkBg = "#1e1e1e";
    const red = "#f44747";
    const subtleRedBg = darken({ color: red, amount: 0.2, bg: darkBg });
    assertEquals(subtleRedBg, "#492626");

    // Subtle red background for diagnostics (light theme)
    const lightBg = "#f5f5f5";
    const subtleRedBgLight = lighten({ color: red, amount: 0.2, fg: lightBg });
    assertEquals(subtleRedBgLight, "#f5d2d2");
});

Deno.test("color utilities - boundary values", () => {
    // Alpha = 0 and 1 should work as expected
    assertEquals(blend({ fg: "#abcdef", bg: "#123456", alpha: 0 }), "#123456");
    assertEquals(blend({ fg: "#abcdef", bg: "#123456", alpha: 1 }), "#abcdef");

    // Amount = 0 should give full darkening/lightening
    assertEquals(darken({ color: "#ff0000", amount: 0 }), "#000000");
    assertEquals(lighten({ color: "#ff0000", amount: 0 }), "#ffffff");
});

Deno.test("color utilities - hex format variations", () => {
    // Lowercase hex
    assertEquals(blend({ fg: "#ff0000", bg: "#000000", alpha: 0.5 }), "#800000");

    // Uppercase hex
    assertEquals(blend({ fg: "#FF0000", bg: "#000000", alpha: 0.5 }), "#800000");

    // Mixed case
    assertEquals(blend({ fg: "#Ff0000", bg: "#000000", alpha: 0.5 }), "#800000");
});
