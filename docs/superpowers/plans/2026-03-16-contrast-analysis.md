# Contrast & Readability Analysis Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if
> subagents available) or superpowers:executing-plans to implement this plan. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive WCAG contrast analysis for all intended fg/bg pairings per
theme, and redesign the monitor layout with a top navigation bar and persistent analytics
sidebar.

**Architecture:** Core gets a new `contrast-analysis.ts` module that defines intended
fg/bg pairings and computes `ThemeContrastAnalysis`. Monitor replaces the current
left-nav/right-sidebar/bottom-bar layout with a top `NavigationMenu` (Base UI) and a left
analytics sidebar on preview pages.

**Tech Stack:** TypeScript, culori (wcagContrast), Deno, Base UI (`@base-ui/react`),
React 19, TanStack Router, TanStack Query, CSS Modules

**Spec:** `docs/superpowers/specs/2026-03-16-contrast-analysis-design.md`
**Mockup:** `docs/superpowers/specs/dev-312/mockup-final-layout.png`

---

## File Map

### Core (create)

| File | Responsibility |
|-|-|
| `src/lib/contrast-analysis.ts` | Intended pairings config + `analyzeThemeContrast()` |
| `src/lib/contrast-analysis.test.ts` | Tests for pairings resolution and analysis |

### Monitor (create)

| File | Responsibility |
|-|-|
| `monitor/src/components/top-nav/index.tsx` | Top navigation bar (Base UI NavigationMenu) |
| `monitor/src/components/top-nav/index.module.css` | Top nav styles |
| `monitor/src/components/top-nav/theme-selector.tsx` | Theme dropdown with collection groups + filter |
| `monitor/src/components/top-nav/theme-selector.module.css` | Theme selector styles |
| `monitor/src/components/analytics-sidebar/index.tsx` | Contrast analysis sidebar panel |
| `monitor/src/components/analytics-sidebar/index.module.css` | Analytics sidebar styles |
| `monitor/src/components/analytics-sidebar/contrast-pair-row.tsx` | Single contrast pair display row |
| `monitor/src/components/analytics-sidebar/contrast-category.tsx` | Category group (label + pair rows) |
| `monitor/src/components/analytics-sidebar/pass-rate-summary.tsx` | AA/AAA pass rate display |
| `monitor/src/components/analytics-sidebar/worst-pair-card.tsx` | Worst pair callout card |

### Monitor (modify)

| File | Change |
|-|-|
| `monitor/deno.json` | Add `@base-ui/react` dependency |
| `monitor/src/components/app-layout/index.tsx` | New layout: topBar + leftSidebar + main (remove leftNav, rightSidebar, bottomBar) |
| `monitor/src/components/app-layout/index.module.css` | New grid/flex layout styles |
| `monitor/src/routes/__root.tsx` | Replace nav/sidebar/stats-bar with TopNav + AnalyticsSidebar |
| `monitor/src/routes/index.tsx` | Remove OrgStatsPartial usage if present |

### Monitor (delete after migration)

| File | Reason |
|-|-|
| `monitor/src/partials/stats-bar/org-stats.tsx` | Bottom bar removed |
| `monitor/src/partials/stats-bar/theme-stats.tsx` | Replaced by analytics sidebar |
| `monitor/src/components/nav-item/` | Replaced by Base UI NavigationMenu |
| `monitor/src/components/nav-section/` | Replaced by Base UI NavigationMenu |
| `monitor/src/components/nav-section-label/` | Replaced by Base UI NavigationMenu |
| `monitor/src/components/stats-bar-layout/` | Bottom bar removed |

---

## Chunk 1: Core — Contrast Analysis Module

### Task 1.1: Define intended pairings config and types

**Files:**
- Create: `src/lib/contrast-analysis.ts`
- Create: `src/lib/contrast-analysis.test.ts`

- [ ] **Step 1: Write the test for pairings config structure**

```ts
/// <reference lib="deno.ns" />
import { assertEquals } from "@std/assert";
import { INTENDED_PAIRINGS } from "./contrast-analysis.ts";

Deno.test("INTENDED_PAIRINGS has all expected categories", () => {
    const names = INTENDED_PAIRINGS.map((c) => c.name);
    assertEquals(names, [
        "Content on surfaces",
        "Interactive states",
        "Feedback",
        "Diff",
        "Contrast inversion",
    ]);
});

Deno.test("each pairing has fg and bg keys", () => {
    for (const category of INTENDED_PAIRINGS) {
        for (const pair of category.pairs) {
            assertEquals(typeof pair.fg, "string");
            assertEquals(typeof pair.bg, "string");
            assertEquals(pair.fg.startsWith("fg."), true, `${pair.fg} should start with fg.`);
            assertEquals(pair.bg.startsWith("bg."), true, `${pair.bg} should start with bg.`);
        }
    }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/nbr/repos/black-atom-industries/core && deno test --allow-all src/lib/contrast-analysis.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement pairings config and types**

```ts
import type { WcagGrade } from "./wcag.ts";

