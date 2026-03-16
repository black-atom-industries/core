import { join } from "@std/path";
import { config } from "./config.ts";
import type { ThemeKey, ThemeKeyDefinitionMap } from "./types/theme.ts";

const PORT = 4171;

/**
 * Loads the theme map by spawning a fresh Deno subprocess.
 * This bypasses the module cache so edited theme files are picked up.
 */
async function loadThemeMap(): Promise<ThemeKeyDefinitionMap> {
    const script = join(config.dir.core, "src", "monitor-dump-themes.ts");
    const command = new Deno.Command(Deno.execPath(), {
        args: ["run", "--allow-read", script],
        stdout: "piped",
        stderr: "piped",
    });
    const { stdout, stderr, success } = await command.output();

    if (!success) {
        const err = new TextDecoder().decode(stderr);
        throw new Error(`Failed to load themes: ${err}`);
    }

    return JSON.parse(new TextDecoder().decode(stdout));
}

function json(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}

// SSE client management
const sseClients = new Set<ReadableStreamDefaultController>();

/**
 * Starts the preview API server and file watcher.
 * Can be called standalone or imported by dev.ts.
 */
export function startPreviewServer() {
    let themeMap: ThemeKeyDefinitionMap | null = null;
    const ready = loadThemeMap().then((map) => {
        themeMap = map;
    });

    async function watchThemes() {
        await ready;
        const watcher = Deno.watchFs(config.dir.themes, { recursive: true });
        let debounce: number | undefined;

        for await (const event of watcher) {
            if (event.kind !== "modify" && event.kind !== "create") continue;
            if (!event.paths.some((p) => p.endsWith(".ts"))) continue;

            clearTimeout(debounce);
            debounce = setTimeout(async () => {
                try {
                    themeMap = await loadThemeMap();

                    const msg = new TextEncoder().encode("data: reload\n\n");
                    for (const controller of sseClients) {
                        try {
                            controller.enqueue(msg);
                        } catch {
                            sseClients.delete(controller);
                        }
                    }
                    console.log("Themes reloaded, clients notified.");
                } catch (err) {
                    console.error("Failed to reload themes:", err);
                }
            }, 500);
        }
    }

    watchThemes();

    const server = Deno.serve({ port: PORT }, async (req: Request) => {
        const url = new URL(req.url);
        const path = url.pathname;

        switch (path) {
            // SSE endpoint — pushes "reload" events when theme files change
            case "/api/events": {
                let intervalId: number | undefined;
                let ctl: ReadableStreamDefaultController | undefined;

                const body = new ReadableStream({
                    start(controller) {
                        ctl = controller;
                        sseClients.add(controller);

                        intervalId = setInterval(() => {
                            try {
                                controller.enqueue(new TextEncoder().encode(": heartbeat\n\n"));
                            } catch {
                                clearInterval(intervalId);
                                sseClients.delete(controller);
                            }
                        }, 15_000);

                        req.signal.addEventListener("abort", () => {
                            clearInterval(intervalId);
                            sseClients.delete(controller);
                        });
                    },
                    cancel() {
                        clearInterval(intervalId);
                        if (ctl) sseClients.delete(ctl);
                    },
                });

                return new Response(body, {
                    headers: {
                        "Content-Type": "text/event-stream",
                        "Cache-Control": "no-cache",
                        "Connection": "keep-alive",
                        "Access-Control-Allow-Origin": "*",
                    },
                });
            }

            // GET /api/themes — all themes as full definitions
            case "/api/themes": {
                await ready;
                return json(Object.values(themeMap!));
            }

            default: {
                await ready;

                // GET /api/themes/:key — single theme definition
                const match = path.match(/^\/api\/themes\/(.+)$/);
                if (match) {
                    const key = match[1] as ThemeKey;
                    const theme = themeMap![key];
                    if (!theme) {
                        return json({ error: `Theme not found: ${key}` }, 404);
                    }
                    return json(theme);
                }

                return json({ error: "Not found" }, 404);
            }
        }
    });

    console.log(`Preview API on http://localhost:${PORT}`);

    return server;
}

if (import.meta.main) {
    startPreviewServer();
}
