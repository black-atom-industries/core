import { createRootRoute, retainSearchParams, stripSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { AppContainer } from "../containers/app";

import { z } from "zod";
import { fallback } from "@tanstack/zod-adapter";
import { DEFAULT_THEME_KEY, themeKeys } from "@core/types/theme.ts";

const rootSearchSchema = z.object({
    themeKey: fallback(z.enum(themeKeys), DEFAULT_THEME_KEY).default(DEFAULT_THEME_KEY),
});

const rootSearchDefaults = rootSearchSchema.parse({});

export const Route = createRootRoute({
    component: AppContainer,
    validateSearch: zodValidator(rootSearchSchema),
    search: {
        middlewares: [
            stripSearchParams(rootSearchDefaults),
            retainSearchParams(["themeKey"]),
        ],
    },
});