/** A defined fg/bg key pairing that occurs in real UI. */
export interface PairingDef {
    fg: string; // e.g. "fg.default"
    bg: string; // e.g. "bg.panel"
}

/** A category of intended pairings. */
export interface PairingCategory {
    name: string;
    pairs: PairingDef[];
}

/** Computed contrast result for a single pairing. */
export interface ContrastPair {
    fg: { key: string; color: string };
    bg: { key: string; color: string };
    ratio: number;
    level: WcagGrade;
}

/** Computed category with resolved contrast pairs. */
export interface ContrastCategory {
    name: string;
    pairs: ContrastPair[];
}

/** Full contrast analysis result for a theme. */
export interface ThemeContrastAnalysis {
    primary: ContrastPair;
    categories: ContrastCategory[];
    passRate: { aa: number; aaa: number };
    worstPair: ContrastPair;
}

/**
 * Global intended pairings config.
 * Defines which fg/bg combinations actually occur in real UI.
 * Exported so adapters/tools can reference it.
 */
export const INTENDED_PAIRINGS: PairingCategory[] = [
    {
        name: "Content on surfaces",
        pairs: [
            // fg.default on all surface backgrounds
            { fg: "fg.default", bg: "bg.default" },
            { fg: "fg.default", bg: "bg.panel" },
            { fg: "fg.default", bg: "bg.float" },
            // fg.subtle on all surface backgrounds
            { fg: "fg.subtle", bg: "bg.default" },
            { fg: "fg.subtle", bg: "bg.panel" },
            { fg: "fg.subtle", bg: "bg.float" },
            // fg.accent on all surface backgrounds
            { fg: "fg.accent", bg: "bg.default" },
            { fg: "fg.accent", bg: "bg.panel" },
            { fg: "fg.accent", bg: "bg.float" },
            // fg.disabled on default
            { fg: "fg.disabled", bg: "bg.default" },
        ],
    },
    {
        name: "Interactive states",
        pairs: [
            { fg: "fg.default", bg: "bg.active" },
            { fg: "fg.default", bg: "bg.hover" },
            { fg: "fg.default", bg: "bg.selection" },
            { fg: "fg.default", bg: "bg.search" },
        ],
    },
    {
        name: "Feedback",
        pairs: [
            // Feedback fg on matching bg
            { fg: "fg.negative", bg: "bg.negative" },
            { fg: "fg.warn", bg: "bg.warn" },
            { fg: "fg.positive", bg: "bg.positive" },
            { fg: "fg.info", bg: "bg.info" },
            { fg: "fg.hint", bg: "bg.hint" },
            // Feedback fg on default bg (inline usage)
            { fg: "fg.negative", bg: "bg.default" },
            { fg: "fg.warn", bg: "bg.default" },
            { fg: "fg.positive", bg: "bg.default" },
            { fg: "fg.info", bg: "bg.default" },
            { fg: "fg.hint", bg: "bg.default" },
        ],
    },
    {
        name: "Diff",
        pairs: [
            { fg: "fg.add", bg: "bg.add" },
            { fg: "fg.delete", bg: "bg.delete" },
            { fg: "fg.modify", bg: "bg.modify" },
        ],
    },
    {
        name: "Contrast inversion",
        pairs: [
            { fg: "fg.contrast", bg: "bg.contrast" },
        ],
    },
];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `deno test --allow-all src/lib/contrast-analysis.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/contrast-analysis.ts src/lib/contrast-analysis.test.ts
git commit -m "feat(core): add intended pairings config for contrast analysis [DEV-312]"
```

### Task 1.2: Implement analyzeThemeContrast function

**Files:**
- Modify: `src/lib/contrast-analysis.ts`
- Modify: `src/lib/contrast-analysis.test.ts`

- [ ] **Step 1: Write the test for analyzeThemeContrast**

Add to `contrast-analysis.test.ts`:

