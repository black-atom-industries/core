# Black Atom Core Development Guide

## Build/Test Commands

- Install global CLI: `deno task install`
- Compile binary: `deno task compile`
- Run typecheck: `deno task check`
- Format code: `deno task format`
- Lint code: `deno task lint`
- Generate schema: `deno task schema`
- Update dependencies: `deno task lock`
- Adapt themes: `black-atom-core adapt`
- Adapt all adapters: `black-atom-core adapt-all` (requires repositories to be cloned as siblings)

## Code Style Guide

- **Formatting**: 4 spaces, 100 char line width, double quotes, semicolons
- **Types**: Use TypeScript types extensively; prefer interfaces for objects
- **Naming**: camelCase for variables/functions, PascalCase for types/interfaces
- **Imports**: Use import map for external dependencies (@std/\*, @zod, @eta)
- **Error Handling**: Use log utility with appropriate level (error/warn/info/success)
- **Template Files**: Use naming convention `{name}.template.{target-ext}`

## Project Architecture

- **Purpose**: Central source of truth for theme definitions and colors
- **Adapter Pattern**: Uses adapter.json config files in adapter repositories
- **Template Processing**: Uses Eta template engine to generate theme files
- **File Generation**: Creates output files alongside templates (removing .template)
- **Theme Structure**: Organized by collections (stations/jpn/terra/crbn)
- **Shared Components**: Themes can share UI and syntax definitions (dark/light)

## Core Components

### CLI Tool (`cli.ts`)

The CLI provides various commands:

- `generate`: Process templates and create theme files

<!-- - `list`: List all available themes-->
<!-- - `info`: Display detailed information about a theme -->
<!-- - `init`: Initialize a new adapter repository with template structure-->

### Theme System (`src/themes/`)

- **Collections**: Themes are organized into collections (JPN, Stations, Terra, CRBN)
- **Shared Components**: UI and syntax definitions are shared across themes
- **Theme Definition**: Each theme has its own TypeScript file defining colors and properties

### Adapter System (`src/adapter/`)

- **Configuration**: Reads `black-atom-adapter.json` from adapter repositories
- **Template Processing**: Uses Eta template engine to process template files
- **Variable Injection**: Injects theme properties into templates
- **File Generation**: Creates theme files from processed templates

### Type System (`src/types/`)

- **Theme Interface**: Defines the structure of theme objects
- **Collection Keys**: Enumerates available theme collections
- **Theme Keys**: Maps theme names to their collection and variant

## Theme Definition Structure

```typescript
// Theme interface
interface Theme {
    meta: {
        name: string;
        description: string;
        author: string;
    };
    appearance: "dark" | "light";
    primaries: {
        accent: string;
        // other primary colors
    };
    palette: {
        // 16-color terminal palette
    };
    ui: UITheme;
    syntax: SyntaxTheme;
}

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

## Creating a New Collection

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

3. **Theme Generation**:

   - Run `black-atom-core generate` in the adapter repository
   - Verify generated files match expected output

4. **Testing**:
   - Test generated files in the target application
   - Verify colors and styling match the theme definitions

## Troubleshooting

- **Template Errors**: Check variable paths and syntax in template files
- **Type Errors**: Ensure theme definitions follow the correct interfaces
- **Generation Errors**: Verify adapter configuration is correctly formatted
- **Color Discrepancies**: Check hex value formats and conversion methods
