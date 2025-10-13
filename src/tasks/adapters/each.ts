/**
 * Runs a command in each adapter repository
 * Similar to the `ford` command but specifically for adapter repos
 */

import { config } from "../../config.ts";
import log from "../../lib/log.ts";

async function runCommandInRepo(
    adapter: string,
    command: string[],
): Promise<{ success: boolean; code: number }> {
    const orgDir = config.dir.org;
    if (!orgDir) {
        throw new Error("Organization directory not found");
    }

    const adapterDir = `${orgDir}/${adapter}`;

    // Check if directory exists
    try {
        await Deno.stat(adapterDir);
    } catch {
        console.log(`Directory not found: ${adapterDir}`);
        return { success: false, code: 1 };
    }

    // Run the command with inherited stdio to preserve colors
    const cmd = new Deno.Command(command[0], {
        args: command.slice(1),
        cwd: adapterDir,
        stdout: "inherit",
        stderr: "inherit",
    });

    const { code } = await cmd.output();

    return {
        success: code === 0,
        code,
    };
}

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

    // Discover adapter repositories dynamically
    const adapters = await config.getAdapters();

    for (const adapter of adapters) {
        console.log(`📂 Running command in ${adapter}`);

        const result = await runCommandInRepo(adapter, args);

        if (!result.success) {
            console.log(`❌ Command failed (exit code: ${result.code})`);
        }

        console.log("─".repeat(80));
    }
}

if (import.meta.main) {
    main();
}
