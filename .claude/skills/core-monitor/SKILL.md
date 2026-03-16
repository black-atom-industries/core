---
name: core:monitor
description: Monitor app conventions — routing, queries, components, core/monitor boundary. Load when working in monitor/.
user-invocable: false
---

# Monitor App Conventions

## Core / Monitor Boundary

Core (`src/`) owns data and computation. Monitor (`monitor/`) owns display.

- `ThemeDefinition` is the single source of truth type — never create subsets like `ThemeSummary`
- Color analytics (`culori`, WCAG contrast, stats) live in core at `src/lib/`
- Monitor imports computation via `@core/lib/stats.ts`, `@core/lib/wcag.ts`
- Monitor does NOT import `culori` directly

## File-Based Routing (TanStack Router)

Routes live in `monitor/src/routes/`. Route components are defined inline:

```tsx
export const Route = createFileRoute("/preview/ui")({
    component: Component,
});

function Component() {
    // data fetching, orchestration, rendering
}
```

- No `containers/` directory — routes ARE the containers
- `__root.tsx` is the app shell layout with nav, sidebar, and stats bar
- Search params defined with Zod schema inline in `__root.tsx`

## Queries

Located in `monitor/src/queries/` (not `hooks/`).

- Use `apiClient` from `monitor/src/lib/api-client.ts`
- Topic-based keys: `["themes", "all"]`, `["themes", "detail", key]`
- `Omit<UseQueryOptions, "queryKey" | "queryFn">` for options passthrough
- API returns full `ThemeDefinition`

## Component Architecture

Four roles (see `dev:react` skill):

- **Dumb components** (`components/`) — styling via CSS Modules, `data-component` attribute
- **Partials** (`partials/`) — compose components, zero styling
- **Layout components** — `*Layout` suffix (`AppLayout`, `StatsBarLayout`)
- Routes orchestrate everything — no standalone smart containers

## CSS Variable Scoping

`themeToCssVars(theme)` in `monitor/src/lib/theme-css-vars.ts` programmatically converts any `ThemeDefinition` into CSS custom properties (`--ba-primaries-d10`, `--ba-ui-bg-default`, `--ba-syntax-keyword-default`, etc.).

Used in two scopes:

- **App shell** (`__root.tsx`) — global theme for the monitor UI itself
- **ThemePreviewCard** — per-card scope so each card displays in its own theme's colors

## Utilities

Reusable transformations in tested lib files:

- `groupByCollection(themes)` → `Map<ThemeCollectionKey, ThemeDefinition[]>`
- `themeToCssVars(theme)` → `Record<string, string>` of CSS custom properties

Both have unit tests in `monitor/src/lib/`.
