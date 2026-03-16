import { useEffect } from "react";
import { Outlet, useLocation, useMatchRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useTheme, useThemes } from "../queries/themes";
import { useServerReloadListener } from "../hooks/use-server-reload-listener";
import { AppLayout } from "../components/app-layout";
import { StatsBarContainer } from "./stats-bar";
import { CollectionLabel } from "../components/collection-label";
import { Logo } from "../components/logo";
import { NavItem } from "../components/nav-item";
import { NavSection } from "../components/nav-section";
import { NavSectionLabel } from "../components/nav-section-label";
import { ThemeListItem } from "../components/theme-list-item";
import { groupByCollection } from "../lib/theme-utils";
import { themeToCssVars } from "../lib/theme-css-vars";

export function AppContainer() {
    const { themeKey } = useSearch({ from: "__root__" });
    const navigate = useNavigate({ from: "/" });
    const matchRoute = useMatchRoute();
    const location = useLocation();

    useServerReloadListener();

    const isPreviewPage = !!matchRoute({ to: "/preview/ui" }) ||
        !!matchRoute({ to: "/preview/code" });

    const { data: themes } = useThemes();
    const { data: theme } = useTheme(themeKey);

    // Group themes by collection for the sidebar
    const collections = groupByCollection(themes ?? []);

    // Auto-select first theme when none is set on preview pages
    useEffect(() => {
        if (isPreviewPage && !themeKey && themes?.length) {
            navigate({ search: { themeKey: themes[0].meta.key } });
        }
    }, [themeKey, themes, isPreviewPage]);

    const cssVars = theme ? themeToCssVars(theme) : {};

    return (
        <AppLayout
            data-container="AppContainer"
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
                                    {collectionThemes.map((theme) => (
                                        <ThemeListItem
                                            key={theme.meta.key}
                                            name={theme.meta.name}
                                            appearance={theme.meta.appearance}
                                            active={theme.meta.key === themeKey}
                                            onClick={() =>
                                                navigate({
                                                    to: location.pathname,
                                                    search: { themeKey: theme.meta.key },
                                                })}
                                        />
                                    ))}
                                </div>
                            ),
                        )}
                    </>
                )
                : undefined}
            bottomBar={<StatsBarContainer />}
        />
    );
}
