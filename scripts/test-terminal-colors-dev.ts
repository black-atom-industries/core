import { join } from "@std/path";

/**
 * Watches src/themes/ for changes and re-runs the terminal color test.
 *
 * Ghostty: Config is auto-reloaded after each change (via SIGUSR2).
 * Other terminals: Manual config reload is required after changes.
 */

const scriptDir = import.meta.dirname!;
const repoRoot = join(scriptDir, "..");
const themesDir = join(repoRoot, "src", "themes");
const testScript = join(scriptDir, "test-terminal-colors.sh");

const args = Deno.args.filter((a) => a !== "--capture");
const themeName = args[0] || "";
const capture = Deno.args.includes("--capture");

const cmd = [testScript, ...(themeName ? [themeName] : []), ...(capture ? ["--capture"] : [])];

async function run() {
    const command = new Deno.Command(cmd[0], {
        args: cmd.slice(1),
        stdout: "inherit",
        stderr: "inherit",
    });
    await command.output();
}

/**
 * Reload Ghostty configuration.
 * Uses SIGUSR2 signal (Ghostty 1.2.0+) with AppleScript menu fallback on macOS.
 */
async function reloadGhostty() {
    try {
        // Try SIGUSR2 signal (Ghostty 1.2.0+)
        const pkill = new Deno.Command("pkill", {
            args: ["-SIGUSR2", "ghostty"],
            stdout: "null",
            stderr: "null",
        });
        const result = await pkill.output();
        if (result.success) return;
    } catch {
        // pkill not available or failed
    }

    // Fallback: AppleScript on macOS
    if (Deno.build.os === "darwin") {
        try {
            const osascript = new Deno.Command("osascript", {
                args: [
                    "-e",
                    `tell application "System Events"
                        tell process "Ghostty"
                            try
                                click menu item "Reload Configuration" of menu "Ghostty" of menu bar 1
                            end try
                        end tell
                    end tell`,
                ],
                stdout: "null",
                stderr: "null",
            });
            await osascript.output();
        } catch {
            // AppleScript not available
        }
    }
}

console.log(`Watching ${themesDir} for changes...\n`);
console.log(`┌──────────────────────────────────────────────────────────────────┐`);
console.log(`│                                                                  │`);
console.log(`│  Ghostty config will auto-reload.                                │`);
console.log(`│  Other terminals need manual reload.                             │`);
console.log(`│                                                                  │`);
console.log(`└──────────────────────────────────────────────────────────────────┘`);
console.log(`\nPress Ctrl+C to stop.\n`);

await run();

const watcher = Deno.watchFs(themesDir, { recursive: true });
let debounce: number | undefined;

for await (const event of watcher) {
    if (event.kind === "modify" || event.kind === "create") {
        // Skip non-TS files
        if (!event.paths.some((p) => p.endsWith(".ts"))) continue;

        clearTimeout(debounce);
        debounce = setTimeout(async () => {
            console.clear();
            await run();
            await reloadGhostty();
        }, 300);
    }
}
