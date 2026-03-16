# DEV-312: Contrast & Readability Analysis — Design Spec

## Summary

Comprehensive contrast analysis for every theme, computing WCAG contrast ratios for all intended foreground/background pairings. Replaces the current single-pair `themeContrast()` as the primary quality metric. Includes a monitor layout redesign to surface analytics alongside theme previews.

## Scope

- Core: contrast analysis module with intended pairings config
- Monitor: layout redesign (top nav, analytics sidebar) for single-theme inspection
- **Out of scope**: dashboard/overview analytics, inline UI indicators on preview examples, syntax token contrast pairings (deferred until Syntax preview route is built), CLI integration (DEV-313)

## Layout Redesign

### Before

- Left sidebar: navigation (Dashboard, UI, Syntax)
- Main content: color swatches, text preview, app chrome
- Right sidebar: theme selector list
- Bottom bar: stats (contrast ratio, WCAG grade, hue spread, lightness range, collection)

### After

- **Top bar**: Base UI `NavigationMenu` — brand, route links, theme selector (grouped by collection, with filter)
- **Left sidebar**: persistent analytics panel (contrast analysis)
- **Main content**: color swatches, text preview, app chrome
- **Bottom bar**: removed
- **Right sidebar**: removed

Reference mockups in `docs/superpowers/specs/dev-312/`:

- `current-dashboard.png` — current dashboard layout
- `current-preview-ui.png` — current preview page layout
- `mockup-final-layout.png` — approved layout with top nav + analytics sidebar
- `nbr-haus-reference.png` — nbr.haus floating nav pattern (design inspiration, not used directly)

## Core: Contrast Analysis (`src/lib/contrast-analysis.ts`)

### Intended Pairings Config

A global config defining which fg/bg combinations actually occur in real UI. Lives in core alongside the types since the token structure is identical across all collections.

Categories:

- **Content on surfaces** — every `fg.*` on `bg.default`, `bg.panel`, `bg.float`
- **Interactive states** — `fg.default` on `bg.active`, `bg.hover`, `bg.selection`, `bg.search`
- **Feedback** — `fg.negative` on `bg.negative`, `fg.warn` on `bg.warn`, `fg.positive` on `bg.positive`, `fg.info` on `bg.info` + all feedback fg on `bg.default` (inline usage)
- **Diff** — `fg.add` on `bg.add`, `fg.delete` on `bg.delete`, `fg.modify` on `bg.modify`
- **Contrast inversion** — `fg.contrast` on `bg.contrast`

Nonsensical combinations (e.g. `fg.positive` on `bg.negative`) are excluded by design.

The pairings config is exported so adapters/tools can reference it.

### Output Types

```ts
interface ContrastPair {
    fg: { key: string; color: string };
    bg: { key: string; color: string };
    ratio: number;
    level: WcagGrade;
}

interface ContrastCategory {
    name: string;
    pairs: ContrastPair[];
}

interface ThemeContrastAnalysis {
    primary: ContrastPair; // fg.default / bg.default
    categories: ContrastCategory[];
    passRate: { aa: number; aaa: number }; // 0-1
    worstPair: ContrastPair;
}
```

Uses `culori` (existing core dependency) via `wcagContrast`.

### Dependencies

- `src/lib/wcag.ts` — existing WCAG thresholds and grading (`wcagGrade()`)
- `src/types/theme.ts` — UI token type structure
- `culori` — contrast computation

## Monitor: Top Navigation

### Component

Base UI `NavigationMenu` (`@base-ui/react`) — new dependency.

### Structure

- **Left**: Brand ("BLACK ATOM MONITOR") + route links (Dashboard, UI Preview, Syntax)
- **Right**: Theme selector dropdown — grouped by collection, with text filter/search
- Active route highlighted
- Theme selector shows current theme name + collection

### Behavior

- Route links navigate directly (no dropdown content needed for simple links)
- Theme selector opens a dropdown panel with collection groups and filter input
- Selecting a theme updates the preview and closes the dropdown

## Monitor: Analytics Sidebar

### Placement

Left side of the preview pages (`/preview/ui`, `/preview/syntax`). Persistent — always visible alongside main content. Not shown on dashboard.

### Content (top to bottom)

1. **Summary**: AA pass rate (large), AAA pass rate (secondary)
2. **Worst pair callout**: highlighted card with fg/bg key names, ratio, and FAIL badge
3. **Contrast pairs by category**: each category has a label and list of pairs showing `fg.key / bg.key` and `ratio + grade`, color-coded (green = AAA, yellow = AA, red = fail)

Categories rendered in order:

- Content on surfaces
- Interactive states
- Feedback
- Diff
- Contrast inversion

### Layout

- Fixed width: ~240px
- No responsive collapse — this is a dev tool, not consumer-facing
- Sidebar and main content scroll independently

### Pairings Completeness

The exact pairings list per category will be finalized during implementation by auditing actual UI token usage across themes. The categories above define the structure; individual pairs within each category may be adjusted.

## Dashboard Changes

- Bottom stats bar removed
- No other dashboard changes in this ticket

## API / Data Flow

No API changes needed. The existing `GET /api/themes/:key` already returns the full `ThemeDefinition` including all UI token colors. Contrast analysis is computed client-side via `analyzeThemeContrast(theme)` — this keeps the computation in core's library code (reusable by CLI in DEV-313) without coupling it to the server response.

Note: `WcagGrade` values are uppercase `"AAA"`, `"AA"`, lowercase `"fail"` as defined in `src/lib/wcag.ts`. Display formatting (badges, color coding) is a monitor concern.

## Future Work (not in this ticket)

- Dashboard overview analytics — cross-theme contrast comparison
- Inline contrast indicators on UI examples (text preview, app chrome, notifications)
- CLI integration: `black-atom contrast <theme>` (DEV-313)
