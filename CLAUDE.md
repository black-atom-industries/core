# Black Atom Industries Core Development Guide

## Build/Test Commands

- Install global CLI: `deno task install`
- Compile binary: `deno task compile`
- Run typecheck: `deno task check`
- Format code: `deno task format`
- Lint code: `deno task lint`
- Generate schema: `deno task schema`
- Update dependencies: `deno task lock`
- Generate themes: `black-atom-core generate`

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
- **Current Status**: Currently working for JPN themes

## Project Goals

- Migrate all theme definitions from Neovim to core repository
- Establish core as the single source of truth for theme colors
- Enable generation of theme files for multiple platforms
- Ensure consistent theme experience across different tools
- Support all existing theme collections (stations, jpn, terra, crbn)

## Theme Migration Process

1. **Reference**: Use JPN collection as the migration reference model
2. **Structure**:
   - Create shared UI/syntax files (ui_dark.ts, syntax_dark.ts, etc.)
   - Create theme definition files that use these shared components
3. **Migration Steps**:
   - Copy Lua definitions from Neovim repository
   - Convert to TypeScript following type definitions in types/theme.ts
   - Extract shared UI/syntax elements to respective files
   - Ensure theme files properly import and use shared elements
   - Validate output matches original Neovim themes
4. **Collections Status**:
   - JPN: ✅ Complete
   - Stations: 🚧 In progress (needs restart)
   - Terra: ❌ Not started
   - Crbn: ❌ Not started

