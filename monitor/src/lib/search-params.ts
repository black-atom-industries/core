import { z } from "zod";
import { fallback } from "@tanstack/zod-adapter";
import { DEFAULT_THEME_KEY, themeKeys } from "@core/types/theme.ts";

export const rootSearchSchema = z.object({
    themeKey: fallback(z.enum(themeKeys), DEFAULT_THEME_KEY).default(DEFAULT_THEME_KEY),
});

export type RootSearchParams = z.infer<typeof rootSearchSchema>;

export const rootSearchDefaults = rootSearchSchema.parse({});
