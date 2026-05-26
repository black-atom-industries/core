---
name: core-architecture
description: Use when navigating the core codebase, understanding component structure, theme definitions, color utilities, or the type system.
---

# Core Architecture Reference

## Core Components

### CLI Tool (`cli.ts`)

- `help`: Display help information for commands
- `generate`: Process templates and create theme files
- `generate --watch`: Watches for changes and regenerates themes

### Task System (`src/tasks/`)

- `adapters:gen`: Generate all repositories without committing
- `adapters:watch`: Watch for theme changes and auto-regenerate
- `adapters:status`: Show status overview of all repositories
- `adapters:commit`: Generate and commit all repositories with confirmation
- `adapters:push`: Push repositories to remote (aborts if uncommitted changes)
- `adapters:reset`: Reset repositories to their remote state (with confirmation)

Task system files in `src/tasks/adapters/`:

- `generate.ts`: Processing all repositories
- `watch.ts`: Intelligent file watching
- `push-all.ts`: Pushing changes to remote
- `reset.ts`: Resetting repositories to remote state
- `status.ts`: Status overview
- `utils.ts`: Shared utilities (`forEachAdapter()`, `runCommand()`, `getUserConfirmation()`)

### Theme System (`src/themes/`)

- **Collections**: Organized into collections (Default, JPN, Stations, Terra, MNML)
- **Shared Components**: UI and syntax definitions shared across themes within a collection
- **Theme Definition**: Each theme has its own TypeScript file defining colors and properties
- **Color System**: Uses OKLCH color space with helpers in `src/utils/color.ts`

### Color Utilities (`src/utils/color.ts`)

- **`oklch(l, c, h)`**: Converts OKLCH values to hex color
  - `l` (lightness): 0-1, where 0 is black and 1 is white
  - `c` (chroma): typically 0-0.4, represents color intensity
  - `h` (hue): 0-360 degrees, color angle on the color wheel
- **`blend({fg, bg, alpha})`**: Blends two colors together
- **`tint({color, with, amount})`**: Tints a base color with another color

### Adapter System

- **Configuration**: Reads `black-atom-adapter.json` from adapter repositories
- **Template Processing**: Uses Eta template engine to process template files
- **Variable Injection**: Injects theme properties into templates
- **File Generation**: Creates theme files from processed templates
- **Commands**: Implemented in `src/commands/adapt.ts` and `src/commands/adapt-all.ts`

### Type System (`src/types/`)

- **Theme Interface**: Defines the structure of theme objects
- **Collection Keys**: Enumerates available theme collections
- **Theme Keys**: Maps theme names to their collection and variant

## Theme Definition Structure

All themes use OKLCH color space. The `oklchToHex()` function converts OKLCH values to hex at build time.

```typescript
import { oklchToHex } from "../../utils/color.ts";

interface Theme {
    meta: { name: string; description: string; author: string };
    appearance: "dark" | "light";
    primaries: {
        d10: HexColor;
        d20: HexColor;
        d30: HexColor;
        d40: HexColor; // Dark range
        m10: HexColor;
        m20: HexColor;
        m30: HexColor;
        m40: HexColor; // Middle range
        l10: HexColor;
        l20: HexColor;
        l30: HexColor;
        l40: HexColor; // Light range
    };
    palette: {/* 16-color terminal palette */};
    ui: UITheme;
    syntax: SyntaxTheme;
}

const primaries: Theme.Primaries = {
    d10: oklchToHex(0.199, 0.015, 196.04), // L: lightness, C: chroma, H: hue
    d20: oklchToHex(0.225, 0.016, 196.09),
    // ...
};
```

## Creating a New Collection

1. Create directory: `mkdir -p src/themes/new-collection`
2. Create shared components: `ui_dark.ts`, `ui_light.ts`, `syntax_dark.ts`, `syntax_light.ts`
3. Create theme definitions importing shared components
4. Update `CollectionKey` type in `types/theme.ts`
5. Update `config.ts` — add to `themeMap` and `themeKeys`
6. Validate: `deno task check`, `deno task lint`, `deno task format`, `deno task schema`
