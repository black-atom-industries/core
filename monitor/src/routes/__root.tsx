import { useEffect, useMemo } from "react";
import { z } from "zod";
import {
    createRootRoute,
    Outlet,
    retainSearchParams,
    stripSearchParams,
    useLocation,
    useMatchRoute,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { DEFAULT_THEME_KEY, themeKeys } from "@core/types/theme.ts";
import { useTheme, useThemes } from "../queries/themes";
import { useServerReloadListener } from "../hooks/use-server-reload-listener";
import { AppLayout } from "../components/app-layout";
import { TopNav } from "../components/top-nav";
import { analyzeThemeContrast } from "@core/lib/contrast-analysis.ts";
import { AnalyticsSidebar } from "../components/analytics-sidebar";
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
    const matchRoute = useMatchRoute();
    const location = useLocation();

    useServerReloadListener();

    const { data: themes } = useThemes();
    const { data: theme } = useTheme(themeKey);

    const cssVars = useMemo(() => theme ? themeToCssVars(theme) : {}, [theme]);

    // Sync CSS vars to :root so portals (rendered outside AppLayout) can access them
    useEffect(() => {
        const root = document.documentElement;
        for (const [key, value] of Object.entries(cssVars)) {
            root.style.setProperty(key, value);
        }
        return () => {
            for (const key of Object.keys(cssVars)) {
                root.style.removeProperty(key);
            }
        };
    }, [cssVars]);

    const activeRoute = location.pathname;
    const isPreviewPage = !!matchRoute({ to: "/preview/ui" }) ||
        !!matchRoute({ to: "/preview/code" });
    const contrastAnalysis = useMemo(
        () => theme ? analyzeThemeContrast(theme) : null,
        [theme],
    );

    return (
        <AppLayout
            style={cssVars}
            leftSidebar={isPreviewPage && contrastAnalysis
                ? <AnalyticsSidebar analysis={contrastAnalysis} />
                : undefined}
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