```ts
import { analyzeThemeContrast, INTENDED_PAIRINGS } from "./contrast-analysis.ts";

// Minimal theme fixture with high-contrast dark theme colors
const testTheme = {
    ui: {
        bg: {
            default: "#1a1d23",
            panel: "#1e2128",
            float: "#22252c",
            active: "#2a2d35",
            disabled: "#2e3138",
            hover: "#262930",
            selection: "#2a3040",
            search: "#2a3530",
            contrast: "#e0e0e0",
            negative: "#3a1a1a",
            warn: "#3a3a1a",
            info: "#1a2a3a",
            hint: "#2a2a3a",
            positive: "#1a3a1a",
            add: "#1a3a2a",
            delete: "#3a1a2a",
            modify: "#2a2a3a",
        },
        fg: {
            default: "#c5cad0",
            subtle: "#8a8f96",
            accent: "#7aaa8a",
            disabled: "#555a60",
            contrast: "#1a1d23",
            negative: "#e06060",
            warn: "#d0a030",
            info: "#6090d0",
            hint: "#8080b0",
            positive: "#60b060",
            add: "#60c060",
            delete: "#d06060",
            modify: "#8080d0",
        },
    },
} as unknown as import("../types/theme.ts").ThemeDefinition;

Deno.test("analyzeThemeContrast returns correct structure", () => {
    const result = analyzeThemeContrast(testTheme);
    assertEquals(typeof result.primary.ratio, "number");
    assertEquals(result.primary.fg.key, "fg.default");
    assertEquals(result.primary.bg.key, "bg.default");
    assertEquals(result.categories.length, INTENDED_PAIRINGS.length);
    assertEquals(typeof result.passRate.aa, "number");
    assertEquals(typeof result.passRate.aaa, "number");
    assertEquals(result.passRate.aa >= 0 && result.passRate.aa <= 1, true);
    assertEquals(result.passRate.aaa >= 0 && result.passRate.aaa <= 1, true);
    assertEquals(typeof result.worstPair.ratio, "number");
});

Deno.test("analyzeThemeContrast primary pair matches fg.default/bg.default", () => {
    const result = analyzeThemeContrast(testTheme);
    assertEquals(result.primary.fg.color, "#c5cad0");
    assertEquals(result.primary.bg.color, "#1a1d23");
    assertEquals(result.primary.ratio > 7, true);
    assertEquals(result.primary.level, "AAA");
});

Deno.test("analyzeThemeContrast worstPair has lowest ratio", () => {
    const result = analyzeThemeContrast(testTheme);
    const allPairs = result.categories.flatMap((c) => c.pairs);
    const minRatio = Math.min(...allPairs.map((p) => p.ratio));
    assertEquals(result.worstPair.ratio, minRatio);
});

Deno.test("analyzeThemeContrast pass rates are consistent with pairs", () => {
    const result = analyzeThemeContrast(testTheme);
    const allPairs = result.categories.flatMap((c) => c.pairs);
    const total = allPairs.length;
    const aaCount = allPairs.filter((p) => p.level === "AA" || p.level === "AAA").length;
    const aaaCount = allPairs.filter((p) => p.level === "AAA").length;
    assertEquals(result.passRate.aa, aaCount / total);
    assertEquals(result.passRate.aaa, aaaCount / total);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `deno test --allow-all src/lib/contrast-analysis.test.ts`
Expected: FAIL — `analyzeThemeContrast` not exported

- [ ] **Step 3: Implement analyzeThemeContrast**

Add to `contrast-analysis.ts`:

```ts
import { wcagContrast } from "culori";
import { wcagGrade } from "./wcag.ts";
import type { ThemeDefinition } from "../types/theme.ts";

/**
 * Resolves a dot-path key (e.g. "fg.default") to a hex color from a theme.
 */
function resolveColor(theme: ThemeDefinition, key: string): string {
    const [group, token] = key.split(".");
    const colors = group === "fg" ? theme.ui.fg : theme.ui.bg;
    return (colors as Record<string, string>)[token];
}

/**
 * Computes a ContrastPair from a theme and a pairing definition.
 */
function computePair(theme: ThemeDefinition, def: PairingDef): ContrastPair {
    const fgColor = resolveColor(theme, def.fg);
    const bgColor = resolveColor(theme, def.bg);
    const ratio = wcagContrast(fgColor, bgColor);
    return {
        fg: { key: def.fg, color: fgColor },
        bg: { key: def.bg, color: bgColor },
        ratio,
        level: wcagGrade(ratio),
    };
}

/**
 * Analyzes a theme against all intended fg/bg pairings.
 * Returns pass rates, worst pair, and all pairs grouped by category.
 */
