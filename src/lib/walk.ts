type WalkKey = string | number | symbol;
type WalkPath = readonly WalkKey[];

interface WalkContext<LeafIn> {
    node: LeafIn;
    path: WalkPath;
}

export type WalkCallback<LeafIn, LeafOut> = (
    ctx: WalkContext<LeafIn>,
) => LeafOut;

/** Computes the output shape after walking a tree and transforming leaf nodes. */
type WalkResult<
    T,
    LeafIn,
    LeafOut,
> = T extends LeafIn ? LeafOut
    : T extends (infer U)[] ? WalkResult<U, LeafIn, LeafOut>[]
    : T extends object ? { [K in keyof T]: WalkResult<T[K], LeafIn, LeafOut> }
    : T;

function isWalkable(value: unknown): value is Record<PropertyKey, unknown> {
    if (typeof value !== "object" || value === null) return false;
    if (typeof value === "string") return false;
    if (typeof value === "number") return false;
    if (typeof value === "boolean") return false;
    if (typeof value === "symbol") return false;
    if (value instanceof Date) return false;
    if (value instanceof RegExp) return false;
    return true;
}

/** Default leaf predicate: true for everything that isWalkable returns false for. */
const defaultIsLeaf = (v: unknown): v is unknown => !isWalkable(v);

/**
 * Walk a tree structure and transform leaf nodes.
 *
 * Traverses `input` recursively in post-order (children before parent).
 * Calls `callback` only on nodes where `isLeaf` returns `true`.
 * Structural nodes (arrays, plain objects) are rebuilt without
 * calling `callback` — only their leaves are transformed.
 *
 * @typeParam T — Shape of the input value.
 * @typeParam LeafIn — Leaf type the callback receives.
 * @typeParam LeafOut — Leaf type the callback returns.
 *   The return type is `WalkResult<T, LeafIn, LeafOut>`, which recursively
 *   maps every `LeafIn` in `T` to `LeafOut` while preserving structure.
 *
 * When `isLeaf` is omitted, it defaults to matching everything that
 * isn't a walkable container (primitives, class instances, Date, RegExp).
 */
export function walk<T, LeafIn = unknown, LeafOut = unknown>(
    { input, callback, isLeaf = defaultIsLeaf as (value: unknown) => value is LeafIn }: {
        input: T;
        callback: WalkCallback<LeafIn, LeafOut>;
        isLeaf?: (value: unknown) => value is LeafIn;
    },
): WalkResult<T, LeafIn, LeafOut> {
    function visit(node: unknown, path: WalkPath): unknown {
        // Leaf: matches the isLeaf predicate — call the callback
        if (isLeaf(node)) {
            return callback({ node, path });
        }

        // Array: recurse without calling callback
        if (Array.isArray(node)) {
            return node.map((item, index) => visit(item, [...path, index]));
        }

        // Object: recurse without calling callback
        if (isWalkable(node)) {
            const next: Record<PropertyKey, unknown> = {};
            for (const key of Reflect.ownKeys(node)) {
                next[key] = visit(node[key], [...path, key]);
            }
            return next;
        }

        // Primitive: pass through unchanged
        return node;
    }

    return visit(input, []) as WalkResult<T, LeafIn, LeafOut>;
}
