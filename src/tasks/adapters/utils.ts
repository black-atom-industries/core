import * as colors from "@std/fmt/colors";
import { dirname, join } from "@std/path";
import { existsSync } from "@std/fs";
import { config } from "../../config.ts";
import log from "../../lib/log.ts";

/**
 * Additional options for running commands beyond Deno.CommandOptions
 */
export interface RunCommandOptions extends Deno.CommandOptions {
    /** Expected exit codes that should not be treated as errors */
    expectedExitCodes?: number[];
}

/**
 * Run a command and return its output
 * For certain Git commands like `git diff --staged --quiet`, we need to handle
 * exit code 1 differently (it's expected for indicating changes)
 */
export async function runCommand(
    command: string[],
    options: RunCommandOptions = {},
): Promise<string> {
    const { expectedExitCodes = [], ...commandOptions } = options;

    try {
        const process = new Deno.Command(command[0], {
            args: command.slice(1),
            stdout: "piped",
            stderr: "piped",
            ...commandOptions,
        });

        const output = await process.output();
        const stdout = new TextDecoder().decode(output.stdout);
        const stderr = new TextDecoder().decode(output.stderr);

        // For git diff --quiet, it returns exit code 1 when there are changes,
        // which we don't want to treat as an error
        const isGitDiffQuiet = command[0] === "git" &&
            command.includes("diff") &&
            command.includes("--quiet");

        const isExpectedExitCode = expectedExitCodes.includes(output.code);

        if (!output.success && !isGitDiffQuiet && !isExpectedExitCode) {
            throw new Error(`Command failed with exit code ${output.code}: ${stderr}`);
        }

        return stdout;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        // Explicitly rethrow the error to propagate it
        throw new Error(`Failed to run command ${command.join(" ")}: ${errorMessage}`);
    }
}

/**
 * Prompt the user for confirmation
 */
export async function getUserConfirmation(message: string): Promise<boolean> {
    const buf = new Uint8Array(1);
    await Deno.stdout.write(new TextEncoder().encode(message));
    await Deno.stdin.read(buf);
    const response = new TextDecoder().decode(buf).toLowerCase();
    return response === "y";
}

/**
 * Function to process each adapter repository
 */
interface AdapterCallbackResult {
    /** Whether to continue with the next adapter */
    continue?: boolean;
    /** Custom message to log */
    message?: string;
}

/**
 * Type for the adapter operation callback
 */
type AdapterOperationCallback = (params: {
    adapter: string;
    adapterDir: string;
    adapterName: string;
}) => Promise<AdapterCallbackResult | void>;

/**
 * Execute an operation on each adapter repository
 *
 * This handles common tasks like:
 * - Directory resolution and validation
 * - Logging
 * - Error handling
 *
 * @param callback Function to execute for each adapter
 */
export async function forEachAdapter(
    callback: AdapterOperationCallback,
): Promise<void> {
    // Resolve organization directory
    const orgDir = config.dir.org || join(dirname(config.dir.core), config.orgName);

    if (!existsSync(orgDir)) {
        log.error(`🔥 Organization directory not found: ${orgDir}`);
        log.error(
            `Please ensure you are running this command from within the ${
                colors.green("Black Atom Core")
            }(${config.dir.core}) directory!`,
        );
        Deno.exit(1);
    }

    // Discover adapter repositories dynamically
    const adapters = await config.getAdapters();

    // Iterate through each adapter
    for (const adapter of adapters) {
        const adapterName = colors.bold(colors.brightMagenta(adapter));
        const adapterDir = join(orgDir, adapter);

        // Check if adapter directory exists
        if (!existsSync(adapterDir)) {
            log.warn(`Adapter directory not found: ${adapterDir} - skipping`);
            continue;
        }

        try {
            // Execute the callback function with the adapter directory path
            const result = await callback({
                adapter,
                adapterDir,
                adapterName,
            });

            // Check if we should continue
            if (result && result.continue === false) {
                if (result.message) {
                    log.info(result.message);
                }
                continue;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            log.error(`Error processing adapter ${adapter}: ${errorMessage}`);
        }
    }
}
