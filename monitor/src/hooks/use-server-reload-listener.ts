import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useServerReloadListener() {
    const queryClient = useQueryClient();

    useEffect(() => {
        // Connect directly (not via Vite proxy) — known Deno/http-proxy incompatibility
        // causes a process crash on SSE stream close:
        // https://github.com/vitejs/vite/issues/21159
        // https://github.com/denoland/deno/issues/28850
        const source = new EventSource(`${__API_BASE__}/api/events`);

        source.onmessage = (event) => {
            if (event.data === "reload") {
                queryClient.invalidateQueries();
            }
        };

        return () => source.close();
    }, [queryClient]);
}
