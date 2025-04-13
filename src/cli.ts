import generate from "./commands/generate.ts";
import help from "./commands/help.ts";

if (import.meta.main) {
    const command = Deno.args[0];
    const options = Deno.args.slice(1);

    switch (command) {
        case "generate":
            generate(options);
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
