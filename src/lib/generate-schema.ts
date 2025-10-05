import { config } from "../config.ts";
import log from "./log.ts";

function generateSchema() {
    // Extract collection keys from theme keys
    const collections = new Set<string>();

    for (const themeKey of config.themeKeys) {
        // Extract collection from theme key pattern: black-atom-{collection}-...
        const parts = themeKey.split("-");
        if (parts.length >= 3) {
            const collectionKey = parts[2];
            collections.add(collectionKey);
        }
    }

    const collectionProperties: Record<string, unknown> = {};
    for (const collectionKey of collections) {
        collectionProperties[collectionKey] = {
            "$ref": "#/$defs/collectionConfig",
        };
    }

    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Black Atom Adapter Configuration",
        "description": "Configuration schema for Black Atom theme adapters",
        "type": "object",
        "properties": {
            "$schema": {
                "type": "string",
                "description": "The JSON Schema URL",
            },
            "collections": {
                "type": "object",
                "properties": collectionProperties,
                "additionalProperties": false,
                "minProperties": 1,
            },
        },
        "required": ["$schema", "collections"],
        "additionalProperties": false,
        "$defs": {
            "collectionConfig": {
                "type": "object",
                "properties": {
                    "template": {
                        "type": "string",
                        "description": "Path to the collection template file",
                    },
                    "themes": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "description": "Theme key from the core theme definitions",
                        },
                        "minItems": 1,
                    },
                },
                "required": ["template", "themes"],
                "additionalProperties": false,
            },
        },
    };

    // Write the schema to adapter.schema.json
    Deno.writeTextFileSync(
        "adapter.schema.json",
        JSON.stringify(schema, null, 2),
    );

    log.success("Schema generated successfully!");
}

generateSchema();
