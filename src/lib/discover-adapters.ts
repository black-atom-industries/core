/**
 * Discovers adapter repositories by looking for black-atom-adapter.json files
 */

import { dirname, join } from "@std/path";
import { themeKeys } from "../types/theme.ts";
import { createAdapterConfigSchema } from "./validate-adapter.ts";

/**
 * Organization name for Black Atom Industries
 */
const ORG_NAME = "black-atom-industries";

/**
 * Discovers all enabled adapter repositories in the organization directory
 * An adapter is any directory that contains a black-atom-adapter.json file with enabled: true (or enabled not specified)
 */
export async function discoverAdapters(orgDir: string): Promise<string[]> {
    const adapters: string[] = [];
    const adapterConfigSchema = createAdapterConfigSchema(themeKeys);

    try {
        // Read all entries in the organization directory
        for await (const entry of Deno.readDir(orgDir)) {
            // Skip if not a directory
            if (!entry.isDirectory) continue;

            // Skip the core directory
            if (entry.name === "core") continue;

            // Skip hidden directories
            if (entry.name.startsWith(".")) continue;

            // Check if black-atom-adapter.json exists
            const adapterFilePath = join(orgDir, entry.name, "black-atom-adapter.json");
            try {
                await Deno.stat(adapterFilePath);

                // Read and parse the adapter config with Zod validation
                const configText = await Deno.readTextFile(adapterFilePath);
                const config = adapterConfigSchema.parse(JSON.parse(configText));

                // Only include if enabled (defaults to true if not specified)
                if (config.enabled !== false) {
                    adapters.push(entry.name);
                }
            } catch {
                // File doesn't exist or is invalid, skip this adapter
                continue;
            }
        }
    } catch (error) {
        throw new Error(`Failed to discover adapters: ${error}`);
    }

    return adapters.sort(); // Sort alphabetically for consistency
}

/**
 * Convenience function to get adapters using the current working directory
 * Resolves the organization directory relative to core and discovers adapters
 */
export async function getAdapters(): Promise<string[]> {
    const coreDir = Deno.cwd();
    const orgDir = join(dirname(dirname(coreDir)), ORG_NAME);
    return await discoverAdapters(orgDir);
}
