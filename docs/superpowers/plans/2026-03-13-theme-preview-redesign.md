# Theme Preview App Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the theme preview React app with a three-column layout, full CSS var coverage, TanStack Router URL state, and a clean dumb/smart/partial component architecture.

**Architecture:** Three-column shell (left nav / main content / right theme selector) managed by `AppContainer`, which owns CSS var injection and URL-driven state. `UiPreviewContainer` fetches the active theme and orchestrates the UI tab. All state lives in URL search params via TanStack Router.

**Tech Stack:** React 19, Vite, Deno, TanStack Router v1, TanStack Query v5, Zod, CSS Modules

---

## Chunk 1: Foundation

**Files:**
- Modify: `preview/deno.json` — add new npm deps
- Create: `preview/src/hooks/use-theme-list.ts`
- Create: `preview/src/hooks/use-theme.ts`
- Create: `preview/src/hooks/use-server-reload-listener.ts`
- Create: `preview/src/lib/contrast.ts`
- Create: `preview/src/router.ts`
- Modify: `preview/src/main.tsx`

---

### Task 1: Add dependencies

**Files:**
- Modify: `preview/deno.json`

- [ ] **Step 1: Add three new npm imports to deno.json**

In `preview/deno.json`, add to the `imports` object:

```json
"@tanstack/react-router": "npm:@tanstack/react-router@^1.114.0",
"@tanstack/zod-adapter": "npm:@tanstack/zod-adapter@^1.114.0",
"zod": "npm:zod@^3.24.0"
```

- [ ] **Step 2: Verify deno resolves the new packages**

```bash
cd preview && deno install
```

Expected: no errors, packages resolved under `node_modules/`.

- [ ] **Step 3: Commit**

```bash
git add preview/deno.json
git commit -m "chore(preview): add tanstack-router, zod-adapter, zod deps"
```

---

### Task 2: Extract hooks from api.ts

**Files:**
- Create: `preview/src/hooks/use-theme-list.ts`
- Create: `preview/src/hooks/use-theme.ts`
- Create: `preview/src/hooks/use-server-reload-listener.ts`

The existing `api.ts` bundles three hooks + type exports. Split each hook into its own file. Types stay importable from `api.ts` for now (it will be deleted in Chunk 3).

- [ ] **Step 1: Create `preview/src/hooks/use-theme-list.ts`**

```ts
import { useQuery } from "@tanstack/react-query";
import type { ThemeCollectionKey } from "@core/types/theme.ts";
import type { ThemeMeta } from "@core/types/theme.ts";

interface CollectionGroup {
    collection: ThemeCollectionKey;
    themes: ThemeMeta[];
}

export interface ThemesResponse {
    collections: CollectionGroup[];
}

export function useThemeList() {
    return useQuery<ThemesResponse>({
        queryKey: ["themes"],
        queryFn: () => fetch("/api/themes").then((r) => r.json()),
    });
}
```

- [ ] **Step 2: Create `preview/src/hooks/use-theme.ts`**

```ts
import { useQuery } from "@tanstack/react-query";
import type { ThemeDefinition } from "@core/types/theme.ts";

export function useTheme(key: string | null) {
    return useQuery<ThemeDefinition>({
        queryKey: ["theme", key],
        queryFn: () => fetch(`/api/themes/${key}`).then((r) => r.json()),
        enabled: !!key,
    });
}
```

- [ ] **Step 3: Create `preview/src/hooks/use-server-reload-listener.ts`**

```ts
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useServerReloadListener() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const source = new EventSource("/api/events");

        source.onmessage = (event) => {
            if (event.data === "reload") {
                queryClient.invalidateQueries();
            }
        };

        return () => source.close();
    }, [queryClient]);
}
```

- [ ] **Step 4: Verify Deno/TypeScript is happy**

