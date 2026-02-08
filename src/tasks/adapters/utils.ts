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
    const buf = new Uint8Array(64);
    await Deno.stdout.write(new TextEncoder().encode(message));
    const n = await Deno.stdin.read(buf);
    const response = n ? new TextDecoder().decode(buf.subarray(0, n)).trim().toLowerCase() : "";
    return response === "y";
}
