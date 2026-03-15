# Monitor: Theme Overview & Collection Dashboard

**Issue:** [DEV-311](https://linear.app/black-atom-industries/issue/DEV-311)
**Date:** 2026-03-14

## Context

The monitor app currently redirects `/` to `/preview/ui`. There's no landing page that shows the full theme ecosystem at a glance. As the number of themes grows (currently 29 across 5 collections), we need a dashboard that serves as both a navigation hub and a quality overview — surfacing contrast consistency, theme counts, and color identity across all collections.

## Design

### App Layout Changes

**StatsBar** — a new persistent container at the bottom of the app shell, like an IDE status bar. Renders on every page but scopes its content to the current route context. Uses a container/partial pattern: the container determines what to show based on location, partials render the actual stat groups.

- **Dashboard (`/`)** — org-wide: theme count, collection count, dark/light split, avg contrast
- **Preview pages (`/preview/*`)** — theme-scoped: contrast ratio, WCAG level, hue spread visualization, lightness range, collection name
- **Future: collection view** — collection-scoped stats

The StatsBar container reads the current route to decide which partials to render. Each partial is a focused stat group (e.g., `OrgStatsPartial`, `ThemeContrastPartial`). The container orchestrates, the partials display.

**Navigation hierarchy change:**

```
◉ Dashboard          ← top-level, the landing page
Preview              ← section label
  ◈ UI               ← nested under Preview
  ◇ Syntax           ← nested under Preview
```

Dashboard is NOT a preview sub-item. It's the primary entry point.

**Right sidebar** — only visible on preview pages (where theme selection matters). The dashboard is full-width since the ThemePreviewCards themselves serve as navigation.

### ThemePreviewCard

A new dumb component. Fixed width, portrait aspect ratio. Anatomy:

1. **Color grid** (top) — brutalist 7-column grid, no gaps between swatches. All swatches are uniform size. Shows 28 colors total:
   - Row 1-2: 12 primaries (d10-d40, m10-m40, l10-l40) flowing left-to-right, top-to-bottom
   - Row 3-4: 16 palette colors (black, gray, red, darkRed, yellow, darkYellow, green, darkGreen, cyan, darkCyan, blue, darkBlue, magenta, darkMagenta, lightGray, white)
2. **Meta footer** (bottom) — theme name, contrast ratio, appearance badge (dark/light)

Clicking a card navigates to `/preview/ui?theme=<key>` where `<key>` is the `ThemeKey` string (e.g., `black-atom-default-dark`) — same format used by the existing theme selector in the right sidebar.

Cards are laid out with `display: flex; flex-wrap: wrap; gap: 12px` — they wrap naturally based on available width. No grid columns forcing a specific count per row.

### Dashboard Page (`/`)

Top-to-bottom:

1. **StatsBar** (persistent, org-wide stats)
2. **Collection sections** — each collection is a section with:
   - Uppercase label with inline summary (e.g., `DEFAULT · 4 themes · 2 dark, 2 light · avg 12.9:1`)
   - ThemePreviewCards in a wrapping flex layout
3. Collections ordered: default → jpn → terra → stations → mnml (matching existing order)

### Stats Library

A dedicated module of pure functions for computing theme metrics. Lives at `monitor/src/lib/stats.ts` (or `stats/` directory if it grows). Consumed by the StatsBar and potentially by future analysis pages (DEV-312).

**Initial scope:**

- `contrastRatio(fg: string, bg: string): number` — WCAG contrast ratio between two colors
- `themeContrast(theme): { ratio: number; level: "AAA" | "AA" | "Fail" }` — contrast between `ui.fg.default` and `ui.bg.default`
- `collectionStats(themes): CollectionStats` — avg contrast, dark/light counts
- `orgStats(collections): OrgStats` — aggregate across all themes

**Future extensions (not in scope for DEV-311):**

- Consistency scoring algorithm
- Derived categories (high contrast, muted, warm, cool)
- Per-token contrast analysis
- Cross-collection comparison metrics

### API Changes

The current `/api/themes` endpoint returns `ThemeMeta[]` grouped by collection (no color data). The dashboard needs color data for the grid.

New endpoint: **`GET /api/themes/overview`** — returns primaries + palette per theme, grouped by collection. No UI/syntax tokens (lighter than full ThemeDefinition).

```ts
interface ThemeOverview {
    meta: ThemeMeta;
    primaries: ThemePrimaryColors;
    palette: ThemePaletteColors;
    contrast: { ratio: number; level: "AAA" | "AA" | "Fail" };
}

interface OverviewResponse {
    collections: Array<{
        collection: ThemeCollectionKey;
        themes: ThemeOverview[];
    }>;
}
```

### Component Structure

```
monitor/src/
├── components/
│   ├── stats-bar-layout/       ← new: bottom bar layout component (dumb)
│   ├── theme-preview-card/     ← new: color grid + meta card (dumb)
│   └── app-layout/             ← modified: add bottom stats bar slot
├── containers/
│   ├── dashboard.tsx           ← new: dashboard page container
│   └── stats-bar.tsx           ← new: route-aware stats container
├── partials/
│   └── stats-bar/
│       ├── org-stats.tsx       ← new: org-wide stats (dashboard)
│       └── theme-stats.tsx     ← new: theme-scoped stats (preview)
├── lib/
│   ├── stats.ts                ← new: stats computation library
│   └── stats.test.ts           ← new: unit tests for stats functions
└── router.ts                   ← modified: add dashboard route, update nav
```

### Route Changes

- `/` renders `DashboardContainer` (no longer redirects to `/preview/ui`)
- `/preview/ui` and `/preview/code` unchanged (note: `/preview/code` will become `/preview/syntax` per DEV-309)
- Nav updates: Dashboard as top-level item, Preview as section label

## Out of Scope

- Collection detail pages (future route)
- Contrast & readability analysis page (DEV-312)
- Derived theme categories
- Theme editing or creation
- Responsive/mobile layout