export function analyzeThemeContrast(theme: ThemeDefinition): ThemeContrastAnalysis {
    const categories: ContrastCategory[] = INTENDED_PAIRINGS.map((cat) => ({
        name: cat.name,
        pairs: cat.pairs.map((def) => computePair(theme, def)),
    }));

    const allPairs = categories.flatMap((c) => c.pairs);
    const total = allPairs.length;
    const aaCount = allPairs.filter((p) => p.level === "AA" || p.level === "AAA").length;
    const aaaCount = allPairs.filter((p) => p.level === "AAA").length;

    const primary = allPairs.find(
        (p) => p.fg.key === "fg.default" && p.bg.key === "bg.default",
    )!;

    const worstPair = allPairs.reduce((worst, p) =>
        p.ratio < worst.ratio ? p : worst
    );

    return {
        primary,
        categories,
        passRate: { aa: aaCount / total, aaa: aaaCount / total },
        worstPair,
    };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `deno test --allow-all src/lib/contrast-analysis.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 5: Run full test suite**

Run: `deno task test`
Expected: All 24+ tests pass

- [ ] **Step 6: Commit**

```bash
git add src/lib/contrast-analysis.ts src/lib/contrast-analysis.test.ts
git commit -m "feat(core): implement analyzeThemeContrast with all intended pairings [DEV-312]"
```

---

## Chunk 2: Monitor — Layout Redesign (AppLayout + Top Nav)

### Task 2.1: Install Base UI

**Files:**
- Modify: `monitor/deno.json`

- [ ] **Step 1: Add @base-ui/react to monitor dependencies**

Add to the `"imports"` section in `monitor/deno.json`:
```json
"@base-ui/react": "npm:@base-ui/react@^1.3.0"
```

- [ ] **Step 2: Install dependencies**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno install`
Expected: Dependencies installed successfully

- [ ] **Step 3: Verify import works**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno check src/main.tsx`
Expected: No errors (Base UI not imported yet, but available)

- [ ] **Step 4: Commit**

```bash
git add monitor/deno.json monitor/deno.lock
git commit -m "feat(monitor): add @base-ui/react dependency [DEV-312]"
```

### Task 2.2: Redesign AppLayout component

**Files:**
- Modify: `monitor/src/components/app-layout/index.tsx`
- Modify: `monitor/src/components/app-layout/index.module.css`

- [ ] **Step 1: Update AppLayout props and markup**

Replace the current layout with a new structure:
- `topBar` slot (replaces `leftNav`)
- `leftSidebar` slot (new — for analytics)
- `main` slot (unchanged)
- Remove `rightSidebar` and `bottomBar` slots

New `index.tsx`:
```tsx
import type { ReactNode } from "react";
import styles from "./index.module.css";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    topBar: ReactNode;
    leftSidebar?: ReactNode;
    main: ReactNode;
};

