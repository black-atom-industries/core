# Black Atom Core

[![JSR](https://jsr.io/badges/@black-atom/core)](https://jsr.io/@black-atom/core)

> The core theme definitions and generation engine for Black Atom Industries theme ecosystem

## What is Black Atom Core?

Black Atom Core is the central repository for all theme definitions in the Black Atom theme ecosystem. It serves as:

- The **single source of truth** for all theme colors and styling
- A **theme generation engine** that processes templates to create platform-specific theme files
- A **command-line interface** for theme management and generation

This modular architecture ensures consistent styling across all supported platforms while allowing for platform-specific optimizations through adapter repositories.

For details on our color token system, see [COLOR_TOKEN_SYSTEM.md](./COLOR_TOKEN_SYSTEM.md).

## Available Theme Collections

Black Atom includes multiple theme collections, each with its own distinct style:

| Collection   | Themes                                                     | Description                   |
| ------------ | ---------------------------------------------------------- | ----------------------------- |
| **JPN**      | koyo-hiru, koyo-yoru, murasaki-yoru, tsuki-yoru            | Japanese-inspired themes      |
| **Stations** | engineering, operations, medical, research                 | Space station-inspired themes |
| **Terra**    | seasons (spring, summer, fall, winter) × time (day, night) | Earth season-inspired themes  |
| **MNML**     | 47, mikado, clay, orange (dark/light variants)             | Minimalist themes             |
| **North**    | dark-night, day, night                                     | Nordic-inspired themes        |

All themes are available in both dark and light variants.

## Usage

### For Adapter Contributors

Black Atom Core is published on [JSR](https://jsr.io/@black-atom/core). Adapter repositories use it directly — no need to clone core or install a binary.

From any adapter repository with a `deno.json`:

```bash
# Generate theme files
deno task generate

# Watch for template changes and auto-regenerate
deno task dev
```

These tasks run the core CLI via JSR:

```bash
deno run -A jsr:@black-atom/core/cli generate
```

### Theme Adaptation

The core CLI adapts theme files by:

1. Reading adapter configuration files (`black-atom-adapter.json`)
2. Processing template files with the Eta template engine
3. Replacing template variables with values from core theme definitions
4. Writing adapted files to the appropriate locations

## Adapter Pattern

Black Atom uses an adapter pattern to support multiple platforms:

1. **Core Repository**: Defines all theme colors and properties
2. **Adapter Repositories**: Implement themes for specific platforms (Neovim, VS Code, terminals, etc.)
3. **Template Files**: Transform core definitions into platform-specific formats

Each adapter repository contains:

- Template files (e.g., `.template.lua`, `.template.json`)
- An `adapter.json` configuration file
- Generated theme files

### Supported Adapters

- [Black Atom for Neovim](https://github.com/black-atom-industries/nvim)
- [Black Atom for Ghostty](https://github.com/black-atom-industries/ghostty)
- [Black Atom for Zed](https://github.com/black-atom-industries/zed)
- [Black Atom for Obsidian](https://github.com/black-atom-industries/obsidian)

## Development

### Development Commands

```bash
# Run typechecking
deno task check

# Run linter
deno task lint

# Format code
deno task format

# Generate JSON schema
deno task schema

# Update dependency lock file
deno task lock
```

### CLI Build & Install

```bash
# Compile standalone binary (includes all themes)
deno task cli:compile

# Install to /usr/local/bin (may require sudo)
sudo deno task cli:install
```

The compiled binary is fully standalone - it doesn't require Deno to be installed on the target system. All themes are bundled into the binary at compile time.

### Multi-Adapter Management

The core repository provides advanced tasks for managing all adapter repositories:

```bash
# Generate themes for all adapters
deno task adapters:gen

# Watch for changes and auto-regenerate themes
deno task adapters:watch

# Show status of all adapter repositories
deno task adapters:status

# Generate and commit themes to all adapters
deno task adapters:commit

# Push all adapter repositories to remote
deno task adapters:push

# Reset all adapter repositories to remote state
deno task adapters:reset
```

**Note**: Multi-adapter commands require all adapter repositories to be cloned as siblings under the same parent directory. Example structure: `~/repos/black-atom-industries/{core,nvim,ghostty,zed,obsidian}`

### Theme Structure

Themes are defined in TypeScript and follow a structured format:

```typescript
export const theme: Theme = {
    meta: {
        name: "Theme Name",
        description: "Theme description",
        author: "Black Atom Industries",
    },
    appearance: "dark", // or "light"
    primaries: {
        accent: "#hexcolor",
        // other primary colors
    },
    palette: {
        // 16-color terminal palette
    },
    ui: uiDark, // or uiLight, imported from shared components
    syntax: syntaxDark, // or syntaxLight, imported from shared components
};
```

### Creating New Themes

To create a new theme:

1. Create a new TypeScript file in the appropriate collection directory
2. Define the theme structure following the `Theme` interface
3. Update the theme keys in `src/types/theme.ts`:
   - Add to `themeKeys` array
   - Add to `Meta.label` union type
4. Update the theme bundle in `src/themes/bundle.ts`:
   - Add import statement for the new theme
   - Add entry to `themeBundle` object
5. If creating a new collection:
   - Add the collection key to `CollectionKey` type in `src/types/theme.ts`
   - Add the collection to `collectionsSchema` in `src/lib/validate-adapter.ts`
   - Create shared UI and syntax files for the collection
6. Run typechecking: `deno task check`
7. Generate schema: `deno task schema`
8. **Important**: Recompile and reinstall the CLI to pick up changes:
   ```bash
   deno task cli:compile && deno task cli:install
   ```

## Contributing

Contributions are welcome! If you'd like to improve existing themes or add new features:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run typechecking and linting
5. Create a pull request

## License

MIT - See [LICENSE](./LICENSE) for details

## Adapters

- [Black Atom for Neovim](https://github.com/black-atom-industries/nvim)
- [Black Atom for Ghostty](https://github.com/black-atom-industries/ghostty)
- [Black Atom for Zed](https://github.com/black-atom-industries/zed)
- [Black Atom for Obsidian](https://github.com/black-atom-industries/obsidian)
