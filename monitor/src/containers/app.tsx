import { useEffect } from "react";
import { Outlet, useLocation, useMatchRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useTheme, useThemeList } from "../queries/themes";
import { useServerReloadListener } from "../hooks/use-server-reload-listener";
import { AppLayout } from "../components/app-layout";
import { StatsBarContainer } from "./stats-bar";
import { CollectionLabel } from "../components/collection-label";
import { Logo } from "../components/logo";
import { NavItem } from "../components/nav-item";
import { NavSection } from "../components/nav-section";
import { NavSectionLabel } from "../components/nav-section-label";
import { ThemeListItem } from "../components/theme-list-item";

export function AppContainer() {
    const { theme: themeKey } = useSearch({ from: "__root__" });
    const navigate = useNavigate({ from: "/" });
    const matchRoute = useMatchRoute();
    const location = useLocation();

    useServerReloadListener();

    const isPreviewPage = !!matchRoute({ to: "/preview/ui" }) ||
        !!matchRoute({ to: "/preview/code" });

    const { data: themeList } = useThemeList();
    const DEFAULT_THEME = "black-atom-default-dark";
    const { data: theme } = useTheme(themeKey || DEFAULT_THEME);

    // Auto-select first theme when none is set
    useEffect(() => {
        if (isPreviewPage && !themeKey && themeList?.collections.length) {
            const first = themeList.collections[0]?.themes[0];
            if (first) {
                navigate({ search: { theme: first.key } });
            }
        }
    }, [themeKey, themeList, isPreviewPage]);

    // Inject all ui tokens as CSS variables
    const cssVars = theme
        ? ({
            "--ba-bg": theme.ui.bg.default,
            "--ba-bg-panel": theme.ui.bg.panel,
            "--ba-bg-float": theme.ui.bg.float,
            "--ba-bg-active": theme.ui.bg.active,
            "--ba-bg-disabled": theme.ui.bg.disabled,
            "--ba-bg-hover": theme.ui.bg.hover,
            "--ba-bg-selection": theme.ui.bg.selection,
            "--ba-bg-search": theme.ui.bg.search,
            "--ba-bg-contrast": theme.ui.bg.contrast,
            "--ba-bg-negative": theme.ui.bg.negative,
            "--ba-bg-warn": theme.ui.bg.warn,
            "--ba-bg-info": theme.ui.bg.info,
            "--ba-bg-hint": theme.ui.bg.hint,
            "--ba-bg-positive": theme.ui.bg.positive,
            "--ba-bg-add": theme.ui.bg.add,
            "--ba-bg-delete": theme.ui.bg.delete,
            "--ba-bg-modify": theme.ui.bg.modify,
            "--ba-fg": theme.ui.fg.default,
            "--ba-fg-subtle": theme.ui.fg.subtle,
            "--ba-fg-accent": theme.ui.fg.accent,
            "--ba-fg-disabled": theme.ui.fg.disabled,
            "--ba-fg-contrast": theme.ui.fg.contrast,
            "--ba-fg-negative": theme.ui.fg.negative,
            "--ba-fg-warn": theme.ui.fg.warn,
            "--ba-fg-info": theme.ui.fg.info,
            "--ba-fg-hint": theme.ui.fg.hint,
            "--ba-fg-positive": theme.ui.fg.positive,
            "--ba-fg-add": theme.ui.fg.add,
            "--ba-fg-delete": theme.ui.fg.delete,
            "--ba-fg-modify": theme.ui.fg.modify,
        } as React.CSSProperties)
        : {};

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
                        onClick={() => navigate({ to: "/" })}
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
                        {themeList?.collections.map((group) => (
                            <div key={group.collection}>
                                <CollectionLabel>{group.collection}</CollectionLabel>
                                {group.themes.map((t) => (
                                    <ThemeListItem
                                        key={t.key}
                                        name={t.name}
                                        appearance={t.appearance}
                                        active={t.key === themeKey}
                                        onClick={() =>
                                            navigate({
                                                to: location.pathname,
                                                search: { theme: t.key },
                                            })}
                                    />
                                ))}
                            </div>
                        ))}
                    </>
                )
                : undefined}
            bottomBar={<StatsBarContainer />}
        />
    );
}
