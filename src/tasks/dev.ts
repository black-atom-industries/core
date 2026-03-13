/**
 * Unified dev mode: runs the adapter watcher, preview API server,
 * and Vite dev server concurrently.
 *
 * Usage:
 *   deno task dev
 */

import { join } from "@std/path";
import { config } from "../config.ts";
import { watch } from "./adapters/watch.ts";
import { startPreviewServer } from "../preview-server.ts";

const previewDir = join(config.dir.core, "preview");

let viteProcess: Deno.ChildProcess | null = null;

async function startVite() {
    const vite = new Deno.Command("deno", {
        args: ["task", "dev"],
        cwd: previewDir,
        stdout: "inherit",
        stderr: "inherit",
    });
    viteProcess = vite.spawn();
    await viteProcess.status;
}

function cleanup() {
    viteProcess?.kill("SIGTERM");
    Deno.exit(0);
}

Deno.addSignalListener("SIGINT", cleanup);
Deno.addSignalListener("SIGTERM", cleanup);

await Promise.all([
    startPreviewServer(),
    startVite(),
    watch(),
]);
