import {
    createRootRoute,
    createRoute,
    createRouter,
    redirect,
    retainSearchParams,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { AppContainer } from "./containers/app";
import { UiPreviewContainer } from "./containers/ui-preview";
import { CodePreviewContainer } from "./containers/code-preview";

const searchSchema = z.object({
    theme: fallback(z.string(), "").default(""),
});

export const rootRoute = createRootRoute({
    component: AppContainer,
    validateSearch: zodValidator(searchSchema),
    search: {
        middlewares: [retainSearchParams(["theme"])],
    },
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    beforeLoad: ({ search }) => {
        throw redirect({ to: "/preview/ui", search });
    },
});

export const previewUiRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/preview/ui",
    component: UiPreviewContainer,
});

export const previewCodeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/preview/code",
    component: CodePreviewContainer,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    previewUiRoute,
    previewCodeRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
