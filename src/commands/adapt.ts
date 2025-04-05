import * as z from "@zod";

import { config } from "../config.ts";
import { Key } from "../types/theme.ts";

import { AdapterConfig, adapterConfigSchema, TemplateConfig } from "../lib/validate-adapter.ts";
import log from "../lib/log.ts";
import { processThemeTemplates } from "../lib/template.ts";
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
    const { $schema: _, ...configs } = adapterConfig;

    log.success(
        `Adapter configuration loaded successfully. Found ${
            Object.keys(configs).length
        } theme keys.`,
    );

    const configEntries = Object.entries(configs) as [Key, TemplateConfig][];

    if (configEntries.length === 0) {
        log.warn("No theme keys defined!");
        return;
    }

    for (const [themeKey, templateConfig] of configEntries) {
        await processThemeTemplates(themeKey, templateConfig.templates, themeMap);
    }
}
