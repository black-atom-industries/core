import { assertEquals } from "@std/assert";
import { Colordx } from "@colordx";
import { walk } from "./walk.ts";

const isColordx = (v: unknown): v is Colordx => v instanceof Colordx;

Deno.test("walk: primitives pass through unchanged", () => {
    assertEquals(walk({ input: 42, callback: ({ node }) => node.toHex(), isLeaf: isColordx }), 42);
    assertEquals(
        walk({ input: "hello", callback: ({ node }) => node.toHex(), isLeaf: isColordx }),
        "hello",
    );
    assertEquals(
        walk({ input: null, callback: ({ node }) => node.toHex(), isLeaf: isColordx }),
        null,
    );
    assertEquals(
        walk({ input: undefined, callback: ({ node }) => node.toHex(), isLeaf: isColordx }),
        undefined,
    );
});

Deno.test("walk: plain objects recurse without calling callback", () => {
    const result = walk({
        input: { a: 1, b: 2 },
        callback: ({ node }) => node.toHex(),
        isLeaf: isColordx,
    });
    assertEquals(result, { a: 1, b: 2 });
});

Deno.test("walk: arrays recurse without calling callback", () => {
    const result = walk({
        input: [1, 2, 3],
        callback: ({ node }) => node.toHex(),
        isLeaf: isColordx,
    });
    assertEquals(result, [1, 2, 3]);
});

Deno.test("walk: leaf predicate determines callback trigger", () => {
    const red = new Colordx("oklch(0.5 0.1 0)");
    const result = walk({ input: red, callback: ({ node }) => node.toHex(), isLeaf: isColordx });
    assertEquals(typeof result, "string");
    assertEquals(result, red.toHex());
});

Deno.test("walk: nested mixed structures recurse, leaves converted", () => {
    const red = new Colordx("oklch(0.5 0.1 0)");
    const blue = new Colordx("oklch(0.5 0.1 240)");

    const input = {
        colors: {
            bg: red,
            fg: blue,
            tokens: {
                primary: { a: [red, blue] },
            },
        },
    };

    const result = walk({ input, callback: ({ node }) => node.toHex(), isLeaf: isColordx });
    const parsed = JSON.parse(JSON.stringify(result));

    assertEquals(parsed.colors.bg, red.toHex());
    assertEquals(parsed.colors.fg, blue.toHex());
    assertEquals(parsed.colors.tokens.primary.a, [red.toHex(), blue.toHex()]);
});

Deno.test("walk: path is tracked correctly for leaf nodes", () => {
    const red = new Colordx("oklch(0.5 0.1 0)");
    const blue = new Colordx("oklch(0.5 0.1 240)");
    const paths: (string | number | symbol)[][] = [];

    walk({
        input: { a: { b: [red, blue] } },
        callback: ({ node, path }) => {
            paths.push([...path]);
            return node.toHex();
        },
        isLeaf: isColordx,
    });

    assertEquals(paths, [["a", "b", 0], ["a", "b", 1]]);
});

Deno.test("walk: Symbol keys are preserved in objects", () => {
    const sym = Symbol("test");
    const input = { [sym]: 42 };
    const result = walk({ input, callback: ({ node }) => node.toHex(), isLeaf: isColordx });

    assertEquals((result as Record<symbol, unknown>)[sym], 42);
});

Deno.test("walk: RegExp is treated as a leaf, not descended into", () => {
    const re = /hello/gi;
    const result = walk({ input: re, callback: ({ node }) => node.toHex(), isLeaf: isColordx });

    assertEquals(result, re);
});

Deno.test("walk: Date is treated as a leaf, not descended into", () => {
    const date = new Date("2026-01-01");
    const result = walk({ input: date, callback: ({ node }) => node.toHex(), isLeaf: isColordx });

    assertEquals(result, date);
});

Deno.test("walk: different isLeaf predicate with non-standard leaf type", () => {
    const isNumber = (v: unknown): v is number => typeof v === "number";
    const input = { a: 1, b: "hello", c: [2, 3] };
    const result = walk({ input, callback: ({ node }) => node * 2, isLeaf: isNumber });

    assertEquals(result, { a: 2, b: "hello", c: [4, 6] });
});
