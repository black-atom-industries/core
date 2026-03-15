import { createRootRoute, retainSearchParams, stripSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { AppContainer } from "../containers/app";
import { rootSearchDefaults, rootSearchKeys, rootSearchSchema } from "../lib/search-params";

export const Route = createRootRoute({
    component: AppContainer,
    validateSearch: zodValidator(rootSearchSchema),
    search: {
        middlewares: [
            retainSearchParams(rootSearchKeys),
            stripSearchParams(rootSearchDefaults),
        ],
    },
});
