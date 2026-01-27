import { dirname, join } from "@std/path";

import * as Theme from "./types/theme.ts";
import { themeKeys } from "./types/theme.ts";

export type Config = {
    dir: {
        core: string;
        themes: string;
        org: string; // Organization directory (parent of core)
    };
    adapterFileName: string;
    themeKeys: readonly Theme.Key[];
    orgName: string; // Organization directory name
};

export const config: Config = {
    orgName: "black-atom-industries",
    get dir() {
        return {
            core: Deno.cwd(),
            themes: join(Deno.cwd(), "src", "themes"),
            org: join(dirname(dirname(Deno.cwd())), this.orgName),
        };
    },
    adapterFileName: "black-atom-adapter.json",
    themeKeys,
};
