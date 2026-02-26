import { dirname, join } from "@std/path";
import type { ThemeCollectionKey } from "./types/theme.ts";

export const config = {
    orgName: "black-atom-industries",
    adapterFileName: "black-atom-adapter.json",
    get dir() {
        return {
            core: Deno.cwd(),
            themes: join(Deno.cwd(), "src", "themes"),
            org: join(dirname(dirname(Deno.cwd())), this.orgName),
        };
    },
} as const;

/** Display order of collections in UIs and generated output. */
export const collectionOrder: ThemeCollectionKey[] = [
    "default",
    "jpn",
    "terra",
    "stations",
    "mnml",
];
