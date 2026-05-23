import { walk, type WalkCallback } from "./walk.ts";
import type { ThemeDefinitionNext } from "../types/theme-next.ts";
import type { HexColor } from "../types/colors.ts";
import { Colordx } from "@colordx";

export function createThemeDefinition(
    input: ThemeDefinitionNext,
    cb: WalkCallback<Colordx, HexColor>,
): ThemeDefinitionNext<HexColor> {
    return {
        meta: input.meta,
        colors: walk({
            input: input.colors,
            callback: cb,
            isLeaf: (v): v is Colordx => v instanceof Colordx,
        }),
    };
}
