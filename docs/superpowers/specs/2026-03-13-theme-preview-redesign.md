# Theme Preview App Redesign

**Date**: 2026-03-13
**Issue**: DEV-302
**Branch**: feature/dev-302-theme-preview-react-app

## Goal

Redesign the theme preview React app with a better layout, richer UI tab content, and a clean component structure following the dumb/smart/partial pattern.

---

## Layout

Three-column shell:

```
┌──────────────┬──────────────────────────┬──────────────┐
│  Left Nav    │     Main Content         │ Theme        │
│  (labeled)   │                          │ Selector     │
│              │  [active route view]     │ (right)      │
│  Previews    │                          │              │
│  ├ UI        │                          │ DEFAULT      │
│  └ Code      │                          │   Dark       │
│              │                          │   Light      │
│              │                          │ JPN          │
│              │                          │   Koyo Yoru  │
└──────────────┴──────────────────────────┴──────────────┘
```

- **Left sidebar**: labeled nav with icon + text entries, grouped by section. Width ~180px. Currently one section: "Previews" with "UI" and "Code" sub-items.
- **Main content**: scrollable, fills remaining space.
- **Right sidebar**: flat grouped theme list. Collection names as uppercase section headers. Theme items show name + appearance badge (dark/light). Width ~200px. Sticky/fixed, independently scrollable.
- **Mobile** (< 768px): sidebars collapse. Single scrollable column: nav at top (horizontal) → content → theme selector at bottom or in a drawer.

---

## Routes / Navigation

State-based routing (no router library — the app is a dev tool, bookmarking not required).

| Route key | Component | Status |
|-----------|-----------|--------|
| `ui` | `UiPreviewContainer` | Implemented |
| `code` | `CodePreviewContainer` | Placeholder — renders "Coming soon" |

Active route stored in top-level app state, defaults to `ui`. Selected theme key stored alongside it, defaults to the first theme returned by `useThemeList`.

---

## Right Sidebar: Theme Selector

Flat list, always expanded, grouped by collection:

```
DEFAULT
  Dark          [dark]
  Dark Dimmed   [dark]
  Light         [light]
  Light Dimmed  [light]
JPN
  Koyo Yoru     [dark]
  ...
```

- Active theme highlighted with accent left border + background tint.
- Appearance badges (dark/light) as small inline pills with fixed neutral styles (not theme-aware): dark badge `#1a1a1a` bg / `#888` text; light badge `#e8e8e8` bg / `#666` text.
- SSE reload triggers query invalidation (existing behavior, keep as-is).

---

## UI Preview Tab

Scrollable page with three sections stacked vertically. On desktop, sections 2 (Stats) and 3 (UI Examples) are arranged in a two-column row rather than fully stacked — see section 3 for details.

### 1. Color Tokens

Compact swatch grid, grouped:

- **Primaries** — d10–d40, m10–m40, l10–l40 in three sub-columns (dark / mid / light ranges)
- **Palette** — all named palette colors in a single row
- **UI Backgrounds** — bg tokens
- **UI Foregrounds** — fg tokens

Each swatch: color square + token name label + hex value on hover (tooltip or revealed on hover). Token name always visible below, hex on hover only.

### 2. Stats

Three stat cards. On desktop they form a vertical column (left of UI examples). On mobile they render as a horizontal row above the examples.

| Card | Content |
|------|---------|
| Contrast (fg/bg) | Ratio + WCAG grade (AA / AAA / fail) |
| Hue spread | Mini color strip of palette hues |
| Lightness range | Gradient bar from darkest to lightest primary |

WCAG contrast calculated from `ui.fg.default` over `ui.bg.default`.

### 3. UI Examples

Scrollable set of realistic UI mockups rendered with the selected theme's CSS variables.

**Desktop**: Stats (section 2) and UI Examples sit side-by-side — stats as a ~220px left column, examples filling the remaining width.
**Mobile** (< 768px): Stats render as a horizontal row of cards (still side-by-side within the row) above the examples. Single outer column — no two-column grid.

Mockups to implement:

1. **Text content** — heading hierarchy (h1–h3), body text, inline code, blockquote. Uses `--ba-fg`, `--ba-bg`, accent for links.
2. **App chrome** — mock sidebar + main panel layout. Uses `--ba-panel` (sidebar bg), `--ba-bg` (main area bg), `--ba-border` (divider).
3. **Form elements** — input, button (primary + secondary), disabled state. Uses accent, disabled, border tokens.
4. **Notification / badge row** — success, warning, error, info states. Receives `{ success, warning, error, info }` color strings as props (sourced from `theme.palette.green`, `.yellow`, `.red`, `.blue` by `UiPreviewContainer`).

