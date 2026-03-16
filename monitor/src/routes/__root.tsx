import { useEffect } from "react";
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
import { orgStats, themeContrast } from "@core/lib/stats.ts";
import { useTheme, useThemes } from "../queries/themes";
import { useServerReloadListener } from "../hooks/use-server-reload-listener";
import { AppLayout } from "../components/app-layout";
import { CollectionLabel } from "../components/collection-label";
import { OrgStatsPartial } from "../partials/stats-bar/org-stats";
import { ThemeStatsPartial } from "../partials/stats-bar/theme-stats";
import { Logo } from "../components/logo";
import { NavItem } from "../components/nav-item";
import { NavSection } from "../components/nav-section";
import { NavSectionLabel } from "../components/nav-section-label";
import { ThemeListItem } from "../components/theme-list-item";
import { groupByCollection } from "../lib/theme-utils";
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

    const isPreviewPage = !!matchRoute({ to: "/preview/ui" }) ||
        !!matchRoute({ to: "/preview/code" });

    const { data: themes } = useThemes();
    const { data: theme } = useTheme(themeKey);

    const collections = groupByCollection(themes ?? []);

    useEffect(() => {
        if (isPreviewPage && !themeKey && themes?.length) {
            navigate({ search: { themeKey: themes[0].meta.key } });
        }
    }, [themeKey, themes, isPreviewPage]);

    const cssVars = theme ? themeToCssVars(theme) : {};

    return (
        <AppLayout
            style={cssVars}
            leftNav={
                <>
                    <Logo />
                    <NavItem
                        label="Dashboard"
                        icon="◉"
                        active={!!matchRoute({ to: "/" })}
                        onClick={() => navigate({ to: "/", search: (prev) => prev })}
                    />
                    <NavSection>
                        <NavSectionLabel>Preview</NavSectionLabel>
                        <NavItem
                            label="UI"
                            icon="◈"
                            active={!!matchRoute({ to: "/preview/ui" })}
                            onClick={() => navigate({ to: "/preview/ui", search: (prev) => prev })}
                        />
                        <NavItem
                            label="Syntax"
                            icon="◇"
                            active={!!matchRoute({ to: "/preview/code" })}
                            onClick={() =>
                                navigate({ to: "/preview/code", search: (prev) => prev })}
                        />
                    </NavSection>
                </>
            }
            main={<Outlet />}
            rightSidebar={isPreviewPage
                ? (
                    <>
                        {Array.from(
                            collections,
                            ([collectionKey, collectionThemes]) => (
                                <div key={collectionKey}>
                                    <CollectionLabel>{collectionKey}</CollectionLabel>
                                    {collectionThemes.map((t) => (
                                        <ThemeListItem
                                            key={t.meta.key}
                                            name={t.meta.name}
                                            appearance={t.meta.appearance}
                                            active={t.meta.key === themeKey}
                                            onClick={() =>
                                                navigate({
                                                    to: location.pathname,
                                                    search: { themeKey: t.meta.key },
                                                })}
                                        />
                                    ))}
                                </div>
                            ),
                        )}
                    </>
                )
                : undefined}
            bottomBar={isPreviewPage && theme
                ? (
                    <ThemeStatsPartial
                        contrast={themeContrast(theme)}
                        collectionLabel={theme.meta.collection.label}
                        hueSpreadColors={[
                            theme.palette.red,
                            theme.palette.yellow,
                            theme.palette.green,
                            theme.palette.cyan,
                            theme.palette.blue,
                            theme.palette.magenta,
                        ]}
                        lightnessRange={[theme.primaries.d10, theme.primaries.l40]}
                    />
                )
                : themes
                ? <OrgStatsPartial stats={orgStats(themes)} />
                : undefined}
        />
    );
}