export function AppLayout({ topBar, leftSidebar, main, ...rest }: Props) {
    return (
        <div className={styles.root} data-layout="AppLayout" {...rest}>
            <header className={styles.topBar}>{topBar}</header>
            <div className={styles.body}>
                {leftSidebar && <aside className={styles.leftSidebar}>{leftSidebar}</aside>}
                <main className={styles.main}>{main}</main>
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Update AppLayout CSS**

New `index.module.css`:
```css
.root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background: var(--ba-ui-bg-default);
    color: var(--ba-ui-fg-default);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    font-size: 13px;
}

.topBar {
    flex-shrink: 0;
    background: var(--ba-ui-bg-panel);
    border-bottom: 1px solid var(--ba-ui-bg-float);
}

.body {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.leftSidebar {
    width: 240px;
    flex-shrink: 0;
    background: var(--ba-ui-bg-panel);
    border-right: 1px solid var(--ba-ui-bg-float);
    overflow-y: auto;
    scrollbar-width: none;
}

.leftSidebar::-webkit-scrollbar {
    display: none;
}

.main {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
    scrollbar-width: none;
}

.main::-webkit-scrollbar {
    display: none;
}
```

- [ ] **Step 3: Verify it compiles (will have type errors in __root.tsx — that's expected)**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno task check`
Expected: Type errors in `__root.tsx` because props changed — this is expected and will be fixed in Task 2.4.

- [ ] **Step 4: Commit**

```bash
git add monitor/src/components/app-layout/
git commit -m "feat(monitor): redesign AppLayout with topBar + leftSidebar slots [DEV-312]"
```

### Task 2.3: Create TopNav component with theme selector

**Files:**
- Create: `monitor/src/components/top-nav/index.tsx`
- Create: `monitor/src/components/top-nav/index.module.css`
- Create: `monitor/src/components/top-nav/theme-selector.tsx`
- Create: `monitor/src/components/top-nav/theme-selector.module.css`

- [ ] **Step 1: Create TopNav component**

`monitor/src/components/top-nav/index.tsx`:
```tsx
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
                                    onClick={(e) => {
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
```

- [ ] **Step 2: Create TopNav styles**

`monitor/src/components/top-nav/index.module.css`:
```css
.root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 16px;
    gap: 16px;
}

.left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.brand {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--ba-ui-fg-accent);
    white-space: nowrap;
}

.brandSub {
    color: var(--ba-ui-fg-subtle);
    font-weight: 400;
}

.nav {
    display: flex;
}

.navList {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2px;
}

.navLink {
    padding: 5px 10px;
    border-radius: 4px;
    color: var(--ba-ui-fg-subtle);
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
}

.navLink:hover {
    background: var(--ba-ui-bg-hover);
    color: var(--ba-ui-fg-default);
}

.navLink[data-active] {
    background: var(--ba-ui-bg-active);
    color: var(--ba-ui-fg-accent);
}

.right {
    display: flex;
    align-items: center;
    gap: 8px;
}
```

- [ ] **Step 3: Create ThemeSelector component**

`monitor/src/components/top-nav/theme-selector.tsx`:

This component uses Base UI `NavigationMenu` with a single trigger that opens a dropdown
panel. The panel shows themes grouped by collection with a text filter input.

```tsx
import { useState, useMemo } from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { groupByCollection } from "../../lib/theme-utils";
import type { ThemeDefinition, ThemeKey } from "@core/types/theme.ts";
import styles from "./theme-selector.module.css";

type Props = {
    themes: ThemeDefinition[];
    currentThemeKey: ThemeKey;
    currentThemeLabel: string;
    onSelect: (key: ThemeKey) => void;
};

export function ThemeSelector({ themes, currentThemeKey, currentThemeLabel, onSelect }: Props) {
    const [filter, setFilter] = useState("");

    const collections = useMemo(() => groupByCollection(themes), [themes]);

    const filtered = useMemo(() => {
        if (!filter) return collections;
        const lower = filter.toLowerCase();
        const result = new Map<string, ThemeDefinition[]>();
        for (const [key, items] of collections) {
            const matches = items.filter(
                (t) =>
                    t.meta.name.toLowerCase().includes(lower) ||
                    t.meta.collection.label.toLowerCase().includes(lower),
            );
            if (matches.length > 0) result.set(key, matches);
        }
        return result;
    }, [collections, filter]);

    return (
        <NavigationMenu.Root className={styles.root}>
            <NavigationMenu.List className={styles.list}>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className={styles.trigger}>
                        {currentThemeLabel || "Select theme"}
                        <NavigationMenu.Icon className={styles.icon}>
                            <ChevronIcon />
                        </NavigationMenu.Icon>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className={styles.content}>
                        <input
                            className={styles.filter}
                            type="text"
                            placeholder="Filter themes..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            autoFocus
                        />
                        <div className={styles.groups}>
                            {Array.from(filtered, ([collectionKey, items]) => (
                                <div key={collectionKey} className={styles.group}>
                                    <div className={styles.groupLabel}>{collectionKey}</div>
                                    {items.map((t) => (
                                        <NavigationMenu.Link
                                            key={t.meta.key}
                                            className={styles.themeItem}
                                            data-active={t.meta.key === currentThemeKey || undefined}
                                            closeOnClick
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onSelect(t.meta.key as ThemeKey);
                                                setFilter("");
                                            }}
                                            href="#"
                                        >
                                            <span>{t.meta.name}</span>
                                            <span className={styles.appearance}>
                                                {t.meta.appearance}
                                            </span>
                                        </NavigationMenu.Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Portal>
                <NavigationMenu.Positioner
                    className={styles.positioner}
                    sideOffset={6}
                    align="end"
                >
                    <NavigationMenu.Popup className={styles.popup}>
                        <NavigationMenu.Viewport />
                    </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
        </NavigationMenu.Root>
    );
}

function ChevronIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
        </svg>
    );
}
```

- [ ] **Step 4: Create ThemeSelector styles**

`monitor/src/components/top-nav/theme-selector.module.css`:
```css
.root {
    position: relative;
}

.list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    background: var(--ba-ui-bg-active);
    border: 1px solid var(--ba-ui-bg-float);
    border-radius: 4px;
    color: var(--ba-ui-fg-accent);
    font-size: 11px;
    cursor: pointer;
    white-space: nowrap;
}

.trigger:hover {
    background: var(--ba-ui-bg-hover);
}

.icon {
    display: flex;
    color: var(--ba-ui-fg-subtle);
    transition: transform 0.15s;
}

.trigger[data-popup-open] .icon {
    transform: rotate(180deg);
}

.positioner {
    z-index: 100;
}

.popup {
    background: var(--ba-ui-bg-panel);
    border: 1px solid var(--ba-ui-bg-float);
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    width: 240px;
    max-height: 400px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.content {
    display: flex;
    flex-direction: column;
    max-height: 400px;
}

.filter {
    padding: 8px 10px;
    background: var(--ba-ui-bg-default);
    border: none;
    border-bottom: 1px solid var(--ba-ui-bg-float);
    color: var(--ba-ui-fg-default);
    font-size: 11px;
    outline: none;
}

.filter::placeholder {
    color: var(--ba-ui-fg-subtle);
}

.groups {
    overflow-y: auto;
    padding: 4px 0;
    scrollbar-width: none;
}

.groups::-webkit-scrollbar {
    display: none;
}

.group {
    padding: 4px 0;
}

.groupLabel {
    padding: 4px 10px;
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--ba-ui-fg-subtle);
    text-transform: uppercase;
}

.themeItem {
    display: flex;
    justify-content: space-between;
    padding: 4px 10px 4px 14px;
    font-size: 11px;
    color: var(--ba-ui-fg-subtle);
    text-decoration: none;
    cursor: pointer;
}

.themeItem:hover {
    background: var(--ba-ui-bg-hover);
    color: var(--ba-ui-fg-default);
}

.themeItem[data-active] {
    color: var(--ba-ui-fg-accent);
    font-weight: 600;
}

.appearance {
    font-size: 9px;
    color: var(--ba-ui-fg-disabled);
}
```

- [ ] **Step 5: Commit**

```bash
git add monitor/src/components/top-nav/
git commit -m "feat(monitor): create TopNav with Base UI NavigationMenu and theme selector [DEV-312]"
```

### Task 2.4: Wire up new layout in __root.tsx

**Files:**
- Modify: `monitor/src/routes/__root.tsx`

- [ ] **Step 1: Update __root.tsx to use new AppLayout + TopNav**

Replace the current Component function. Key changes:
- Import `TopNav` instead of `NavItem`, `NavSection`, `NavSectionLabel`, `Logo`
- Remove `OrgStatsPartial`, `ThemeStatsPartial`, `CollectionLabel`, `ThemeListItem` imports
- Pass `topBar` and `main` to `AppLayout` (leftSidebar comes in Chunk 3)
- Move theme selection into TopNav callback

```tsx
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
import type { ThemeKey } from "@core/types/theme.ts";
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
    const matchRoute = useMatchRoute();
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
```

- [ ] **Step 2: Verify compilation**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno task check`
Expected: No type errors

- [ ] **Step 3: Visual check — open browser**

Navigate to `http://127.0.0.1:4170/` and `http://127.0.0.1:4170/preview/ui`
Verify:
- Top nav bar shows with brand, route links, theme selector
- Main content renders
- No bottom bar, no left nav, no right sidebar
- Theme selector dropdown opens and filters work
- Route links navigate correctly

- [ ] **Step 4: Commit**

```bash
git add monitor/src/routes/__root.tsx
git commit -m "feat(monitor): wire new AppLayout with TopNav in root route [DEV-312]"
```

### Task 2.5: Remove unused navigation components and stats bar partials

**Files:**
- Delete: `monitor/src/partials/stats-bar/org-stats.tsx`
- Delete: `monitor/src/partials/stats-bar/theme-stats.tsx`
- Delete: `monitor/src/components/nav-item/` (directory)
- Delete: `monitor/src/components/nav-section/` (directory)
- Delete: `monitor/src/components/nav-section-label/` (directory)
- Delete: `monitor/src/components/stats-bar-layout/` (directory)

- [ ] **Step 1: Verify no remaining imports of deleted components**

Search for imports of: `OrgStatsPartial`, `ThemeStatsPartial`, `NavItem`, `NavSection`,
`NavSectionLabel`, `StatsBarLayout` in `monitor/src/`. Should only find the files being
deleted.

- [ ] **Step 2: Delete the files**

```bash
rm -rf monitor/src/partials/stats-bar/org-stats.tsx
rm -rf monitor/src/partials/stats-bar/theme-stats.tsx
rm -rf monitor/src/components/nav-item
rm -rf monitor/src/components/nav-section
rm -rf monitor/src/components/nav-section-label
rm -rf monitor/src/components/stats-bar-layout
```

Also check if the `stats-bar/` partials directory has any other files. If only `org-stats`
and `theme-stats` lived there, delete the directory too. Keep the `partials/` directory if
other partials exist.

- [ ] **Step 3: Verify compilation**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno task checks`
Expected: All checks pass

- [ ] **Step 4: Commit**

```bash
git add -A monitor/src/partials/stats-bar/ monitor/src/components/nav-item \
    monitor/src/components/nav-section monitor/src/components/nav-section-label
git commit -m "refactor(monitor): remove unused nav components and stats bar partials [DEV-312]"
```

---

## Chunk 3: Monitor — Analytics Sidebar

### Task 3.1: Create analytics sidebar components

**Files:**
- Create: `monitor/src/components/analytics-sidebar/contrast-pair-row.tsx`
- Create: `monitor/src/components/analytics-sidebar/contrast-category.tsx`
- Create: `monitor/src/components/analytics-sidebar/pass-rate-summary.tsx`
- Create: `monitor/src/components/analytics-sidebar/worst-pair-card.tsx`
- Create: `monitor/src/components/analytics-sidebar/index.tsx`
- Create: `monitor/src/components/analytics-sidebar/index.module.css`

- [ ] **Step 1: Create ContrastPairRow**

A single row showing `fg.key / bg.key` with ratio and grade, color-coded.

```tsx
import type { ContrastPair } from "@core/lib/contrast-analysis.ts";
import styles from "./index.module.css";

type Props = { pair: ContrastPair };

export function ContrastPairRow({ pair }: Props) {
    return (
        <div className={styles.pairRow} data-grade={pair.level}>
            <span className={styles.pairKeys}>
                {pair.fg.key} / {pair.bg.key}
            </span>
            <span className={styles.pairResult}>
                {pair.ratio.toFixed(1)} {pair.level}
            </span>
        </div>
    );
}
```

- [ ] **Step 2: Create ContrastCategory**

```tsx
import type { ContrastCategory as ContrastCategoryType } from "@core/lib/contrast-analysis.ts";
import { ContrastPairRow } from "./contrast-pair-row";
import styles from "./index.module.css";

type Props = { category: ContrastCategoryType };

export function ContrastCategory({ category }: Props) {
    return (
        <div className={styles.category}>
            <div className={styles.categoryLabel}>{category.name}</div>
            {category.pairs.map((pair) => (
                <ContrastPairRow key={`${pair.fg.key}-${pair.bg.key}`} pair={pair} />
            ))}
        </div>
    );
}
```

- [ ] **Step 3: Create PassRateSummary**

```tsx
import styles from "./index.module.css";

type Props = { aa: number; aaa: number };

export function PassRateSummary({ aa, aaa }: Props) {
    return (
        <div className={styles.summary}>
            <div className={styles.summaryLabel}>CONTRAST HEALTH</div>
            <div className={styles.summaryRow}>
                <span className={styles.summaryValue}>{Math.round(aa * 100)}%</span>
                <span className={styles.summaryDetail}>AA pass rate</span>
            </div>
            <div className={styles.summaryRow}>
                <span className={styles.summaryValueSecondary}>{Math.round(aaa * 100)}%</span>
                <span className={styles.summaryDetail}>AAA pass rate</span>
            </div>
        </div>
    );
}
```

- [ ] **Step 4: Create WorstPairCard**

```tsx
import type { ContrastPair } from "@core/lib/contrast-analysis.ts";
import styles from "./index.module.css";

type Props = { pair: ContrastPair };

export function WorstPairCard({ pair }: Props) {
    return (
        <div className={styles.worstPair}>
            <div className={styles.worstPairLabel}>WORST PAIR</div>
            <div className={styles.worstPairKeys}>
                {pair.fg.key} / {pair.bg.key}
            </div>
            <div className={styles.worstPairResult}>
                <span>{pair.ratio.toFixed(2)}:1</span>
                <span className={styles.worstPairBadge} data-grade={pair.level}>
                    {pair.level.toUpperCase()}
                </span>
            </div>
        </div>
    );
}
```

- [ ] **Step 5: Create AnalyticsSidebar (compose all sub-components)**

```tsx
import type { ThemeContrastAnalysis } from "@core/lib/contrast-analysis.ts";
import { PassRateSummary } from "./pass-rate-summary";
import { WorstPairCard } from "./worst-pair-card";
import { ContrastCategory } from "./contrast-category";
import styles from "./index.module.css";

type Props = { analysis: ThemeContrastAnalysis };

export function AnalyticsSidebar({ analysis }: Props) {
    return (
        <div className={styles.root}>
            <PassRateSummary aa={analysis.passRate.aa} aaa={analysis.passRate.aaa} />
            <WorstPairCard pair={analysis.worstPair} />
            <div className={styles.divider} />
            {analysis.categories.map((cat) => (
                <ContrastCategory key={cat.name} category={cat} />
            ))}
        </div>
    );
}
```

- [ ] **Step 6: Create analytics sidebar styles**

`monitor/src/components/analytics-sidebar/index.module.css`:
```css
.root {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
}

/* Summary */
.summary {}

.summaryLabel {
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--ba-ui-fg-subtle);
    margin-bottom: 6px;
}

.summaryRow {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.summaryValue {
    font-size: 20px;
    font-weight: 700;
    color: var(--ba-ui-fg-positive);
}

.summaryValueSecondary {
    font-size: 14px;
    font-weight: 700;
    color: var(--ba-ui-fg-positive);
    opacity: 0.7;
}

.summaryDetail {
    font-size: 10px;
    color: var(--ba-ui-fg-subtle);
}

/* Worst pair callout */
.worstPair {
    padding: 8px;
    background: var(--ba-ui-bg-negative);
    border: 1px solid color-mix(in oklch, var(--ba-ui-fg-negative) 20%, transparent);
    border-radius: 4px;
}

.worstPairLabel {
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--ba-ui-fg-subtle);
    margin-bottom: 4px;
}

.worstPairKeys {
    font-size: 10px;
    font-weight: 600;
    color: var(--ba-ui-fg-negative);
}

.worstPairResult {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
    font-size: 10px;
    color: var(--ba-ui-fg-negative);
}

.worstPairBadge {
    font-size: 8px;
    padding: 1px 4px;
    border-radius: 2px;
    background: var(--ba-ui-bg-default);
}

.worstPairBadge[data-grade="fail"] { color: var(--ba-ui-fg-negative); }
.worstPairBadge[data-grade="AA"] { color: var(--ba-ui-fg-warn); }
.worstPairBadge[data-grade="AAA"] { color: var(--ba-ui-fg-positive); }

/* Divider */
.divider {
    height: 1px;
    background: var(--ba-ui-bg-float);
}

/* Category */
.category {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.categoryLabel {
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--ba-ui-fg-subtle);
    margin-bottom: 2px;
    text-transform: uppercase;
}

/* Pair row */
.pairRow {
    display: flex;
    justify-content: space-between;
    padding: 2px 0;
    font-size: 10px;
}

.pairKeys {
    color: var(--ba-ui-fg-subtle);
}

.pairResult {
    font-weight: 500;
}

.pairRow[data-grade="AAA"] .pairResult { color: var(--ba-ui-fg-positive); }
.pairRow[data-grade="AA"] .pairResult { color: var(--ba-ui-fg-warn); }
.pairRow[data-grade="fail"] .pairResult { color: var(--ba-ui-fg-negative); }
```

- [ ] **Step 7: Commit**

```bash
git add monitor/src/components/analytics-sidebar/
git commit -m "feat(monitor): create analytics sidebar components [DEV-312]"
```

### Task 3.2: Wire analytics sidebar into root route

**Files:**
- Modify: `monitor/src/routes/__root.tsx`

- [ ] **Step 1: Add analytics sidebar to preview pages**

Import `AnalyticsSidebar` and `analyzeThemeContrast`. Pass `leftSidebar` to `AppLayout`
when on a preview page:

Add imports:
```tsx
import { analyzeThemeContrast } from "@core/lib/contrast-analysis.ts";
import { AnalyticsSidebar } from "../components/analytics-sidebar";
```

Add before the return:
```tsx
const isPreviewPage = !!matchRoute({ to: "/preview/ui" }) ||
    !!matchRoute({ to: "/preview/code" });

const contrastAnalysis = theme ? analyzeThemeContrast(theme) : null;
```

Update the `AppLayout` to pass `leftSidebar`:
```tsx
<AppLayout
    style={cssVars}
    topBar={...}
    leftSidebar={isPreviewPage && contrastAnalysis
        ? <AnalyticsSidebar analysis={contrastAnalysis} />
        : undefined}
    main={<Outlet />}
/>
```

- [ ] **Step 2: Verify compilation**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno task check`
Expected: No type errors

- [ ] **Step 3: Visual check**

Navigate to `http://127.0.0.1:4170/preview/ui?themeKey=black-atom-jpn-tsuki-yoru`
Verify:
- Analytics sidebar visible on left with pass rates, worst pair, all categories
- Sidebar scrolls independently from main content
- Dashboard page (`/`) does NOT show the sidebar
- Theme selector changes update the analytics immediately

- [ ] **Step 4: Run full monitor checks**

Run: `cd /Users/nbr/repos/black-atom-industries/core/monitor && deno task checks`
Expected: All checks pass

- [ ] **Step 5: Commit**

```bash
git add monitor/src/routes/__root.tsx
git commit -m "feat(monitor): wire analytics sidebar into preview pages [DEV-312]"
```

---

## Chunk 4: Cleanup & Dashboard

### Task 4.1: Update dashboard page

**Files:**
- Modify: `monitor/src/routes/index.tsx`

- [ ] **Step 1: Check if dashboard imports any removed components**

Read `monitor/src/routes/index.tsx` and verify it doesn't import `OrgStatsPartial` or
any removed component. If it does, remove those imports. The bottom bar was already
removed from AppLayout, so no stats-bar rendering should remain.

- [ ] **Step 2: Verify the full app works end-to-end**

Run: `cd /Users/nbr/repos/black-atom-industries/core && deno task checks`
Expected: All core and monitor checks pass

- [ ] **Step 3: Visual walkthrough**

Check all routes in browser:
- `http://127.0.0.1:4170/` — Dashboard: theme cards, no sidebar, no bottom bar
- `http://127.0.0.1:4170/preview/ui` — UI preview with analytics sidebar
- `http://127.0.0.1:4170/preview/code` — Syntax preview with analytics sidebar
- Top nav works on all pages: route links, theme selector with filter

- [ ] **Step 4: Take screenshots of the final state**

Save to `docs/superpowers/specs/dev-312/`:
- `final-dashboard.png`
- `final-preview-ui.png`

- [ ] **Step 5: Commit if any cleanup was needed**

```bash
git add -A
git commit -m "refactor(monitor): clean up dashboard after layout redesign [DEV-312]"
```

### Task 4.2: Clean up unused imports and dead code

- [ ] **Step 1: Search for any remaining references to removed components**

Search `monitor/src/` for: `StatsBarLayout`, `Logo` (if only used in old nav),
`CollectionLabel` (if only used in old right sidebar), `ThemeListItem` (if only used
in old right sidebar).

- [ ] **Step 2: Delete any components that are no longer imported anywhere**

Check each component directory — if nothing imports it, delete it.

- [ ] **Step 3: Verify**

Run: `cd /Users/nbr/repos/black-atom-industries/core && deno task checks`
Expected: All checks pass

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor(monitor): remove dead code after layout redesign [DEV-312]"
```
