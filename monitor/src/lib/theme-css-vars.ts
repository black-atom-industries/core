import type { ThemeDefinition } from "@core/types/theme.ts";

const PREFIX = "--ba";

/**
 * Recursively flattens a nested object into CSS custom properties.
 * Example: { ui: { bg: { default: "#fff" } } } → { "--ba-ui-bg-default": "#fff" }
 */
function flatten(obj: Record<string, unknown>, path: string[] = []): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
        const currentPath = [...path, key];

        if (typeof value === "string") {
            result[`${PREFIX}-${currentPath.join("-")}`] = value;
        } else if (typeof value === "object" && value !== null) {
            Object.assign(result, flatten(value as Record<string, unknown>, currentPath));
        }
    }

    return result;
}

/** Converts all theme color tokens into CSS custom properties. */
export function themeToCssVars(theme: ThemeDefinition): Record<string, string> {
    const { meta: _, ...colors } = theme;
    return flatten(colors);
}
