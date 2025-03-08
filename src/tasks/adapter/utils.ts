/**
 * Run a command and return its output
 * For certain Git commands like `git diff --staged --quiet`, we need to handle
 * exit code 1 differently (it's expected for indicating changes)
 */
export async function runCommand(command: string[]): Promise<string> {
    try {
        const process = new Deno.Command(command[0], {
            args: command.slice(1),
            stdout: "piped",
            stderr: "piped",
        });

        const output = await process.output();
        const stdout = new TextDecoder().decode(output.stdout);
        const stderr = new TextDecoder().decode(output.stderr);

        // For git diff --quiet, it returns exit code 1 when there are changes,
        // which we don't want to treat as an error
        const isGitDiffQuiet = command[0] === "git" &&
            command.includes("diff") &&
            command.includes("--quiet");

        if (!output.success && !isGitDiffQuiet) {
            throw new Error(`Command failed: ${stderr}`);
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
