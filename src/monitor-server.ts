import { join } from "@std/path";
import { collectionOrder, config } from "./config.ts";
import type { ThemeKey, ThemeKeyDefinitionMap } from "./types/theme.ts";
import { contrastRatio, wcagGrade } from "./lib/contrast.ts";

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

function buildCollections(themeMap: ThemeKeyDefinitionMap) {
    const themeMetas = Object.entries(themeMap).map(([key, def]) => ({
        key,
        name: def.meta.name,
        appearance: def.meta.appearance,
        collection: def.meta.collection,
        status: def.meta.status,
    }));

    return collectionOrder.map((collKey) => ({
        collection: collKey,
        themes: themeMetas.filter((m) => m.collection.key === collKey),
    }));
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
    // Start loading themes immediately but don't block server startup
    let themeMap: ThemeKeyDefinitionMap | null = null;
    let groupedMetas: ReturnType<typeof buildCollections> | null = null;
    const ready = loadThemeMap().then((map) => {
        themeMap = map;
        groupedMetas = buildCollections(map);
    });

    // Watch theme source files and reload on change
    async function watchThemes() {
        await ready; // Wait for initial load before watching
        const watcher = Deno.watchFs(config.dir.themes, { recursive: true });
        let debounce: number | undefined;

        for await (const event of watcher) {
            if (event.kind !== "modify" && event.kind !== "create") continue;
            if (!event.paths.some((p) => p.endsWith(".ts"))) continue;

            clearTimeout(debounce);
            debounce = setTimeout(async () => {
                try {
                    themeMap = await loadThemeMap();
                    groupedMetas = buildCollections(themeMap);

                    // Notify all SSE clients
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

    // Server starts immediately — requests wait for themes to load
    const server = Deno.serve({ port: PORT }, async (req: Request) => {
        const url = new URL(req.url);
        const path = url.pathname;

        // SSE endpoint — pushes "reload" events when theme files change
        if (path === "/api/events") {
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

        // Wait for themes to be loaded before serving data endpoints
        await ready;

        // GET /api/themes — list all themes grouped by collection
        if (path === "/api/themes") {
            return json({ collections: groupedMetas });
        }

        // GET /api/themes/overview — primaries + palette + contrast per theme
        if (path === "/api/themes/overview") {
            const overview = groupedMetas!.map((group) => ({
                collection: group.collection,
                themes: group.themes.map((meta) => {
                    const theme = themeMap![meta.key as ThemeKey];
                    const ratio = contrastRatio(theme.ui.fg.default, theme.ui.bg.default);
                    return {
                        meta,
                        primaries: theme.primaries,
                        palette: theme.palette,
                        bgDefault: theme.ui.bg.default,
                        fgDefault: theme.ui.fg.default,
                        contrast: {
                            ratio,
                            level: wcagGrade(ratio),
                        },
                    };
                }),
            }));
            return json({ collections: overview });
        }

        // GET /api/themes/:key — full theme definition
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
    });

    console.log(`Preview API on http://localhost:${PORT}`);

    return server;
}

// Run standalone when executed directly
if (import.meta.main) {
    await startPreviewServer();
}
