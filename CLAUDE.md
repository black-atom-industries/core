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
- **Current Status**: Currently working for JPN, Stations, and Terra themes

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
3. **Collections Status**:
   - JPN: ✅ Complete
   - Stations: ✅ Complete
   - Terra: ✅ Complete
   - Crbn: ❌ Not started

## Detailed Migration Guide

Follow these steps to migrate a new theme collection from Lua to TypeScript:

1. **Prepare the Source Files**:
   - Copy Lua definitions from Neovim repository to a `/migrations/collection-name/` folder
   - Examine the structure of the Lua files to understand:
     - Theme properties (primaries, palette, appearance)
     - Shared components (ui_dark, syntax_dark, etc.)

2. **Create the Directory Structure**:
   - Create a new directory under `src/themes/` for the collection

3. **Create Shared UI/Syntax Files First**:
   - Start with `ui_dark.ts`, `ui_light.ts`, `syntax_dark.ts`, `syntax_light.ts`
   - Follow TypeScript interfaces from `types/theme.ts`
   - Convert property names from snake_case to camelCase (e.g., `dark_blue` → `darkBlue`)

4. **Create Theme Definition Files**:
   - Create separate .ts files for each theme
   - Import the shared UI/syntax components
   - Define meta information, primaries, and palette
   - Export the theme definition

5. **Update Supporting Files**:
   - Add the collection to CollectionKey type in `types/theme.ts`
   - Update `config.ts`:
     - Import the new theme files
     - Add to the themeMap
     - Update the themeKeys array

6. **Validate and Test**:
   - Run typecheck: `deno task check`
   - Run formatter: `deno task format`
   - Run linter: `deno task lint`
   - Generate schema: `deno task schema`

7. **Key Conversion Notes**:
   - Convert Lua table keys to TypeScript object keys
   - Rename snake_case to camelCase
   - Ensure all properties match the TypeScript interfaces
   - Convert Lua index-based arrays (1-indexed) to JavaScript arrays (0-indexed)
   - Example property conversions:
     ```
     dark_red → darkRed
     dark_yellow → darkYellow
     dark_blue → darkBlue
     dark_cyan → darkCyan
     light_gray → lightGray
     ```

8. **Testing with Adapters**:
   - Create template files in the adapter repository
   - Set up adapter.json configuration
   - Run the generator to create theme files
   - Verify theme output matches original Neovim themes
