import type { ReactNode } from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import styles from "./index.module.css";

type Props = {
    activeRoute: string;
    onNavigate: (to: string) => void;
    right?: ReactNode;
};

const routes = [
    { label: "Dashboard", path: "/" },
    { label: "UI Preview", path: "/preview/ui" },
    { label: "Syntax", path: "/preview/code" },
] as const;

export function TopNav({ activeRoute, onNavigate, right }: Props) {
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
            {right && <div className={styles.right}>{right}</div>}
        </div>
    );
}
