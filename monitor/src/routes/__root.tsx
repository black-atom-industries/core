import { createRootRoute, retainSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { AppContainer } from "../containers/app";
import { stripSearchParams } from "@tanstack/react-router";

const searchSchema = z.object({
    theme: fallback(z.string(), "").default(""),
});

export const Route = createRootRoute({
    component: AppContainer,
    validateSearch: zodValidator(searchSchema),
    search: {
        middlewares: [retainSearchParams(["theme"]), stripSearchParams({ theme: "" })],
    },
});
