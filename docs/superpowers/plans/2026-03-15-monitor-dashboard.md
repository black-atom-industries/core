# Monitor Dashboard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a theme overview dashboard as the landing page, with a persistent bottom stats bar that adapts to route context.

**Architecture:** Bottom-up build — stats library first (TDD), then API endpoint, then dumb components, then containers/partials, then routing/layout integration. Each layer is testable independently.

**Tech Stack:** React 19, TanStack Router (file-based), TanStack Query, CSS Modules, Deno test runner

**Spec:** `docs/superpowers/specs/2026-03-14-monitor-dashboard-design.md`

---

## File Map

### New files

| File                                                            | Responsibility                                                              |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `monitor/src/lib/stats.ts`                                      | Pure functions: `themeContrast`, `collectionStats`, `orgStats`              |
| `monitor/src/lib/stats.test.ts`                                 | Unit tests for stats functions                                              |
| `monitor/src/components/stats-bar-layout/index.tsx`             | Dumb horizontal bar layout for the bottom slot                              |
| `monitor/src/components/stats-bar-layout/index.module.css`      | Styles for stats bar layout                                                 |
| `monitor/src/components/theme-preview-card/index.tsx`           | Dumb color grid card with meta footer                                       |
| `monitor/src/components/theme-preview-card/index.module.css`    | Styles for theme preview card                                               |
| `monitor/src/components/dashboard-page-layout/index.tsx`        | Dashboard page layout: padding, collection sections, card grid (dumb)       |
| `monitor/src/components/dashboard-page-layout/index.module.css` | Styles for dashboard page layout                                            |
| `monitor/src/containers/stats-bar.tsx`                          | Route-aware container — picks which stats partials to render                |
| `monitor/src/partials/stats-bar/org-stats.tsx`                  | Org-wide stats partial (theme count, collections, dark/light, avg contrast) |
| `monitor/src/partials/stats-bar/theme-stats.tsx`                | Theme-scoped stats partial (contrast, WCAG, hue spread, lightness)          |
| `monitor/src/lib/api-client.ts`                                 | Centralized fetch wrapper: base URL, error handling, typed responses        |
| `monitor/src/queries/themes.ts`                                 | All theme queries: `useThemeList`, `useTheme`, `useThemes` (new)            |
| `monitor/src/routes/index.tsx`                                  | Modified: render DashboardContainer instead of redirect                     |

### Modified files

| File                                                 | Change                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/monitor-server.ts`                              | Add `GET /api/themes/overview` endpoint                                                        |
| `monitor/src/components/app-layout/index.tsx`        | Add optional `bottomBar` slot                                                                  |
| `monitor/src/components/app-layout/index.module.css` | Add `.bottomBar` styles, change shell to column flex                                           |
| `monitor/src/containers/app.tsx`                     | Add StatsBarContainer to bottomBar slot, update nav hierarchy, conditionally show rightSidebar |

### Deleted files

| File                                  | Reason                                         |
| ------------------------------------- | ---------------------------------------------- |
| `monitor/src/hooks/use-theme-list.ts` | Moved to `queries/themes.ts` as `useThemeList` |
| `monitor/src/hooks/use-theme.ts`      | Moved to `queries/themes.ts` as `useTheme`     |

---

## Chunk 1: Stats Library (TDD)

### Task 1: Stats library — tests first

**Files:**

- Create: `monitor/src/lib/stats.ts`
- Create: `monitor/src/lib/stats.test.ts`

Reuses existing `contrastRatio` and `wcagGrade` from `monitor/src/lib/contrast.ts`.

- [ ] **Step 1: Write stats.test.ts with all test cases**

```ts
// monitor/src/lib/stats.test.ts
import { assertEquals } from "jsr:@std/assert";
import { collectionStats, orgStats, themeContrast } from "./stats.ts";

