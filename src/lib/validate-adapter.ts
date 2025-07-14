import * as z from "@zod";
import { config } from "../config.ts";
import type { CollectionKey } from "../types/theme.ts";

const collectionConfigSchema = z.object({
    template: z.string(),
    themes: z.array(z.enum(config.themeKeys as unknown as [string, ...string[]])).min(1),
});

export type CollectionConfig = z.infer<typeof collectionConfigSchema>;

// Create a type-safe collections schema that requires all CollectionKey values
const createCollectionsSchema = () => {
    // This ensures we have a schema entry for each collection key
    const collectionEntries: Record<CollectionKey, typeof collectionConfigSchema> = {
        jpn: collectionConfigSchema,
        stations: collectionConfigSchema,
        terra: collectionConfigSchema,
        north: collectionConfigSchema,
        mnml: collectionConfigSchema,
    };

    return z.object(collectionEntries).partial();
};

const collectionsSchema = createCollectionsSchema();

export const adapterConfigSchema = z.object({
    $schema: z.string(),
    collections: collectionsSchema,
});

export type AdapterConfig = z.infer<typeof adapterConfigSchema>;
