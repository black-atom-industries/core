import { createRootRoute, createRouter } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { AppContainer } from "./containers/app";

const searchSchema = z.object({
    view: fallback(z.enum(["ui", "code"]), "ui").default("ui"),
    theme: fallback(z.string(), "").default(""),
});

export const rootRoute = createRootRoute({
    component: AppContainer,
    validateSearch: zodValidator(searchSchema),
});

const routeTree = rootRoute;

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
