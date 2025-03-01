import log from "./lib/log.ts";
import generate from "./commands/generate.ts";
import generateAll from "./commands/generate-all.ts";
import { config } from "./config.ts";

if (import.meta.main) {
    const command = Deno.args[0];

    switch (command) {
        case "generate":
            generate(config.themeMap);
            break;
            
        case "generate-all":
            generateAll();
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