```bash
cd preview && deno check src/hooks/use-theme-list.ts src/hooks/use-theme.ts src/hooks/use-server-reload-listener.ts
```

Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add preview/src/hooks/
git commit -m "refactor(preview): extract hooks into dedicated files"
```

---

### Task 3: Add WCAG contrast utility

**Files:**
- Create: `preview/src/lib/contrast.ts`

- [ ] **Step 1: Create `preview/src/lib/contrast.ts`**

```ts
function relativeLuminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const toLinear = (c: number) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrastRatio(fg: string, bg: string): number {
    const l1 = relativeLuminance(fg);
    const l2 = relativeLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

export function wcagGrade(ratio: number): "AAA" | "AA" | "fail" {
    if (ratio >= 7) return "AAA";
    if (ratio >= 4.5) return "AA";
    return "fail";
}
```

- [ ] **Step 2: Verify**

```bash
cd preview && deno check src/lib/contrast.ts
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add preview/src/lib/
git commit -m "feat(preview): add WCAG contrast ratio utility"
```

---

### Task 4: Set up TanStack Router

**Files:**
- Create: `preview/src/router.ts`
- Modify: `preview/src/main.tsx`

- [ ] **Step 1: Create `preview/src/router.ts`**

```ts
import { createRouter, createRootRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { AppContainer } from "./containers/app";

const searchSchema = z.object({
    view: fallback(z.enum(["ui", "code"]), "ui").default("ui"),
    theme: fallback(z.string(), "").default(""),
});

export const rootRoute = createRootRoute({
    component: AppContainer,
    validateSearch: zodValidator(searchSchema),
});

const routeTree = rootRoute;

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
```

Note: `AppContainer` doesn't exist yet — this file will cause a type error until Task 5 (Chunk 2) creates it. That's expected; Deno check will pass once the container exists.

- [ ] **Step 2: Update `preview/src/main.tsx`**

Replace the entire file:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
```

- [ ] **Step 3: Commit**

```bash
git add preview/src/router.ts preview/src/main.tsx
git commit -m "feat(preview): set up TanStack Router with search param state"
```

---

## Chunk 2: Dumb Components + App Container

**Files:**
- Create: `preview/src/components/appearance-badge/index.tsx`
- Create: `preview/src/components/appearance-badge/index.module.css`
- Create: `preview/src/components/nav-item/index.tsx`
- Create: `preview/src/components/nav-item/index.module.css`
- Create: `preview/src/components/theme-list-item/index.tsx`
- Create: `preview/src/components/theme-list-item/index.module.css`
- Create: `preview/src/components/color-swatch/index.tsx`
- Create: `preview/src/components/color-swatch/index.module.css`
- Create: `preview/src/components/stat-card/index.tsx`
- Create: `preview/src/components/stat-card/index.module.css`
- Create: `preview/src/containers/app/index.tsx`
- Create: `preview/src/containers/app/index.module.css`

---

### Task 5: AppearanceBadge component

- [ ] **Step 1: Create `preview/src/components/appearance-badge/index.tsx`**

```tsx
import styles from "./index.module.css";

interface Props {
    appearance: "dark" | "light";
}

export function AppearanceBadge({ appearance }: Props) {
    return (
        <span className={styles.badge} data-appearance={appearance}>
            {appearance}
        </span>
    );
}
```

- [ ] **Step 2: Create `preview/src/components/appearance-badge/index.module.css`**

```css
.badge {
    display: inline-block;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 500;
    text-transform: lowercase;
    letter-spacing: 0.3px;
}

.badge[data-appearance="dark"] {
    background: #1a1a1a;
    color: #888;
}

.badge[data-appearance="light"] {
    background: #e8e8e8;
    color: #666;
}
```

---

### Task 6: NavItem component

- [ ] **Step 1: Create `preview/src/components/nav-item/index.tsx`**

```tsx
import styles from "./index.module.css";

interface Props {
    label: string;
    icon: string;
    active?: boolean;
    onClick: () => void;
}

export function NavItem({ label, icon, active = false, onClick }: Props) {
    return (
        <button
            type="button"
            className={styles.item}
            data-active={active}
            onClick={onClick}
        >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
        </button>
    );
}
```

- [ ] **Step 2: Create `preview/src/components/nav-item/index.module.css`**

```css
.item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 12px;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--ba-fg-subtle);
    font-size: 13px;
    text-align: left;
    transition: background 0.1s, color 0.1s;
}

.item:hover {
    background: var(--ba-bg-hover);
    color: var(--ba-fg);
}

.item[data-active="true"] {
    background: var(--ba-bg-active);
    color: var(--ba-fg);
}

.icon {
    font-size: 14px;
    width: 16px;
    text-align: center;
    flex-shrink: 0;
}

.label {
    font-weight: 400;
}
```

---

### Task 7: ThemeListItem component

- [ ] **Step 1: Create `preview/src/components/theme-list-item/index.tsx`**

```tsx
import { AppearanceBadge } from "../appearance-badge";
import styles from "./index.module.css";

interface Props {
    name: string;
    appearance: "dark" | "light";
    active?: boolean;
    onClick: () => void;
}

export function ThemeListItem({ name, appearance, active = false, onClick }: Props) {
    return (
        <button
            type="button"
            className={styles.item}
            data-active={active}
            onClick={onClick}
        >
            <span className={styles.name}>{name}</span>
            <AppearanceBadge appearance={appearance} />
        </button>
    );
}
```

- [ ] **Step 2: Create `preview/src/components/theme-list-item/index.module.css`**

```css
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 8px 5px 12px;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    cursor: pointer;
    color: var(--ba-fg-subtle);
    font-size: 12px;
    text-align: left;
    transition: background 0.1s, color 0.1s, border-color 0.1s;
}

.item:hover {
    background: var(--ba-bg-hover);
    color: var(--ba-fg);
}

.item[data-active="true"] {
    background: var(--ba-bg-active);
    color: var(--ba-fg);
    border-left-color: var(--ba-fg-accent);
}

.name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

---

### Task 8: ColorSwatch component

- [ ] **Step 1: Create `preview/src/components/color-swatch/index.tsx`**

```tsx
import styles from "./index.module.css";

interface Props {
    color: string;
    label: string;
}

export function ColorSwatch({ color, label }: Props) {
    return (
        <div className={styles.swatch}>
            <div
                className={styles.color}
                style={{ background: color }}
                title={color}
            />
            <span className={styles.label}>{label}</span>
            <span className={styles.hex}>{color}</span>
        </div>
    );
}
```

- [ ] **Step 2: Create `preview/src/components/color-swatch/index.module.css`**

```css
.swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 0;
}

.color {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
    cursor: default;
}

.label {
    font-size: 9px;
    color: var(--ba-fg-subtle);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 52px;
}

.hex {
    font-size: 8px;
    color: var(--ba-fg-disabled);
    text-align: center;
    opacity: 0;
    transition: opacity 0.15s;
}

.swatch:hover .hex {
    opacity: 1;
}
```

---

### Task 9: StatCard component

- [ ] **Step 1: Create `preview/src/components/stat-card/index.tsx`**

```tsx
import styles from "./index.module.css";

interface Props {
    label: string;
    children: React.ReactNode;
}

export function StatCard({ label, children }: Props) {
    return (
        <div className={styles.card}>
            <span className={styles.label}>{label}</span>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
```

- [ ] **Step 2: Create `preview/src/components/stat-card/index.module.css`**

```css
.card {
    background: var(--ba-bg-panel);
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
}

.content {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
```

- [ ] **Step 3: Commit all dumb components**

```bash
git add preview/src/components/
git commit -m "feat(preview): add dumb components (badge, nav-item, theme-list-item, color-swatch, stat-card)"
```

---

### Task 10: AppContainer

- [ ] **Step 1: Create `preview/src/containers/app/index.module.css`**

```css
.shell {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: var(--ba-bg);
    color: var(--ba-fg);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    font-size: 13px;
}

/* Left sidebar */
.leftNav {
    width: 180px;
    flex-shrink: 0;
    background: var(--ba-bg-panel);
    border-right: 1px solid var(--ba-bg-float);
    display: flex;
    flex-direction: column;
    padding: 16px 8px;
    gap: 4px;
    overflow-y: auto;
}

.navSection {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.navSectionLabel {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
    padding: 4px 12px 2px;
    margin-bottom: 2px;
}

.logo {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: var(--ba-fg-subtle);
    padding: 4px 12px 12px;
    text-transform: uppercase;
}

/* Main content */
.main {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
}

/* Right sidebar */
.rightSidebar {
    width: 200px;
    flex-shrink: 0;
    background: var(--ba-bg-panel);
    border-left: 1px solid var(--ba-bg-float);
    overflow-y: auto;
    padding: 12px 0;
}

.collectionLabel {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
    padding: 8px 12px 4px;
}

.collectionLabel:first-child {
    padding-top: 4px;
}

/* Mobile */
@media (max-width: 768px) {
    .shell {
        flex-direction: column;
        height: auto;
        min-height: 100vh;
    }

    .leftNav {
        width: 100%;
        height: auto;
        flex-direction: row;
        align-items: center;
        padding: 8px 12px;
        border-right: none;
        border-bottom: 1px solid var(--ba-bg-float);
        overflow-x: auto;
        overflow-y: hidden;
    }

    .navSection {
        flex-direction: row;
        gap: 4px;
    }

    .navSectionLabel {
        display: none;
    }

    .logo {
        padding: 0 12px 0 0;
        border-right: 1px solid var(--ba-bg-float);
        margin-right: 8px;
        white-space: nowrap;
    }

    .main {
        overflow-y: visible;
    }

    .rightSidebar {
        width: 100%;
        border-left: none;
        border-top: 1px solid var(--ba-bg-float);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 8px 0;
        overflow-x: auto;
    }
}
```

- [ ] **Step 2: Create `preview/src/containers/app/index.tsx`**

```tsx
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import { useThemeList } from "../../hooks/use-theme-list";
import { useTheme } from "../../hooks/use-theme";
import { useServerReloadListener } from "../../hooks/use-server-reload-listener";
import { NavItem } from "../../components/nav-item";
import { ThemeListItem } from "../../components/theme-list-item";
import { UiPreviewContainer } from "../ui-preview";
import { CodePreviewContainer } from "../code-preview";
import styles from "./index.module.css";

export function AppContainer() {
    const { view, theme: themeKey } = rootRoute.useSearch();
    const navigate = useNavigate();

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
        <div className={styles.shell} style={cssVars}>
            {/* Left navigation */}
            <nav className={styles.leftNav}>
                <div className={styles.logo}>Black Atom</div>
                <div className={styles.navSection}>
                    <div className={styles.navSectionLabel}>Previews</div>
                    <NavItem
                        label="UI"
                        icon="◈"
                        active={view === "ui"}
                        onClick={() =>
                            navigate({ search: (prev) => ({ ...prev, view: "ui" }) })
                        }
                    />
                    <NavItem
                        label="Code"
                        icon="◇"
                        active={view === "code"}
                        onClick={() =>
                            navigate({ search: (prev) => ({ ...prev, view: "code" }) })
                        }
                    />
                </div>
            </nav>

            {/* Main content */}
            <main className={styles.main}>
                {view === "ui" && <UiPreviewContainer themeKey={themeKey} />}
                {view === "code" && <CodePreviewContainer />}
            </main>

            {/* Right theme selector */}
            <aside className={styles.rightSidebar}>
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
                                    })
                                }
                            />
                        ))}
                    </div>
                ))}
            </aside>
        </div>
    );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd preview && deno check src/containers/app/index.tsx