Mockups 1–3 read CSS variables directly. Mockup 4 receives palette colors as props since they are not exposed as CSS vars.

---

## Code Preview Tab

Placeholder route. Renders a centered "Coming soon" message. No logic.

---

## Component Architecture

Following the dumb/smart/partial pattern:
- **Dumb component**: pure presentational, styled, no data fetching, no side effects.
- **Smart container**: fetches data via hooks, owns state, passes data down — no styling beyond layout utils.
- **Partial**: a reusable composition of dumb components with light display logic (e.g. deriving a WCAG label from a ratio). May contain derived state but does not fetch.

Folder structure under `preview/src/`:

```
src/
├── components/          # Dumb components
│   ├── color-swatch/
│   ├── stat-card/
│   ├── theme-list-item/
│   ├── nav-item/
│   └── appearance-badge/
├── containers/          # Smart containers (data fetching, state)
│   ├── app/             # Root shell: layout, active route, selected theme state
│   ├── ui-preview/      # Fetches theme, renders UI tab sections
│   │   └── use-ui-preview.ts  # Co-located hook (container-specific, not shared)
│   └── code-preview/    # Placeholder
├── partials/            # Composed units
│   ├── color-token-group/   # Label + swatch row for one token group
│   ├── stats-row/           # Three stat cards in a row
│   ├── ui-example-text/     # Text content mockup
│   ├── ui-example-chrome/   # App chrome mockup
│   ├── ui-example-form/     # Form elements mockup
│   └── ui-example-badges/   # Notification/badge row
├── hooks/
│   ├── use-theme-list.ts    # (existing, keep)
│   ├── use-theme.ts         # (existing, keep)
│   └── use-server-reload-listener.ts # extracted from current api.ts into its own file, hook name unchanged
├── lib/
│   └── contrast.ts          # WCAG contrast ratio calculation
├── types/
│   └── index.ts             # ThemeDefinition, ThemeMeta (existing, keep)
└── main.tsx
```

### Key boundaries

- `AppContainer` owns: active route state, selected theme key, layout shell rendering.
- `UiPreviewContainer` owns: fetching the full theme by key, passing data down to partials/components.
- Partials compose dumb components and may contain light display logic (e.g. computing WCAG label from ratio).
- No component reads from the API directly — only containers and hooks do.
- CSS variables for theme colors are injected at the `AppContainer` level (existing behavior, keep).

---

## Styling

CSS Modules throughout (existing convention, keep). Layout via flexbox. Theme colors via CSS custom properties (`--ba-*`). No hardcoded color values in components — everything through CSS vars or props.

**Exception**: appearance badges use fixed neutral colors (`#1a1a1a`/`#888` for dark, `#e8e8e8`/`#666` for light) because they are intentionally theme-agnostic meta-labels.

### CSS Variable Reference

These vars are injected at the app root from the selected theme (existing behavior):

| Variable | Usage |
|----------|-------|
| `--ba-bg` | Main background |
| `--ba-fg` | Default foreground / text |
| `--ba-panel` | Sidebar / panel background |
| `--ba-subtle` | Subtle / muted text |
| `--ba-accent` | Accent color |
| `--ba-disabled` | Disabled state color |
| `--ba-border` | Border / divider color |

Responsive breakpoint: `768px`.

---

## What to Keep from Current Code

- `api.ts` hooks: `useThemeList`, `useTheme`, `useServerReloadListener` — extract each to its own file in `hooks/`, logic unchanged.
- `types/` — keep ThemeDefinition, ThemeMeta shapes.
- Vite config, proxy setup, deno.json — keep unchanged.
- SSE hot-reload plumbing — keep unchanged.

## What to Replace

- `App.tsx` → replaced by `containers/app/`
- `components/ThemeSelector.tsx` → replaced by `containers/app/` (right sidebar) + `components/theme-list-item/`
- `components/ColorSwatch.tsx` → replaced by `components/color-swatch/`
- `tabs/UiPreview.tsx` → replaced by `containers/ui-preview/` + partials
- `tabs/CodePreview.tsx` → replaced by `containers/code-preview/` (placeholder)

---

## Out of Scope

- Code Preview implementation (DEV-302 follow-up)
- Routing library / URL state
- Storybook / tests
- Server-side changes
