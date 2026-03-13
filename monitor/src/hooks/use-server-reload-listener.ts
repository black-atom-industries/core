import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useServerReloadListener() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const source = new EventSource("/api/events");

        source.onmessage = (event) => {
            if (event.data === "reload") {
                queryClient.invalidateQueries();
            }
        };

        return () => source.close();
    }, [queryClient]);
}
