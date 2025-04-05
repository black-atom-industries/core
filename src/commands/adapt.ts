import * as z from "@zod";

import { config } from "../config.ts";

import { AdapterConfig, adapterConfigSchema } from "../lib/validate-adapter.ts";
import log from "../lib/log.ts";
import { processTemplates } from "../lib/template.ts";
import { loadThemeMap } from "../lib/theme-loader.ts";

async function getAdapterConfig(): Promise<AdapterConfig> {
    try {
        const adapterConfig = await Deno.readTextFile(config.adapterFileName);
        return adapterConfigSchema.parse(JSON.parse(adapterConfig));
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            log.error(`No \`${config.adapterFileName}\` found in current directory. Abort.`);
            Deno.exit(1);
        }

        if (error instanceof z.ZodError) {
            log.error("Invalid adapter configuration!");
            console.dir(error.issues);
            Deno.exit(1);
        }

        throw error;
    }
}

export default async function () {
    const adapterConfig = await getAdapterConfig();
    const themeMap = await loadThemeMap(config.themePathMap);
    
    log.success("Adapter configuration loaded successfully.");
    
    // Log collection count
    if (adapterConfig.collections) {
        const collectionCount = Object.keys(adapterConfig.collections).length;
        const themeCountInCollections = Object.values(adapterConfig.collections)
            .filter(Boolean)
            .reduce((acc, collection) => acc + (collection?.themes.length || 0), 0);
            
        log.success(
            `Found ${collectionCount} collection${collectionCount !== 1 ? 's' : ''} with ${themeCountInCollections} theme${themeCountInCollections !== 1 ? 's' : ''}.`
        );
    } else {
        log.warn("No collections defined!");
        return;
    }
    
    // Process templates
    await processTemplates(adapterConfig, themeMap);
}
