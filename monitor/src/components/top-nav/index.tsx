import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ThemeSelector } from "./theme-selector";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";
import styles from "./index.module.css";

type Props = {
    activeRoute: string;
    onNavigate: (to: string) => void;
    themes: ThemeDefinition[];
    currentThemeKey: ThemeKey;
    onThemeSelect: (key: ThemeKey) => void;
};

const routes = [
    { label: "Dashboard", path: "/" },
    { label: "UI Preview", path: "/preview/ui" },
    { label: "Syntax", path: "/preview/code" },
] as const;

export function TopNav({
    activeRoute,
    onNavigate,
    themes,
    currentThemeKey,
    onThemeSelect,
}: Props) {
    const currentTheme = themes.find((t) => t.meta.key === currentThemeKey);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <span className={styles.brand}>
                    BLACK ATOM <span className={styles.brandSub}>MONITOR</span>
                </span>
                <NavigationMenu.Root className={styles.nav}>
                    <NavigationMenu.List className={styles.navList}>
                        {routes.map((route) => (
                            <NavigationMenu.Item key={route.path}>
                                <NavigationMenu.Link
                                    className={styles.navLink}
                                    data-active={activeRoute === route.path || undefined}
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        onNavigate(route.path);
                                    }}
                                    href={route.path}
                                >
                                    {route.label}
                                </NavigationMenu.Link>
                            </NavigationMenu.Item>
                        ))}
                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </div>
            <div className={styles.right}>
                <ThemeSelector
                    themes={themes}
                    currentThemeKey={currentThemeKey}
                    currentThemeLabel={currentTheme
                        ? `${currentTheme.meta.collection.label} · ${currentTheme.meta.name}`
                        : ""}
                    onSelect={onThemeSelect}
                />
            </div>
        </div>
    );
}
