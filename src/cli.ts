import adapt from "./commands/adapt.ts";
import help from "./commands/help.ts";
import { config } from "./config.ts";

if (import.meta.main) {
    const command = Deno.args[0];

    switch (command) {
        case "adapt":
            adapt(config.themeMap);
            break;

        case "-h":
        case "--help":
            help();
            break;

        default:
            help();
            Deno.exit(1);
    }
}
