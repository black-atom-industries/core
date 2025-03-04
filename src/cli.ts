import log from "./lib/log.ts";
import adapt from "./commands/adapt.ts";
import adaptAll from "./commands/adapt-all.ts";
import { config } from "./config.ts";

if (import.meta.main) {
    const command = Deno.args[0];

    switch (command) {
        case "adapt":
            adapt(config.themeMap);
            break;

        case "adapt-all":
            adaptAll();
            break;

        case "-h":
        case "--help":
            log.menu();
            break;

        default:
            log.menu();
            Deno.exit(1);
    }
}