// Minimal fixtures matching ThemeDefinition shape (only fields stats needs)
const darkTheme = {
    meta: {
        key: "test-dark",
        name: "Dark",
        appearance: "dark" as const,
        status: "release" as const,
        collection: { key: "default", label: "Default" },
    },
    ui: { fg: { default: "#c5cad0" }, bg: { default: "#1a1d23" } },
} as Parameters<typeof themeContrast>[0];

const lightTheme = {
    meta: {
        key: "test-light",
        name: "Light",
        appearance: "light" as const,
        status: "release" as const,
        collection: { key: "default", label: "Default" },
    },
    ui: { fg: { default: "#353230" }, bg: { default: "#f0ece7" } },
} as Parameters<typeof themeContrast>[0];

Deno.test("themeContrast returns ratio and WCAG level", () => {
    const result = themeContrast(darkTheme);
    assertEquals(typeof result.ratio, "number");
    assertEquals(result.ratio > 1, true);
    assertEquals(["AAA", "AA", "fail"].includes(result.level), true);
});

Deno.test("themeContrast uses ui.fg.default vs ui.bg.default", () => {
    const result = themeContrast(darkTheme);
    // Dark theme with light fg on dark bg should have high contrast
    assertEquals(result.ratio > 7, true);
    assertEquals(result.level, "AAA");
});

Deno.test("collectionStats computes counts and avg contrast", () => {
    const result = collectionStats([darkTheme, lightTheme]);
    assertEquals(result.themeCount, 2);
    assertEquals(result.darkCount, 1);
    assertEquals(result.lightCount, 1);
    assertEquals(typeof result.avgContrast, "number");
    assertEquals(result.avgContrast > 1, true);
});

Deno.test("collectionStats with single theme", () => {
    const result = collectionStats([darkTheme]);
    assertEquals(result.themeCount, 1);
    assertEquals(result.darkCount, 1);
    assertEquals(result.lightCount, 0);
});

