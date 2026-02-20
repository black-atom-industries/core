import * as z from "zod";
import type { CollectionKey } from "../types/theme.ts";

/**
 * Factory function that creates the adapter config schema
 * @param themeKeys - Array of valid theme keys to validate against
 * @returns Zod schema for adapter configuration
 */
export function createAdapterConfigSchema(themeKeys: readonly string[]) {
    const collectionConfigSchema = z.object({
        template: z.string(),
        themes: z.array(z.enum(themeKeys as unknown as [string, ...string[]])).min(1),
    });

    // Create a type-safe collections schema that requires all CollectionKey values
    const collectionEntries: Record<CollectionKey, typeof collectionConfigSchema> = {
        default: collectionConfigSchema,
        jpn: collectionConfigSchema,
        stations: collectionConfigSchema,
        terra: collectionConfigSchema,
        mnml: collectionConfigSchema,
    };

    const collectionsSchema = z.object(collectionEntries).partial();

    return z.object({
        $schema: z.string(),
        enabled: z.boolean().optional().default(true),
        collections: collectionsSchema,
    });
}

export type AdapterConfig = z.infer<ReturnType<typeof createAdapterConfigSchema>>;
