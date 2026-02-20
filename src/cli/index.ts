/**
 * @module
 *
 * CLI entrypoint for Black Atom Core theme generation.
 *
 * Run from an adapter repository to generate platform-specific theme files
 * from templates and core theme definitions.
 *
 * @example
 * ```sh
 * deno run -A jsr:@black-atom/core/cli generate
 * deno run -A jsr:@black-atom/core/cli generate --watch
 * ```
 */

import generate from "./generate.ts";
import help from "./help.ts";

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
