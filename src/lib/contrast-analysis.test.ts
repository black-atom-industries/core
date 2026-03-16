/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { INTENDED_PAIRINGS } from "./contrast-analysis.ts";

Deno.test("INTENDED_PAIRINGS has all expected categories", () => {
    const names = INTENDED_PAIRINGS.map((c) => c.name);
    assertEquals(names, [
        "Content on surfaces",
        "Interactive states",
        "Feedback",
        "Diff",
        "Contrast inversion",
    ]);
});

Deno.test("each pairing has fg and bg keys", () => {
    for (const category of INTENDED_PAIRINGS) {
        for (const pair of category.pairs) {
            assertEquals(typeof pair.fg, "string");
            assertEquals(typeof pair.bg, "string");
            assertEquals(pair.fg.startsWith("fg."), true, `${pair.fg} should start with fg.`);
            assertEquals(pair.bg.startsWith("bg."), true, `${pair.bg} should start with bg.`);
        }
    }
});
