# Black Atom Core Development Guide

## Commands

### Development Commands

- Install global CLI: `deno task cli:install`
- Compile binary: `deno task cli:compile`
- Run typecheck: `deno task check`
- Format code: `deno task format`
- Lint code: `deno task lint`
- Generate schema: `deno task schema`
- Update dependencies: `deno task lock`

### Single Adapter Commands (run from adapter directory)

- Generate themes: `black-atom-core generate`

### Multi-Adapter Commands (run from core directory)

- Generate all adapters: `deno task adapters:gen`
- Watch and auto-regenerate: `deno task adapters:watch`
- Show repositories status: `deno task adapters:status`
- Generate and commit all: `deno task adapters:commit`
- Push all repositories: `deno task adapters:push`
- Reset repositories to remote: `deno task adapters:reset` (use `--auto-stash` to automatically stash changes)
- Run command in each adapter: `deno task adapters:each <command>` (e.g., `deno task adapters:each git status`)

## Code Style Guide

- **Formatting**: 4 spaces, 100 char line width, double quotes, semicolons
- **Types**: Use TypeScript types extensively; prefer interfaces for objects
- **Naming**: camelCase for variables/functions, PascalCase for types/interfaces
- **Imports**: Use import map for external dependencies (@std/\*, @zod, @eta)
- **Error Handling**: Use log utility with appropriate level (error/warn/info/success)
- **Template Files**: Use naming convention `{name}.template.{target-ext}`
- **Pre-commit**: Always run `deno task format` before creating a commit

## Project Architecture

- **Purpose**: Central source of truth for theme definitions and colors
- **Adapter Pattern**: Uses adapter.json config files in adapter repositories
- **Template Processing**: Uses Eta template engine to generate theme files
- **File Generation**: Creates output files alongside templates (removing .template)
- **Theme Structure**: Organized by collections (stations/jpn/terra/crbn)
- **Shared Components**: Themes can share UI and syntax definitions (dark/light)
- **Task System**: Provides development workflow automation via Deno tasks
- **Dynamic Theme Loading**: Uses TypeScript to validate theme loading at compile-time

## Core Components

### CLI Tool (`cli.ts`)

The CLI provides various commands:

- `help`: Display help information for commands
- `generate`: Process templates and create theme files
- `generate --watch`: Watches for changes in the template files and regenerates themes

### Task System (`src/tasks/`)

The Deno task system provides development workflow commands:

- `adapters:gen`: Generate all repositories without committing
- `adapters:watch`: Watch for theme changes and auto-regenerate
- `adapters:status`: Show status overview of all repositories
- `adapters:commit`: Generate and commit all repositories with confirmation
- `adapters:push`: Push repositories to remote (aborts if uncommitted changes)
- `adapters:reset`: Reset repositories to their remote state (with confirmation)

The task system is organized in the `src/tasks/` directory:

- `adapters/`: Contains adapter-related tasks
  - `generate.ts`: Handles processing all repositories
  - `watch.ts`: Implements intelligent file watching functionality
  - `push-all.ts`: Handles pushing changes to remote repositories
  - `reset.ts`: Handles resetting repositories to remote state
  - `status.ts`: Provides status overview of all repositories
  - `utils.ts`: Shared utility functions including:
    - `forEachAdapter()`: Common repository iteration logic
    - `runCommand()`: Execute shell commands
    - `getUserConfirmation()`: Handle user prompts

### Theme System (`src/themes/`)

- **Collections**: Themes are organized into collections (JPN, Stations, Terra, CRBN)
- **Shared Components**: UI and syntax definitions are shared across themes
- **Theme Definition**: Each theme has its own TypeScript file defining colors and properties
- **Color System**: Uses OKLCH color space with helper functions in `src/utils/color.ts`

### Color Utilities (`src/utils/color.ts`)

The color utility module provides functions for working with colors:

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
- **Task System**: Advanced adapter operations in `src/tasks/adapter/`

### Type System (`src/types/`)

- **Theme Interface**: Defines the structure of theme objects
- **Collection Keys**: Enumerates available theme collections
- **Theme Keys**: Maps theme names to their collection and variant

## Theme Definition Structure

All themes use OKLCH color space for defining colors, which provides better perceptual uniformity and easier color manipulation compared to hex values. The `oklchToHex()` function converts OKLCH values to hex at build time.

