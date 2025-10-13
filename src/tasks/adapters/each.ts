/**
 * Runs a command in each adapter repository
 * Similar to the `ford` command but specifically for adapter repos
 */

import log from "../../lib/log.ts";
import { getAdapters } from "../../lib/discover-adapters.ts";
import { forEachAdapter } from "./forEachAdapter.ts";

async function main() {
    const args = Deno.args;

    if (args.length === 0) {
        log.error("No command provided");
        console.log("\nUsage: deno task adapters:each <command> [args...]");
        console.log("\nExamples:");
        console.log("  deno task adapters:each git status");
        console.log("  deno task adapters:each git add -A");
        console.log('  deno task adapters:each git commit -m "update themes"');
        console.log("  deno task adapters:each ls -la");
        Deno.exit(1);
    }

    const adapters = await getAdapters();

    await forEachAdapter({
        adapters,
        cb: async ({ adapter, adapterDir }) => {
            console.log(`📂 Running command in ${adapter}`);

            const cmd = new Deno.Command(args[0], {
                args: args.slice(1),
                cwd: adapterDir,
                stdout: "inherit",
                stderr: "inherit",
            });

            const output = await cmd.output();

            if (output.code !== 0) {
                console.log(`❌ Command failed (exit code: ${output.code})`);
            }

            console.log("─".repeat(80));
        },
    });
}

if (import.meta.main) {
    main();
}
