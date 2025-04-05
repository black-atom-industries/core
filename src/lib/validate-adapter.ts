import * as z from "@zod";
import { config } from "../config.ts";

const collectionConfigSchema = z.object({
    template: z.string(),
    themes: z.array(z.enum(config.themeKeys as unknown as [string, ...string[]])).min(1),
});

export type CollectionConfig = z.infer<typeof collectionConfigSchema>;

const collectionsSchema = z.object({
    jpn: collectionConfigSchema,
    crbn: collectionConfigSchema,
    stations: collectionConfigSchema,
    terra: collectionConfigSchema,
}).partial();

export const adapterConfigSchema = z.object({
    $schema: z.string(),
    collections: collectionsSchema,
});

export type AdapterConfig = z.infer<typeof adapterConfigSchema>;