Deno.test("orgStats aggregates across collections", () => {
    const collections = [
        { collection: "default", themes: [darkTheme, lightTheme] },
        { collection: "jpn", themes: [darkTheme] },
    ];
    const result = orgStats(collections);
    assertEquals(result.themeCount, 3);
    assertEquals(result.collectionCount, 2);
    assertEquals(result.darkCount, 2);
    assertEquals(result.lightCount, 1);
    assertEquals(typeof result.avgContrast, "number");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `deno test monitor/src/lib/stats.test.ts`
Expected: FAIL — `stats.ts` doesn't exist yet

- [ ] **Step 3: Implement stats.ts**

```ts
// monitor/src/lib/stats.ts
import { contrastRatio, wcagGrade } from "./contrast.ts";

type ThemeForStats = {
    meta: { appearance: "dark" | "light" };
    ui: { fg: { default: string }; bg: { default: string } };
};

type CollectionForStats = {
    collection: string;
    themes: ThemeForStats[];
};

export interface ThemeContrastResult {
    ratio: number;
    level: "AAA" | "AA" | "fail";
}

export interface CollectionStatsResult {
    themeCount: number;
    darkCount: number;
    lightCount: number;
    avgContrast: number;
}

export interface OrgStatsResult {
    themeCount: number;
    collectionCount: number;
    darkCount: number;
    lightCount: number;
    avgContrast: number;
}

export function themeContrast(theme: ThemeForStats): ThemeContrastResult {
    const ratio = contrastRatio(theme.ui.fg.default, theme.ui.bg.default);
    return { ratio, level: wcagGrade(ratio) };
}

export function collectionStats(themes: ThemeForStats[]): CollectionStatsResult {
    const contrasts = themes.map((t) => themeContrast(t).ratio);
    return {
        themeCount: themes.length,
        darkCount: themes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: themes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.reduce((a, b) => a + b, 0) / contrasts.length,
    };
}

export function orgStats(collections: CollectionForStats[]): OrgStatsResult {
    const allThemes = collections.flatMap((c) => c.themes);
    const contrasts = allThemes.map((t) => themeContrast(t).ratio);
    return {
        themeCount: allThemes.length,
        collectionCount: collections.length,
        darkCount: allThemes.filter((t) => t.meta.appearance === "dark").length,
        lightCount: allThemes.filter((t) => t.meta.appearance === "light").length,
        avgContrast: contrasts.reduce((a, b) => a + b, 0) / contrasts.length,
    };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `deno test monitor/src/lib/stats.test.ts`
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```
feat(monitor): add stats library with themeContrast, collectionStats, orgStats [DEV-311]
```

---

## Chunk 2: API Endpoint

### Task 2: Add /api/themes/overview endpoint

**Files:**

- Modify: `src/monitor-server.ts`

- [ ] **Step 1: Add overview endpoint before the existing `/api/themes/:key` match**

In `src/monitor-server.ts`, after the `if (path === "/api/themes")` block, add:

```ts
// GET /api/themes/overview — primaries + palette + contrast per theme
if (path === "/api/themes/overview") {
    const overview = groupedMetas.map((group) => ({
        collection: group.collection,
        themes: group.themes.map((meta) => {
            const theme = themeMap![meta.key as ThemeKey];
            const ratio = contrastRatio(theme.ui.fg.default, theme.ui.bg.default);
            return {
                meta,
                primaries: theme.primaries,
                palette: theme.palette,
                contrast: {
                    ratio,
                    level: wcagGrade(ratio),
                },
            };
        }),
    }));
    return json({ collections: overview });
}
```

Before adding the endpoint, copy the contrast utilities to a shared location since the server can't import from `monitor/src/`:

```bash
cp monitor/src/lib/contrast.ts src/lib/contrast.ts
```

Then add import at the top of `src/monitor-server.ts`:

```ts
import { contrastRatio, wcagGrade } from "./lib/contrast.ts";
```

The monitor can later be updated to import from `@core/lib/contrast.ts` to deduplicate, but that's a follow-up cleanup.

- [ ] **Step 2: Verify the endpoint works**

Run: `deno task dev` then `curl http://localhost:4171/api/themes/overview | head -c 500`
Expected: JSON with collections array, each theme having meta, primaries, palette, and contrast fields

- [ ] **Step 3: Commit**

```
feat(monitor): add /api/themes/overview endpoint with contrast data [DEV-311]
```

---

## Chunk 3: Dumb Components

### Task 3: ThemePreviewCard component

**Files:**

- Create: `monitor/src/components/theme-preview-card/index.tsx`
- Create: `monitor/src/components/theme-preview-card/index.module.css`

- [ ] **Step 1: Create the CSS module**

```css
/* monitor/src/components/theme-preview-card/index.module.css */
.card {
    width: 164px;
    background: var(--ba-bg-panel);
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
}

.card:hover {
    outline: 1px solid var(--ba-bg-float);
}

.grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 6px 6px 0;
}

.swatch {
    aspect-ratio: 1;
}

.meta {
    padding: 6px 8px 8px;
}

.name {
    font-size: 12px;
    color: var(--ba-fg);
    margin-bottom: 2px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contrast {
    font-size: 10px;
    color: var(--ba-fg-subtle);
}
```

- [ ] **Step 2: Create the component**

```tsx
// monitor/src/components/theme-preview-card/index.tsx
import type { ThemePaletteColors, ThemePrimaryColors } from "@core/types/theme.ts";
import { AppearanceBadge } from "../appearance-badge";
import styles from "./index.module.css";

interface Props {
    name: string;
    appearance: "dark" | "light";
    primaries: ThemePrimaryColors;
    palette: ThemePaletteColors;
    contrastRatio: number;
    onClick: () => void;
}

const PRIMARY_ORDER = [
    "d10",
    "d20",
    "d30",
    "d40",
    "m10",
    "m20",
    "m30",
    "m40",
    "l10",
    "l20",
    "l30",
    "l40",
] as const;

const PALETTE_ORDER = [
    "black",
    "gray",
    "red",
    "darkRed",
    "yellow",
    "darkYellow",
    "green",
    "darkGreen",
    "cyan",
    "darkCyan",
    "blue",
    "darkBlue",
    "magenta",
    "darkMagenta",
    "lightGray",
    "white",
] as const;

export function ThemePreviewCard(
    { name, appearance, primaries, palette, contrastRatio, onClick }: Props,
) {
    const colors = [
        ...PRIMARY_ORDER.map((key) => primaries[key]),
        ...PALETTE_ORDER.map((key) => palette[key]),
    ];

    return (
        <div className={styles.card} onClick={onClick} data-component="ThemePreviewCard">
            <div className={styles.grid}>
                {colors.map((color, i) => (
                    <div key={i} className={styles.swatch} style={{ background: color }} />
                ))}
            </div>
            <div className={styles.meta}>
                <div className={styles.name}>{name}</div>
                <div className={styles.footer}>
                    <span className={styles.contrast}>{contrastRatio.toFixed(1)}:1</span>
                    <AppearanceBadge appearance={appearance} />
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 3: Commit**

```
feat(monitor): add ThemePreviewCard component [DEV-311]
```

### Task 4: StatsBarLayout component

**Files:**

- Create: `monitor/src/components/stats-bar-layout/index.tsx`
- Create: `monitor/src/components/stats-bar-layout/index.module.css`

- [ ] **Step 1: Create the CSS module**

```css
/* monitor/src/components/stats-bar-layout/index.module.css */
.bar {
    background: var(--ba-bg-panel);
    border-top: 1px solid var(--ba-bg-float);
    padding: 6px 16px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.item {
    text-align: center;
    flex: 1;
    padding: 2px 8px;
}

.item + .item {
    border-left: 1px solid var(--ba-bg-float);
}

.label {
    font-size: 9px;
    text-transform: uppercase;
    color: var(--ba-fg-subtle);
    letter-spacing: 0.5px;
}

.value {
    font-size: 16px;
    color: var(--ba-fg);
    font-weight: 300;
}
```

- [ ] **Step 2: Create the component**

```tsx
// monitor/src/components/stats-bar-layout/index.tsx
import type { ReactNode } from "react";
import styles from "./index.module.css";

interface StatItem {
    label: string;
    value: ReactNode;
}

interface Props {
    items: StatItem[];
}

export function StatsBarLayout({ items }: Props) {
    return (
        <div className={styles.bar} data-component="StatsBarLayout">
            {items.map((item) => (
                <div key={item.label} className={styles.item}>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.value}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}
```

- [ ] **Step 3: Commit**

```
feat(monitor): add StatsBarLayout component [DEV-311]
```

---

## Chunk 4: AppLayout Changes

### Task 5: Add bottomBar slot to AppLayout

**Files:**

- Modify: `monitor/src/components/app-layout/index.tsx`
- Modify: `monitor/src/components/app-layout/index.module.css`

- [ ] **Step 1: Update CSS — wrap shell in column flex with bottomBar**

Change `.shell` from `display: flex` (horizontal) to a column wrapper containing the existing horizontal layout + a bottom bar.

In `monitor/src/components/app-layout/index.module.css`, change:

```css
.shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background: var(--ba-bg);
    color: var(--ba-fg);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    font-size: 13px;
}

.body {
    display: flex;
    flex: 1;
    overflow: hidden;
}
```

Keep `.leftNav`, `.main`, `.rightSidebar` unchanged. Add:

```css
.bottomBar {
    flex-shrink: 0;
}
```

Note: the existing `@media (max-width: 768px)` block references `.shell` as a horizontal flex container — it should now target `.body` instead. Mobile layout is out of scope (spec), but update the selector to avoid breaking existing mobile styles.

- [ ] **Step 2: Update component — add body wrapper and bottomBar prop**

Make `rightSidebar` optional (dashboard doesn't use it). Add `bottomBar` slot.

```tsx
// monitor/src/components/app-layout/index.tsx
import type { ReactNode } from "react";
import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    leftNav: ReactNode;
    main: ReactNode;
    rightSidebar?: ReactNode;
    bottomBar?: ReactNode;
};

export function AppLayout({ leftNav, main, rightSidebar, bottomBar, ...rest }: Props) {
    return (
        <div className={styles.shell} data-layout="AppLayout" {...rest}>
            <div className={styles.body}>
                <nav className={styles.leftNav}>{leftNav}</nav>
                <main className={styles.main}>{main}</main>
                {rightSidebar && <aside className={styles.rightSidebar}>{rightSidebar}</aside>}
            </div>
            {bottomBar && <div className={styles.bottomBar}>{bottomBar}</div>}
        </div>
    );
}
```

- [ ] **Step 3: Verify type check passes**

Run: `cd monitor && deno task check`
Expected: PASS (rightSidebar is now optional, all existing usage still works)

- [ ] **Step 4: Commit**

```
refactor(monitor): add bottomBar slot and optional rightSidebar to AppLayout [DEV-311]
```

---

## Chunk 5: Stats Bar Container & Partials

### Task 6: Stats bar partials

**Files:**

- Create: `monitor/src/partials/stats-bar/org-stats.tsx`
- Create: `monitor/src/partials/stats-bar/theme-stats.tsx`

- [ ] **Step 1: Create OrgStatsPartial**

```tsx
// monitor/src/partials/stats-bar/org-stats.tsx
import type { OrgStatsResult } from "../../lib/stats.ts";
import { StatsBarLayout } from "../../components/stats-bar-layout";

interface Props {
    stats: OrgStatsResult;
}

export function OrgStatsPartial({ stats }: Props) {
    return (
        <StatsBarLayout
            items={[
                { label: "Themes", value: stats.themeCount },
                { label: "Collections", value: stats.collectionCount },
                { label: "Dark / Light", value: `${stats.darkCount} / ${stats.lightCount}` },
                {
                    label: "Avg Contrast",
                    value: (
                        <span style={{ color: "var(--ba-fg-positive)" }}>
                            {stats.avgContrast.toFixed(1)}:1
                        </span>
                    ),
                },
            ]}
        />
    );
}
```

- [ ] **Step 2: Create ThemeStatsPartial**

```tsx
// monitor/src/partials/stats-bar/theme-stats.tsx
import type { ThemeContrastResult } from "../../lib/stats.ts";
import { StatsBarLayout } from "../../components/stats-bar-layout";

interface Props {
    contrast: ThemeContrastResult;
    collectionLabel: string;
    hueSpreadColors: string[];
    lightnessRange: [string, string];
}

export function ThemeStatsPartial(
    { contrast, collectionLabel, hueSpreadColors, lightnessRange }: Props,
) {
    const contrastColor = contrast.level === "fail"
        ? "var(--ba-fg-negative)"
        : "var(--ba-fg-positive)";

    return (
        <StatsBarLayout
            items={[
                {
                    label: "Contrast",
                    value: (
                        <span style={{ color: contrastColor }}>{contrast.ratio.toFixed(2)}:1</span>
                    ),
                },
                {
                    label: "WCAG",
                    value: (
                        <span style={{ color: contrastColor }}>{contrast.level.toUpperCase()}</span>
                    ),
                },
                {
                    label: "Hue Spread",
                    value: (
                        <div style={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            {hueSpreadColors.map((c, i) => (
                                <div key={i} style={{ width: 6, height: 12, background: c }} />
                            ))}
                        </div>
                    ),
                },
                {
                    label: "Lightness",
                    value: (
                        <div
                            style={{
                                height: 10,
                                borderRadius: 1,
                                background: `linear-gradient(to right, ${lightnessRange[0]}, ${
                                    lightnessRange[1]
                                })`,
                            }}
                        />
                    ),
                },
                { label: "Collection", value: collectionLabel },
            ]}
        />
    );
}
```

- [ ] **Step 3: Commit**

```
feat(monitor): add stats bar partials for org and theme views [DEV-311]
```

### Task 7: StatsBarContainer

**Files:**

- Create: `monitor/src/containers/stats-bar.tsx`

- [ ] **Step 1: Create route-aware container**

```tsx
// monitor/src/containers/stats-bar.tsx
import { useMatchRoute, useSearch } from "@tanstack/react-router";
import { useTheme, useThemes } from "../queries/themes";
import { orgStats, themeContrast } from "../lib/stats";
import { OrgStatsPartial } from "../partials/stats-bar/org-stats";
import { ThemeStatsPartial } from "../partials/stats-bar/theme-stats";

export function StatsBarContainer() {
    const matchRoute = useMatchRoute();
    const isDashboard = !!matchRoute({ to: "/" });

    const { theme: themeKey } = useSearch({ from: "__root__" });
    const { data: theme } = useTheme(isDashboard ? null : (themeKey || null));
    const { data: overview } = useThemes({ enabled: isDashboard });

    if (isDashboard && overview) {
        const stats = orgStats(overview.collections);
        return <OrgStatsPartial stats={stats} />;
    }

    if (!isDashboard && theme) {
        const contrast = themeContrast(theme);
        const hueSpreadColors = [
            theme.palette.red,
            theme.palette.yellow,
            theme.palette.green,
            theme.palette.cyan,
            theme.palette.blue,
            theme.palette.magenta,
        ];
        const lightnessRange: [string, string] = [theme.primaries.d10, theme.primaries.l40];
        return (
            <ThemeStatsPartial
                contrast={contrast}
                collectionLabel={theme.meta.collection.label}
                hueSpreadColors={hueSpreadColors}
                lightnessRange={lightnessRange}
            />
        );
    }

    return null;
}
```

- [ ] **Step 2: Commit**

```
feat(monitor): add route-aware StatsBarContainer [DEV-311]
```

---

## Chunk 6: Overview Hook & Dashboard

### Task 8a: Centralized API client

**Files:**

- Create: `monitor/src/lib/api-client.ts`

- [ ] **Step 1: Create the fetch wrapper**

```tsx
// monitor/src/lib/api-client.ts

export class ApiError extends Error {
    constructor(
        public status: number,
        public body: string,
    ) {
        super(`API error ${status}: ${body}`);
        this.name = "ApiError";
    }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestOptions = {},
): Promise<T> {
    const { body, headers, ...rest } = options;

    const response = await fetch(`/api${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
    });

    if (!response.ok) {
        throw new ApiError(response.status, await response.text());
    }

    return response.json();
}
```

- [ ] **Step 2: Commit**

```
feat(monitor): add centralized API client [DEV-311]
```

### Task 8b: Consolidate all theme queries into queries/themes.ts

**Files:**

- Create: `monitor/src/queries/themes.ts`
- Delete: `monitor/src/hooks/use-theme-list.ts`
- Delete: `monitor/src/hooks/use-theme.ts`
- Modify: imports in `app.tsx`, `ui-preview.tsx`, `use-ui-preview.ts`

Migrates existing `useThemeList` and `useTheme` from `hooks/` and adds new `useThemes`. All queries use `apiClient` instead of raw `fetch`. Follows project TanStack Query conventions: topic-based keys, `Omit<>` for options passthrough.

- [ ] **Step 1: Create queries/themes.ts with all three queries**

```tsx
// monitor/src/queries/themes.ts
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type {
    ThemeCollectionKey,
    ThemeDefinition,
    ThemeMeta,
    ThemePaletteColors,
    ThemePrimaryColors,
} from "@core/types/theme.ts";
import { apiClient } from "../lib/api-client";

const TOPIC = "themes" as const;

function queryKey(keys: string[]) {
    return [TOPIC, ...keys];
}

// -- Types --

interface CollectionGroup {
    collection: ThemeCollectionKey;
    themes: ThemeMeta[];
}

export interface ThemeListResponse {
    collections: CollectionGroup[];
}

export interface ThemeSummary {
    meta: ThemeMeta;
    primaries: ThemePrimaryColors;
    palette: ThemePaletteColors;
    contrast: { ratio: number; level: "AAA" | "AA" | "fail" };
}

export interface ThemesResponse {
    collections: Array<{
        collection: ThemeCollectionKey;
        themes: ThemeSummary[];
    }>;
}

// -- Queries --

type UseThemeListQueryOptions = Omit<
    UseQueryOptions<ThemeListResponse>,
    "queryKey" | "queryFn"
>;

export function useThemeList(queryOptions?: UseThemeListQueryOptions) {
    return useQuery<ThemeListResponse>({
        queryKey: queryKey(["list"]),
        queryFn: ({ signal }) => apiClient<ThemeListResponse>("/themes", { signal }),
        ...queryOptions,
    });
}

type UseThemeQueryOptions = Omit<
    UseQueryOptions<ThemeDefinition>,
    "queryKey" | "queryFn"
>;

export function useTheme(
    key: string | null,
    queryOptions?: UseThemeQueryOptions,
) {
    return useQuery<ThemeDefinition>({
        queryKey: queryKey(["detail", key ?? ""]),
        queryFn: ({ signal }) => apiClient<ThemeDefinition>(`/themes/${key}`, { signal }),
        enabled: !!key,
        ...queryOptions,
    });
}

type UseThemesQueryOptions = Omit<
    UseQueryOptions<ThemesResponse>,
    "queryKey" | "queryFn"
>;

export function useThemes(queryOptions?: UseThemesQueryOptions) {
    return useQuery<ThemesResponse>({
        queryKey: queryKey(["overview"]),
        queryFn: ({ signal }) => apiClient<ThemesResponse>("/themes/overview", { signal }),
        ...queryOptions,
    });
}
```

- [ ] **Step 2: Delete old hook files**

```bash
rm monitor/src/hooks/use-theme-list.ts monitor/src/hooks/use-theme.ts
```

- [ ] **Step 3: Update imports in all consumers**

In `containers/app.tsx`:

```tsx
import { useTheme, useThemeList } from "../queries/themes";
```

In `containers/ui-preview.tsx` (if it imports useTheme):

```tsx
import { useTheme } from "../queries/themes";
```

In `hooks/use-ui-preview.ts`:

```tsx
import { useTheme } from "../queries/themes";
```

- [ ] **Step 4: Verify type check passes**

Run: `cd monitor && deno task check`
Expected: PASS

- [ ] **Step 5: Commit**

```
refactor(monitor): consolidate theme queries into queries/themes.ts [DEV-311]
```

### Task 9: DashboardPageLayout component

**Files:**

- Create: `monitor/src/components/dashboard-page-layout/index.tsx`
- Create: `monitor/src/components/dashboard-page-layout/index.module.css`

- [ ] **Step 1: Create the CSS module**

```css
/* monitor/src/components/dashboard-page-layout/index.module.css */
.page {
    padding: 16px 20px;
}

.section {
    margin-bottom: 24px;
}

.cardGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
}
```

- [ ] **Step 2: Create the layout component**

```tsx
// monitor/src/components/dashboard-page-layout/index.tsx
import type { ReactNode } from "react";
import styles from "./index.module.css";

interface SectionProps {
    children: ReactNode;
}

export function DashboardPageLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.page} data-layout="DashboardPageLayout">
            {children}
        </div>
    );
}

export function DashboardSection({ children }: SectionProps) {
    return <div className={styles.section}>{children}</div>;
}

export function DashboardCardGrid({ children }: SectionProps) {
    return <div className={styles.cardGrid}>{children}</div>;
}
```

- [ ] **Step 3: Commit**

```
feat(monitor): add DashboardPageLayout component [DEV-311]
```

---

## Chunk 7: Routing & Layout Integration

### Task 10: Dashboard route + AppContainer updates

**Files:**

- Modify: `monitor/src/routes/index.tsx`
- Modify: `monitor/src/containers/app.tsx`

- [ ] **Step 1: Update index route — inline component, no container import**

```tsx
// monitor/src/routes/index.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useThemes } from "../queries/themes";
import { Placeholder } from "../components/placeholder";
import { CollectionLabel } from "../components/collection-label";
import { ThemePreviewCard } from "../components/theme-preview-card";
import {
    DashboardCardGrid,
    DashboardPageLayout,
    DashboardSection,
} from "../components/dashboard-page-layout";

export const Route = createFileRoute("/")({
    component: Component,
});

function Component() {
    const { data, isLoading } = useThemes();
    const navigate = useNavigate();

    if (isLoading || !data) {
        return (
            <Placeholder minHeight={200}>
                <p>Loading…</p>
            </Placeholder>
        );
    }

    return (
        <DashboardPageLayout>
            {data.collections.map((group) => {
                const darkCount = group.themes.filter((t) => t.meta.appearance === "dark").length;
                const lightCount = group.themes.length - darkCount;
                const avgContrast = group.themes.reduce((sum, t) => sum + t.contrast.ratio, 0) /
                    group.themes.length;
                return (
                    <DashboardSection key={group.collection}>
                        <CollectionLabel>
                            {group.collection} · {group.themes.length} themes · {darkCount} dark,
                            {" "}
                            {lightCount} light · avg {avgContrast.toFixed(1)}:1
                        </CollectionLabel>
                        <DashboardCardGrid>
                            {group.themes.map((t) => (
                                <ThemePreviewCard
                                    key={t.meta.key}
                                    name={t.meta.name}
                                    appearance={t.meta.appearance}
                                    primaries={t.primaries}
                                    palette={t.palette}
                                    contrastRatio={t.contrast.ratio}
                                    onClick={() =>
                                        navigate({
                                            to: "/preview/ui",
                                            search: { theme: t.meta.key },
                                        })}
                                />
                            ))}
                        </DashboardCardGrid>
                    </DashboardSection>
                );
            })}
        </DashboardPageLayout>
    );
}
```

- [ ] **Step 2: Update AppContainer — add nav hierarchy, bottomBar, conditional sidebar**

Key changes to `monitor/src/containers/app.tsx`:

- Add `StatsBarContainer` as `bottomBar` prop
- Change nav: Dashboard as top-level, Preview as section with UI/Code nested
- Make `rightSidebar` conditional — only show on preview pages (when `matchRoute` hits `/preview/*`)
- Remove auto-select-first-theme logic (only relevant for preview pages, not dashboard)

```tsx
// Replace nav section in leftNav:
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
            onClick={() => navigate({ to: "/preview/code", search: (prev) => prev })}
        />
    </NavSection>
</>;
```

Add to imports: `import { StatsBarContainer } from "./stats-bar";`

Add `bottomBar` prop to `<AppLayout>`:

```tsx
bottomBar={<StatsBarContainer />}
```

Make rightSidebar conditional:

```tsx
rightSidebar={
    isPreviewPage ? (
        <>
            {themeList?.collections.map((group) => (
                // ... existing sidebar content
            ))}
        </>
    ) : undefined
}
```

Where `isPreviewPage` is:

```tsx
const isPreviewPage = !!matchRoute({ to: "/preview/ui" }) || !!matchRoute({ to: "/preview/code" });
```

- [ ] **Step 3: Regenerate route tree**

Run: `cd monitor && deno task dev` (TanStack Router auto-generates routeTree.gen.ts)

- [ ] **Step 4: Run type check**

Run: `cd monitor && deno task check`
Expected: PASS

- [ ] **Step 5: Verify in browser**

Run: `deno task dev` then open `http://localhost:4170/`

Verify:

1. Dashboard loads at `/` with collection sections and theme cards
2. Bottom stats bar shows org-wide stats (theme count, collections, etc.)
3. Clicking a theme card navigates to `/preview/ui?theme=<key>`
4. On preview pages, bottom stats bar shows theme-scoped stats
5. Right sidebar only appears on preview pages
6. Nav shows Dashboard as top-level, Preview section with UI/Code nested

- [ ] **Step 6: Commit**

```
feat(monitor): integrate dashboard route, stats bar, and nav hierarchy [DEV-311]
```

- [ ] **Step 7: Run full checks**

Run: `deno task checks`
Expected: All type checks, lint, and format pass
