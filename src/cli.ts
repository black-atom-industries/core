import adapt from "./commands/adapt.ts";
import help from "./commands/help.ts";

if (import.meta.main) {
    const command = Deno.args[0];
    const options = Deno.args.slice(1);

    switch (command) {
        case "adapt":
            adapt(options);
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
