import { z } from "zod";
import { fallback } from "@tanstack/zod-adapter";

export const rootSearchSchema = z.object({
    theme: fallback(z.string(), "").default(""),
});

export type RootSearchParams = z.infer<typeof rootSearchSchema>;

export const rootSearchDefaults = {
    theme: "",
} as const satisfies RootSearchParams;

export const rootSearchKeys = Object.keys(rootSearchDefaults) as Array<
    keyof typeof rootSearchDefaults
>;