```

Expected: no errors (UiPreviewContainer and CodePreviewContainer don't exist yet — add them as stubs first if needed, see Task 11).

- [ ] **Step 4: Commit**

```bash
git add preview/src/containers/app/
git commit -m "feat(preview): add AppContainer with three-column layout and CSS var injection"
```

---

## Chunk 3: Preview Containers + Partials + Cleanup

**Files:**
- Create: `preview/src/containers/code-preview/index.tsx`
- Create: `preview/src/containers/code-preview/index.module.css`
- Create: `preview/src/containers/ui-preview/index.tsx`
- Create: `preview/src/containers/ui-preview/index.module.css`
- Create: `preview/src/containers/ui-preview/use-ui-preview.ts`
- Create: `preview/src/partials/color-token-group/index.tsx`
- Create: `preview/src/partials/color-token-group/index.module.css`
- Create: `preview/src/partials/stats-row/index.tsx`
- Create: `preview/src/partials/stats-row/index.module.css`
- Create: `preview/src/partials/ui-example-text/index.tsx`
- Create: `preview/src/partials/ui-example-text/index.module.css`
- Create: `preview/src/partials/ui-example-chrome/index.tsx`
- Create: `preview/src/partials/ui-example-chrome/index.module.css`
- Create: `preview/src/partials/ui-example-form/index.tsx`
- Create: `preview/src/partials/ui-example-form/index.module.css`
- Create: `preview/src/partials/ui-example-badges/index.tsx`
- Create: `preview/src/partials/ui-example-badges/index.module.css`
- Delete: `preview/src/App.tsx`, `preview/src/App.module.css`
- Delete: `preview/src/components/ThemeSelector.tsx`, `preview/src/components/ThemeSelector.module.css`
- Delete: `preview/src/components/ColorSwatch.tsx`, `preview/src/components/ColorSwatch.module.css`
- Delete: `preview/src/tabs/UiPreview.tsx`, `preview/src/tabs/UiPreview.module.css`
- Delete: `preview/src/tabs/CodePreview.tsx`, `preview/src/tabs/CodePreview.module.css`
- Delete: `preview/src/api.ts`

---

### Task 11: CodePreviewContainer (placeholder)

- [ ] **Step 1: Create `preview/src/containers/code-preview/index.tsx`**

```tsx
import styles from "./index.module.css";

