import { z } from "zod";
import {
    createRootRoute,
    Outlet,
    retainSearchParams,
    stripSearchParams,
    useLocation,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { DEFAULT_THEME_KEY, themeKeys } from "@core/types/theme.ts";
import { useTheme, useThemes } from "../queries/themes";
import { useServerReloadListener } from "../hooks/use-server-reload-listener";
import { AppLayout } from "../components/app-layout";
import { TopNav } from "../components/top-nav";
import { themeToCssVars } from "../lib/theme-css-vars";

const rootSearchSchema = z.object({
    themeKey: z.enum(themeKeys).default(DEFAULT_THEME_KEY),
});

const rootSearchDefaults = rootSearchSchema.parse({});

export const Route = createRootRoute({
    component: Component,
    validateSearch: zodValidator(rootSearchSchema),
    search: {
        middlewares: [
            stripSearchParams(rootSearchDefaults),
            retainSearchParams(["themeKey"]),
        ],
    },
});

function Component() {
    const { themeKey } = useSearch({ from: "__root__" });
    const navigate = useNavigate({ from: "/" });
    const location = useLocation();

    useServerReloadListener();

    const { data: themes } = useThemes();
    const { data: theme } = useTheme(themeKey);

    const cssVars = theme ? themeToCssVars(theme) : {};
    const activeRoute = location.pathname;

    return (
        <AppLayout
            style={cssVars}
            topBar={
                <TopNav
                    activeRoute={activeRoute}
                    onNavigate={(to) => navigate({ to, search: (prev) => prev })}
                    themes={themes ?? []}
                    currentThemeKey={themeKey}
                    onThemeSelect={(key) =>
                        navigate({
                            to: location.pathname,
                            search: { themeKey: key },
                        })}
                />
            }
            main={<Outlet />}
        />
    );
}
