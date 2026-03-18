# Black Atom Monitor

React 19 + Vite app for previewing and analyzing Black Atom themes. Display layer only — all computation lives in core.

## Routing

- TanStack Router with **file-based routing** (`src/routes/`)
- Route components defined **inline** — no separate container files
- `__root.tsx` is the app shell layout (nav, sidebar, stats bar)
- Search params: `themeKey` (typed as `ThemeKey`, defaults to `DEFAULT_THEME_KEY`)

## Data

- Queries in `src/queries/` — topic-based keys, `apiClient` from `src/lib/api-client.ts`
- `useThemes()` → `ThemeDefinition[]`, `useTheme(key)` → `ThemeDefinition`
- API: `GET /api/themes` (all), `GET /api/themes/:key` (single). Both return full `ThemeDefinition`.
- Stats/contrast functions imported from `@core/lib/stats.ts` and `@core/lib/wcag.ts`

## Components

- **Dumb components** have styling (CSS Modules). **Partials** compose components, no styling.
- Layout components use `*Layout` suffix (`AppLayout`, `StatsBarLayout`, `DashboardPageLayout`)
- No `containers/` directory — routes are the orchestrators
- `themeToCssVars(theme)` creates a CSS custom property scope from any `ThemeDefinition`
- Utilities like `groupByCollection()` live in tested lib files (`src/lib/`), not inline

## Styling

- **CSS Modules** for all component styling — no inline styles except in snippet partials (`var(--ba-syntax-*)`)
- **OpenProps** for design tokens — use `var(--size-*)`, `var(--font-size-*)`, `var(--radius-*)`, `var(--border-size-*)`, `var(--font-weight-*)`, `var(--font-letterspacing-*)` instead of magic numbers
- Theme colors via `var(--ba-ui-*)` and `var(--ba-syntax-*)` custom properties (synced by `themeToCssVars()`)
- No new magic px values in CSS — always use the closest OpenProps token

## Conventions

- Import core types via `@core/` alias — never duplicate or subset `ThemeDefinition`
- `culori` is a core dependency. Monitor does not import it directly.
- Use `@core/lib/stats.ts` for contrast/WCAG calculations