export function CodePreviewContainer() {
    return (
        <div className={styles.placeholder}>
            <p>Code Preview — coming soon</p>
        </div>
    );
}
```

- [ ] **Step 2: Create `preview/src/containers/code-preview/index.module.css`**

```css
.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
    color: var(--ba-fg-disabled);
    font-size: 13px;
}
```

- [ ] **Step 3: Commit**

```bash
git add preview/src/containers/code-preview/
git commit -m "feat(preview): add CodePreviewContainer placeholder"
```

---

### Task 12: ColorTokenGroup partial

- [ ] **Step 1: Create `preview/src/partials/color-token-group/index.tsx`**

```tsx
import { ColorSwatch } from "../../components/color-swatch";
import styles from "./index.module.css";

interface Props {
    label: string;
    tokens: Record<string, string>;
}

export function ColorTokenGroup({ label, tokens }: Props) {
    return (
        <div className={styles.group}>
            <div className={styles.label}>{label}</div>
            <div className={styles.swatches}>
                {Object.entries(tokens).map(([name, color]) => (
                    <ColorSwatch key={name} color={color} label={name} />
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Create `preview/src/partials/color-token-group/index.module.css`**

```css
.group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
}

.swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
```

- [ ] **Step 3: Commit**

```bash
git add preview/src/partials/color-token-group/
git commit -m "feat(preview): add ColorTokenGroup partial"
```

---

### Task 13: StatsRow partial

- [ ] **Step 1: Create `preview/src/partials/stats-row/index.tsx`**

```tsx
import { StatCard } from "../../components/stat-card";
import type { ContrastData } from "../../containers/ui-preview/use-ui-preview";
import styles from "./index.module.css";

interface Props {
    contrast: ContrastData;
    paletteColors: string[];
    darkestPrimary: string;
    lightestPrimary: string;
}

export function StatsRow({
    contrast,
    paletteColors,
    darkestPrimary,
    lightestPrimary,
}: Props) {
    const { ratio, grade } = contrast;

    return (
        <div className={styles.row}>
            <StatCard label="Contrast (fg/bg)">
                <span className={styles.ratio} data-grade={grade}>
                    {ratio.toFixed(2)}:1
                </span>
                <span className={styles.grade} data-grade={grade}>
                    {grade}
                </span>
            </StatCard>

            <StatCard label="Hue spread">
                <div className={styles.hueStrip}>
                    {paletteColors.map((color, i) => (
                        <div
                            key={i}
                            className={styles.hueChunk}
                            style={{ background: color }}
                        />
                    ))}
                </div>
            </StatCard>

            <StatCard label="Lightness range">
                <div
                    className={styles.lightnessBar}
                    style={{
                        background: `linear-gradient(to right, ${darkestPrimary}, ${lightestPrimary})`,
                    }}
                />
            </StatCard>
        </div>
    );
}
```

- [ ] **Step 2: Create `preview/src/partials/stats-row/index.module.css`**

```css
.row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 220px;
    flex-shrink: 0;
}

.ratio {
    font-size: 18px;
    font-weight: 600;
    color: var(--ba-fg);
}

.grade {
    font-size: 11px;
    font-weight: 500;
}

.grade[data-grade="AAA"],
.ratio[data-grade="AAA"] {
    color: var(--ba-fg-positive);
}

.grade[data-grade="AA"],
.ratio[data-grade="AA"] {
    color: var(--ba-fg-warn);
}

.grade[data-grade="fail"],
.ratio[data-grade="fail"] {
    color: var(--ba-fg-negative);
}

.hueStrip {
    display: flex;
    height: 20px;
    border-radius: 3px;
    overflow: hidden;
    gap: 1px;
}

.hueChunk {
    flex: 1;
}

.lightnessBar {
    height: 20px;
    border-radius: 3px;
}

/* Mobile: horizontal row */
@media (max-width: 768px) {
    .row {
        width: 100%;
        flex-direction: row;
    }

    .row > * {
        flex: 1;
    }
}
```

---

### Task 14: UI Example partials

- [ ] **Step 1: Create `preview/src/partials/ui-example-text/index.tsx`**

```tsx
import styles from "./index.module.css";

export function UiExampleText() {
    return (
        <div className={styles.example}>
            <div className={styles.label}>Text Content</div>
            <div className={styles.content}>
                <h1 className={styles.h1}>Heading One</h1>
                <h2 className={styles.h2}>Heading Two</h2>
                <h3 className={styles.h3}>Heading Three</h3>
                <p className={styles.body}>
                    Body text with{" "}
                    <a className={styles.link} href="#">
                        an accent link
                    </a>{" "}
                    and <code className={styles.code}>inline code</code> for emphasis.
                </p>
                <blockquote className={styles.blockquote}>
                    A blockquote shows subtle foreground and a left border accent.
                </blockquote>
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Create `preview/src/partials/ui-example-text/index.module.css`**

```css
.example {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
}

.content {
    background: var(--ba-bg);
    border: 1px solid var(--ba-bg-float);
    border-radius: 6px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.h1 { font-size: 22px; font-weight: 700; color: var(--ba-fg); }
.h2 { font-size: 17px; font-weight: 600; color: var(--ba-fg); }
.h3 { font-size: 14px; font-weight: 600; color: var(--ba-fg-subtle); }

.body {
    font-size: 13px;
    color: var(--ba-fg);
    line-height: 1.6;
}

.link {
    color: var(--ba-fg-accent);
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.code {
    background: var(--ba-bg-selection);
    color: var(--ba-fg-accent);
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
    font-family: "JetBrains Mono", "Fira Code", monospace;
}

.blockquote {
    border-left: 3px solid var(--ba-fg-accent);
    padding-left: 12px;
    color: var(--ba-fg-subtle);
    font-size: 12px;
    font-style: italic;
    line-height: 1.5;
}
```

- [ ] **Step 3: Create `preview/src/partials/ui-example-chrome/index.tsx`**

```tsx
import styles from "./index.module.css";

export function UiExampleChrome() {
    return (
        <div className={styles.example}>
            <div className={styles.label}>App Chrome</div>
            <div className={styles.chrome}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarItem} data-active="true">Dashboard</div>
                    <div className={styles.sidebarItem}>Settings</div>
                    <div className={styles.sidebarItem}>Profile</div>
                </aside>
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>Dashboard</div>
                    <div className={styles.panelContent}>
                        <div className={styles.card}>Content area</div>
                        <div className={styles.card}>Another panel</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 4: Create `preview/src/partials/ui-example-chrome/index.module.css`**

```css
.example {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
}

.chrome {
    display: flex;
    height: 160px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--ba-bg-float);
}

.sidebar {
    width: 120px;
    flex-shrink: 0;
    background: var(--ba-bg-panel);
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    gap: 2px;
}

.sidebarItem {
    padding: 5px 12px;
    font-size: 11px;
    color: var(--ba-fg-subtle);
    cursor: default;
    border-left: 2px solid transparent;
}

.sidebarItem[data-active="true"] {
    color: var(--ba-fg);
    background: var(--ba-bg-active);
    border-left-color: var(--ba-fg-accent);
}

.panel {
    flex: 1;
    background: var(--ba-bg);
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.panelHeader {
    padding: 8px 12px;
    font-size: 11px;
    font-weight: 600;
    color: var(--ba-fg);
    background: var(--ba-bg-float);
    border-bottom: 1px solid var(--ba-bg-panel);
}

.panelContent {
    flex: 1;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.card {
    background: var(--ba-bg-panel);
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 11px;
    color: var(--ba-fg-subtle);
    flex: 1;
}
```

- [ ] **Step 5: Create `preview/src/partials/ui-example-form/index.tsx`**

```tsx
import styles from "./index.module.css";

export function UiExampleForm() {
    return (
        <div className={styles.example}>
            <div className={styles.label}>Form Elements</div>
            <div className={styles.form}>
                <input
                    className={styles.input}
                    placeholder="Input field"
                    readOnly
                />
                <div className={styles.buttons}>
                    <button type="button" className={styles.btnPrimary}>
                        Primary
                    </button>
                    <button type="button" className={styles.btnSecondary}>
                        Secondary
                    </button>
                    <button type="button" className={styles.btnDisabled} disabled>
                        Disabled
                    </button>
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 6: Create `preview/src/partials/ui-example-form/index.module.css`**

```css
.example {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
}

.form {
    background: var(--ba-bg);
    border: 1px solid var(--ba-bg-float);
    border-radius: 6px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input {
    background: var(--ba-bg-panel);
    border: 1px solid var(--ba-bg-float);
    border-radius: 4px;
    padding: 7px 10px;
    font-size: 12px;
    color: var(--ba-fg);
    outline: none;
    width: 100%;
}

.input:focus {
    border-color: var(--ba-fg-accent);
}

.buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.btnPrimary {
    padding: 6px 14px;
    border-radius: 4px;
    border: none;
    background: var(--ba-fg-accent);
    color: var(--ba-bg);
    font-size: 12px;
    cursor: pointer;
}

.btnSecondary {
    padding: 6px 14px;
    border-radius: 4px;
    border: 1px solid var(--ba-bg-float);
    background: var(--ba-bg-panel);
    color: var(--ba-fg);
    font-size: 12px;
    cursor: pointer;
}

.btnDisabled {
    padding: 6px 14px;
    border-radius: 4px;
    border: 1px solid var(--ba-bg-disabled);
    background: var(--ba-bg-disabled);
    color: var(--ba-fg-disabled);
    font-size: 12px;
    cursor: not-allowed;
}
```

- [ ] **Step 7: Create `preview/src/partials/ui-example-badges/index.tsx`**

```tsx
import styles from "./index.module.css";

interface Props {
    success: string;
    warning: string;
    error: string;
    info: string;
}

export function UiExampleBadges({ success, warning, error, info }: Props) {
    const states = [
        { label: "success", color: success },
        { label: "warning", color: warning },
        { label: "error", color: error },
        { label: "info", color: info },
    ];

    return (
        <div className={styles.example}>
            <div className={styles.label}>Notifications</div>
            <div className={styles.list}>
                {states.map(({ label, color }) => (
                    <div key={label} className={styles.item}>
                        <span
                            className={styles.dot}
                            style={{ background: color }}
                        />
                        <span className={styles.itemLabel}>{label}</span>
                        <span className={styles.message}>
                            Something {label === "error" ? "went wrong" : "happened"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 8: Create `preview/src/partials/ui-example-badges/index.module.css`**

```css
.example {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--ba-fg-disabled);
}

.list {
    background: var(--ba-bg);
    border: 1px solid var(--ba-bg-float);
    border-radius: 6px;
    overflow: hidden;
}

.item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--ba-bg-float);
    font-size: 12px;
}

.item:last-child {
    border-bottom: none;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}

.itemLabel {
    color: var(--ba-fg-subtle);
    width: 52px;
    flex-shrink: 0;
    font-size: 11px;
    text-transform: capitalize;
}

.message {
    color: var(--ba-fg);
}
```

- [ ] **Step 9: Commit all partials**

```bash
git add preview/src/partials/
git commit -m "feat(preview): add UI tab partials (token-group, stats-row, ui-examples)"
```

---

### Task 15: UiPreviewContainer

- [ ] **Step 1: Create `preview/src/containers/ui-preview/use-ui-preview.ts`**

```ts
import { useTheme } from "../../hooks/use-theme";
import { contrastRatio, wcagGrade } from "../../lib/contrast";
import type { ThemeDefinition } from "@core/types/theme.ts";

export interface ContrastData {
    ratio: number;
    grade: "AAA" | "AA" | "fail";
}

export interface UiPreviewData {
    theme: ThemeDefinition;
    contrast: ContrastData;
    paletteColors: string[];
    darkestPrimary: string;
    lightestPrimary: string;
    notificationColors: { success: string; warning: string; error: string; info: string };
}

export function useUiPreview(themeKey: string): {
    data: UiPreviewData | null;
    isLoading: boolean;
} {
    // themeKey may be '' on first render before auto-select fires
    const { data: theme, isLoading } = useTheme(themeKey || null);

    if (!theme) {
        // treat empty key as loading so the UI shows a spinner, not a permanent blank
        return { data: null, isLoading: isLoading || !themeKey };
    }

    const ratio = contrastRatio(theme.ui.fg.default, theme.ui.bg.default);

    return {
        data: {
            theme,
            contrast: { ratio, grade: wcagGrade(ratio) },
            paletteColors: Object.values(theme.palette),
            darkestPrimary: theme.primaries.d10,
            lightestPrimary: theme.primaries.l40,
            notificationColors: {
                success: theme.palette.green,
                warning: theme.palette.yellow,
                error: theme.palette.red,
                info: theme.palette.blue,
            },
        },
        isLoading: false,
    };
}
```

- [ ] **Step 2: Create `preview/src/containers/ui-preview/index.tsx`**

```tsx
import { useUiPreview } from "./use-ui-preview";
import { ColorTokenGroup } from "../../partials/color-token-group";
import { StatsRow } from "../../partials/stats-row";
import { UiExampleText } from "../../partials/ui-example-text";
import { UiExampleChrome } from "../../partials/ui-example-chrome";
import { UiExampleForm } from "../../partials/ui-example-form";
import { UiExampleBadges } from "../../partials/ui-example-badges";
import styles from "./index.module.css";

interface Props {
    themeKey: string;
}

export function UiPreviewContainer({ themeKey }: Props) {
    const { data, isLoading } = useUiPreview(themeKey);

    if (isLoading || !data) {
        return <div className={styles.loading}>Loading…</div>;
    }

    const { theme, contrast, paletteColors, darkestPrimary, lightestPrimary, notificationColors } = data;

    return (
        <div className={styles.page}>
            {/* Section 1: Color tokens */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    {theme.meta.collection.label} :: {theme.meta.name}
                </h2>

                <ColorTokenGroup
                    label="Primaries — Dark"
                    tokens={{
                        d10: theme.primaries.d10,
                        d20: theme.primaries.d20,
                        d30: theme.primaries.d30,
                        d40: theme.primaries.d40,
                    }}
                />
                <ColorTokenGroup
                    label="Primaries — Mid"
                    tokens={{
                        m10: theme.primaries.m10,
                        m20: theme.primaries.m20,
                        m30: theme.primaries.m30,
                        m40: theme.primaries.m40,
                    }}
                />
                <ColorTokenGroup
                    label="Primaries — Light"
                    tokens={{
                        l10: theme.primaries.l10,
                        l20: theme.primaries.l20,
                        l30: theme.primaries.l30,
                        l40: theme.primaries.l40,
                    }}
                />
                <ColorTokenGroup label="Palette" tokens={theme.palette as Record<string, string>} />
                <ColorTokenGroup label="UI Backgrounds" tokens={theme.ui.bg as Record<string, string>} />
                <ColorTokenGroup label="UI Foregrounds" tokens={theme.ui.fg as Record<string, string>} />
            </section>

            {/* Sections 2+3: Stats + UI Examples (side-by-side on desktop) */}
            <section className={styles.statsAndExamples}>
                <StatsRow
                    contrast={contrast}
                    paletteColors={paletteColors}
                    darkestPrimary={darkestPrimary}
                    lightestPrimary={lightestPrimary}
                />

                <div className={styles.examples}>
                    <UiExampleText />
                    <UiExampleChrome />
                    <UiExampleForm />
                    <UiExampleBadges
                        success={notificationColors.success}
                        warning={notificationColors.warning}
                        error={notificationColors.error}
                        info={notificationColors.info}
                    />
                </div>
            </section>
        </div>
    );
}
```

- [ ] **Step 3: Create `preview/src/containers/ui-preview/index.module.css`**

```css
.page {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--ba-fg-disabled);
    font-size: 13px;
}

.sectionTitle {
    font-size: 14px;
    font-weight: 600;
    color: var(--ba-fg-subtle);
    margin-bottom: 4px;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Stats + examples: side-by-side on desktop */
.statsAndExamples {
    display: flex;
    gap: 24px;
    align-items: flex-start;
}

.examples {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Mobile: stats row above examples */
@media (max-width: 768px) {
    .page {
        padding: 16px;
    }

    .statsAndExamples {
        flex-direction: column;
    }
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
cd preview && deno check src/containers/ui-preview/index.tsx src/containers/ui-preview/use-ui-preview.ts
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add preview/src/containers/ui-preview/
git commit -m "feat(preview): add UiPreviewContainer with color tokens, stats, and UI examples"
```

---

### Task 16: Delete old files

- [ ] **Step 1: Remove old source files**

```bash
rm preview/src/App.tsx preview/src/App.module.css
rm preview/src/components/ThemeSelector.tsx preview/src/components/ThemeSelector.module.css
rm preview/src/components/ColorSwatch.tsx preview/src/components/ColorSwatch.module.css
rm preview/src/tabs/UiPreview.tsx preview/src/tabs/UiPreview.module.css
rm preview/src/tabs/CodePreview.tsx preview/src/tabs/CodePreview.module.css
rm preview/src/api.ts
rmdir preview/src/tabs
```

- [ ] **Step 2: Type-check the full entry point to confirm no stale imports**

```bash
cd preview && deno check src/main.tsx
```

Expected: no errors. If any `api.ts` import remains somewhere, it will surface here.

- [ ] **Step 3: Start dev server and verify app loads without errors**

```bash
deno task dev
```

Open `http://localhost:4170` in browser. Expected:
- Three-column layout visible
- Theme list populated in right sidebar
- Clicking a theme updates the URL (`?theme=...`) and applies colors
- UI tab shows color swatches, stats, and UI examples
- Code tab shows "Coming soon"
- No console errors

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore(preview): remove old App, ThemeSelector, ColorSwatch, tabs"
```
