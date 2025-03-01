import { config } from "../config.ts";
import log from "./log.ts";

function generateSchema() {
    const properties: Record<string, unknown> = {
        "$schema": {
            type: "string",
            description: "The JSON Schema URL",
        },
    };

    for (const key of config.themeKeys) {
        properties[key] = { "$ref": "#/$defs/templateConfig" };
    }

    const anyOf = config.themeKeys.map((key) => ({
        required: [key],
    }));

    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Black Atom Adapter Configuration",
        "description": "Configuration schema for Black Atom theme adapters",
        "type": "object",
        "properties": properties,
        "required": ["$schema"],
        "additionalProperties": false,
        "minProperties": 2,
        "anyOf": anyOf,
        "$defs": {
            "templateConfig": {
                "type": "object",
                "properties": {
                    "templates": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "description": "Path to a template file",
                        },
                        "minItems": 1,
                    },
                },
                "required": ["templates"],
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
