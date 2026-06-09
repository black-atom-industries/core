/**
 * Generic command runner for the Black Atom organization.
 *
 * Runs the same command in every repository in the org (core + all adapters)
 * with streaming I/O so interactive commands (lazygit, vim, etc.) work.
 *
 * Usage:
 *   deno task org "git status"
 *   deno task org "git commit -m 'message'"
 *   deno task org "git commit --amend --no-edit"
 *   deno task org "git push"
 *   deno task org "lazygit"
 */

import { join } from "@std/path";
import { config } from "../config.ts";
import { getAdapters } from "../lib/discover-adapters.ts";
import log from "../lib/log.ts";

interface RepoTarget {
    name: string;
    cwd: string;
    kind: "core" | "adapter";
}

/**
 * Parse a command string into argv.
 *
 * Splits on whitespace and respects single- and double-quoted segments as
 * a single argument. Quotes are stripped from the output. Mixed quoted and
 * unquoted segments are supported.
 *
 * Examples:
 *   "git status"                        → ["git", "status"]
 *   "git commit -m 'fix: thing'"         → ["git", "commit", "-m", "fix: thing"]
 *   'git commit -m "with spaces"'       → ["git", "commit", "-m", "with spaces"]
 *   ""                                  → []
 *   "   "                               → []
 */
export function parseCommand(commandStr: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuote: '"' | "'" | null = null;
    let hasToken = false;

    for (let i = 0; i < commandStr.length; i++) {
        const c = commandStr[i];

        if (inQuote) {
            if (c === inQuote) {
                inQuote = null;
            } else {
                current += c;
            }
            continue;
        }

        if (c === '"' || c === "'") {
            inQuote = c;
            hasToken = true;
            continue;
        }

        if (c === " " || c === "\t" || c === "\n") {
            if (hasToken) {
                result.push(current);
                current = "";
                hasToken = false;
            }
            continue;
        }

        current += c;
        hasToken = true;
    }

    if (hasToken) {
        result.push(current);
    }

    return result;
}

async function listRepositories(): Promise<RepoTarget[]> {
    const coreDir = config.dir.core;
    const orgDir = config.dir.org;
    const adapterNames = await getAdapters();

    return [
        { name: "core", cwd: coreDir, kind: "core" },
        ...adapterNames.map((name) => ({
            name,
            cwd: join(orgDir, name),
            kind: "adapter" as const,
        })),
    ];
}

async function runInRepo(repo: RepoTarget, cmd: string, args: string[]): Promise<number> {
    log.hr_thin(` ${repo.kind} → ${repo.name} `);

    try {
        const proc = new Deno.Command(cmd, {
            args,
            cwd: repo.cwd,
            stdout: "inherit",
            stderr: "inherit",
            stdin: "inherit",
        });

        const output = await proc.output();
        return output.code;
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        log.error(`Failed to start command: ${msg}`);
        return 1;
    }
}

function printUsage(): void {
    console.log("");
    console.log('Usage: deno task org "<command>"');
    console.log("");
    console.log("Runs the given command in core and every adapter repository.");
    console.log("Streams stdout/stderr/stdin directly, so interactive commands work.");
    console.log("");
    console.log("Examples:");
    console.log('  deno task org "git status"');
    console.log("  deno task org \"git commit -m 'message'\"");
    console.log('  deno task org "git commit --amend --no-edit"');
    console.log('  deno task org "git push"');
    console.log('  deno task org "lazygit"');
    console.log("");
}

async function main(): Promise<void> {
    const commandStr = Deno.args.join(" ").trim();

    if (commandStr === "") {
        log.error("No command provided");
        printUsage();
        Deno.exit(1);
    }

    const argv = parseCommand(commandStr);

    if (argv.length === 0) {
        log.error("Empty command");
        printUsage();
        Deno.exit(1);
    }

    const [cmd, ...cmdArgs] = argv;
    const repos = await listRepositories();

    log.hr_thick(` Running in ${repos.length} repositories `);
    log.info(`Command: ${cmd} ${cmdArgs.join(" ")}`);
    console.log("");

    const failures: { repo: string; code: number }[] = [];

    for (const repo of repos) {
        const code = await runInRepo(repo, cmd, cmdArgs);
        if (code !== 0) {
            failures.push({ repo: repo.name, code });
        }
    }

    console.log("");
    log.hr_thick(" Summary ");

    if (failures.length === 0) {
        log.success(`${cmd} succeeded in all ${repos.length} repositories`);
    } else {
        log.error(`${failures.length}/${repos.length} repositories failed:`);
        for (const f of failures) {
            console.log(`  - ${f.repo} (exit ${f.code})`);
        }
        Deno.exit(1);
    }
}

if (import.meta.main) {
    await main();
}
