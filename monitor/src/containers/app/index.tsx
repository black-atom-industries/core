import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { useThemeList } from "../../hooks/use-theme-list";
import { useTheme } from "../../hooks/use-theme";
import { useServerReloadListener } from "../../hooks/use-server-reload-listener";
import { AppLayout } from "../../components/app-layout";
import { NavItem } from "../../components/nav-item";
import styles from "./index.module.css";
import { ThemeListItem } from "../../components/theme-list-item";
import { UiPreviewContainer } from "../ui-preview";
import { CodePreviewContainer } from "../code-preview";

export function AppContainer() {
    const { view, theme: themeKey } = rootRoute.useSearch();
    const navigate = useNavigate({ from: "/" });

    useServerReloadListener();

    const { data: themeList } = useThemeList();
    const { data: theme } = useTheme(themeKey || null);

    // Auto-select first theme when none is set
    useEffect(() => {
        if (!themeKey && themeList?.collections.length) {
            const first = themeList.collections[0]?.themes[0];
            if (first) {
                navigate({ search: (prev) => ({ ...prev, theme: first.key }) });
            }
        }
    }, [themeKey, themeList, navigate]);

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
            style={cssVars}
            leftNav={
                <>
                    <div className={styles.logo}>Black Atom</div>
                    <div className={styles.navSection}>
                        <div className={styles.navSectionLabel}>Previews</div>
                        <NavItem
                            label="UI"
                            icon="◈"
                            active={view === "ui"}
                            onClick={() => navigate({ search: (prev) => ({ ...prev, view: "ui" }) })}
                        />
                        <NavItem
                            label="Code"
                            icon="◇"
                            active={view === "code"}
                            onClick={() => navigate({ search: (prev) => ({ ...prev, view: "code" }) })}
                        />
                    </div>
                </>
            }
            main={
                <>
                    {view === "ui" && <UiPreviewContainer themeKey={themeKey} />}
                    {view === "code" && <CodePreviewContainer />}
                </>
            }
            rightSidebar={
                <>
                    {themeList?.collections.map((group) => (
                        <div key={group.collection}>
                            <div className={styles.collectionLabel}>{group.collection}</div>
                            {group.themes.map((t) => (
                                <ThemeListItem
                                    key={t.key}
                                    name={t.name}
                                    appearance={t.appearance}
                                    active={t.key === themeKey}
                                    onClick={() =>
                                        navigate({
                                            search: (prev) => ({ ...prev, theme: t.key }),
                                        })}
                                />
                            ))}
                        </div>
                    ))}
                </>
            }
        />
    );
}
