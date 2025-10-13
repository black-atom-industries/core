import { join } from "@std/path";
import { existsSync } from "@std/fs";
import * as colors from "@std/fmt/colors";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";

interface AdapterInfo {
    /** Adapter name (directory name) */
    adapter: string;
    /** Full path to adapter directory */
    adapterDir: string;
}

type AdapterCallback<T = void> = (info: AdapterInfo) => Promise<T>;

interface Args<AdapterCallbackReturn = void> {
    /** Array of adapter names to iterate over */
    adapters: string[];
    /** Callback function to execute for each adapter */
    cb: AdapterCallback<AdapterCallbackReturn>;
}

/**
 * Execute an operation on each adapter repository
 *
 * This is a simple, generic iterator that:
 * - Resolves directory paths for each adapter
 * - Validates directories exist
 * - Executes callback for each adapter
 * - Returns results array
 *
 * Error handling and adapter discovery are left to the consumer for maximum flexibility.
 *
 * @param options - Configuration object with adapters array and callback
 * @returns Array of results from each callback execution
 */
export async function forEachAdapter<AdapterCallbackReturn>({
    adapters,
    cb,
}: Args<AdapterCallbackReturn>): Promise<AdapterCallbackReturn[]> {
    const orgDir = config.dir.org;

    if (!existsSync(orgDir)) {
        log.error(`🔥 Organization directory not found: ${orgDir}`);
        log.error(
            `Please ensure you are running this command from within the ${
                colors.green("Black Atom Core")
            }(${config.dir.core}) directory!`,
        );
        Deno.exit(1);
    }

    const results: AdapterCallbackReturn[] = [];

    // Iterate through each adapter
    for (const adapter of adapters) {
        const adapterDir = join(orgDir, adapter);

        // Check if adapter directory exists
        if (!existsSync(adapterDir)) {
            log.warn(`Adapter directory not found: ${adapterDir} - skipping`);
            continue;
        }

        // Execute the callback function
        const result = await cb({ adapter, adapterDir });
        results.push(result);
    }

    return results;
}