```typescript
import { oklchToHex } from "../../utils/color.ts";

// Theme interface
interface Theme {
    meta: {
        name: string;
        description: string;
        author: string;
    };
    appearance: "dark" | "light";
    primaries: {
        /* Dark range */
        d10: HexColor; // Darkest - defined with oklchToHex()
        d20: HexColor;
        d30: HexColor;
        d40: HexColor; // Transition to medium

        /* Middle range */
        m10: HexColor; // Mid-dark
        m20: HexColor;
        m30: HexColor;
        m40: HexColor; // Transition to high

        /* Light range */
        l10: HexColor; // Light
        l20: HexColor;
        l30: HexColor;
        l40: HexColor; // Brightest
    };
    palette: {
        // 16-color terminal palette
    };
    ui: UITheme;
    syntax: SyntaxTheme;
}

// Example theme definition using OKLCH
const primaries: Theme.Primaries = {
    d10: oklchToHex(0.199, 0.015, 196.04), // L: lightness (0-1), C: chroma, H: hue (0-360)
    d20: oklchToHex(0.225, 0.016, 196.09),
    // ... more colors
};

// UI theme interface
interface UITheme {
    bg: {
        default: string;
        // other background colors
    };
    fg: {
        default: string;
        // other foreground colors
    };
    // other UI element colors
}

// Syntax theme interface
interface SyntaxTheme {
    base: {
        // base syntax colors
    };
    syntax: {
        // specific syntax element colors
    };
}
```

## Theme Development Guides

Comprehensive guides for theme development are available in the `prompts/` directory:

- **`prompts/new-theme.md`** - Creating new themes within existing collections
- **`prompts/new-collection.md`** - Creating entirely new theme collections
- **`prompts/migration-rename.md`** - Renaming themes or collections across all repositories

Each guide includes:

- Step-by-step instructions with code examples
- Comprehensive testing procedures for all platforms
- Visual verification checklists
- Common issues and debugging tips
- Cross-platform compatibility testing

## Creating a New Collection

For detailed instructions, see `prompts/new-collection.md`. Quick overview:

1. **Create Collection Directory**:

   ```
   mkdir -p src/themes/new-collection
   ```

2. **Create Shared Components**:

   - Create `ui_dark.ts` and `ui_light.ts` for UI elements
   - Create `syntax_dark.ts` and `syntax_light.ts` for syntax highlighting
   - Base these on existing collection shared components

3. **Create Theme Definitions**:

   - Create a TypeScript file for each theme variant
   - Import shared components
   - Define theme metadata, primaries, and palette
   - Export the theme object

4. **Update Configuration**:

   - Add the collection to `CollectionKey` type in `types/theme.ts`
   - Update `config.ts` to include the new themes
   - Add to `themeMap` and `themeKeys`

5. **Test and Validate**:
   - Run `deno task check` to verify type safety
   - Run `deno task lint` and `deno task format` for code style
   - Generate schema with `deno task schema`

## Adapter Development

1. **Adapter Configuration**:

   - Create `black-atom-adapter.json` in the adapter repository
   - Define theme mappings to template files

2. **Template Creation**:

   - Create template files with `.template.{ext}` naming
   - Use Eta template syntax for variable interpolation
   - Reference theme properties with `<%= theme.property.path %>`
   - **IMPORTANT**: Templates should use UI, syntax colors, or palette colors, but never primaries directly

3. **Theme Generation**:

   - Run `black-atom-core generate` in the adapter repository
   - Verify generated files match expected output

4. **Testing**:
   - Test generated files in the target application
   - Verify colors and styling match the theme definitions

## Adapter Best Practices

### Avoid Using Primaries Directly

Adapters should never access primaries directly in templates. Instead, use:

- **UI colors**: `<%= theme.ui.bg.default %>`, `<%= theme.ui.fg.accent %>`, etc.
- **Syntax colors**: `<%= theme.syntax.string.default %>`, `<%= theme.syntax.keyword.default %>`, etc.
- **Palette colors**: `<%= theme.palette.red %>`, `<%= theme.palette.blue %>`, etc.

- **❌ DO NOT USE**: `<%= theme.primaries.d10 %>` or `<%= theme.primaries[0] %>`
- **✅ DO USE**: `<%= theme.ui.bg.default %>`, `<%= theme.palette.red %>`, etc.

This abstraction keeps adapters more stable when the core theme structure changes, as UI, syntax, and palette colors provide a consistent interface while primaries may evolve.

## Troubleshooting

- **Template Errors**: Check variable paths and syntax in template files
- **Type Errors**: Ensure theme definitions follow the correct interfaces
- **Generation Errors**: Verify adapter configuration is correctly formatted
- **Color Discrepancies**: Check hex value formats and conversion methods
