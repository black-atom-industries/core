# Black Atom Core

<div align="center">
  <img src="https://github.com/black-atom-industries/.github/blob/main/profile/assets/black-atom-banner.jpg" alt="Black Atom Banner" style="width:100%"/>
</div>

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
| **JPN**      | koyo-hiru, koyo-yoru, tsuki-yoru                           | Japanese-inspired themes      |
| **Stations** | engineering, operations, medical, research                 | Space station-inspired themes |
| **Terra**    | seasons (spring, summer, fall, winter) × time (day, night) | Earth season-inspired themes  |
| **CRBN**     | null, supr                                                 | Minimalist carbon themes      |

All themes are available in both dark and light variants.

## Installation

### Prerequisites

- [Deno](https://deno.land/) runtime (version 1.37.0 or higher)

### Setup

1. Clone this repository:

```bash
git clone https://github.com/black-atom-industries/core.git
cd core
```

2. Install the CLI globally:

```bash
deno task install
```

3. Verify the installation:

```bash
black-atom-core --help
```

## Usage

### CLI Commands

The `black-atom-core` CLI provides the following commands:

```bash
# Display help information
black-atom-core --help

# Adapt theme files for the current adapter
black-atom-core adapt

# Adapt theme files for all adapters and commit changes
# NOTE: Requires all adapter repositories to be cloned as siblings under the same parent directory
# Example structure: ~/repos/black-atom-industries/{core,nvim,ghostty,zed,obsidian}
black-atom-core adapt-all

# List all available themes (Not available yet)
# black-atom-core list

# Show detailed information about a specific theme (Not available yet)
# black-atom-core info jpn/koyo-yoru
```

### Theme Adaptation

The core CLI adapts theme files by:

1. Reading adapter configuration files (`black-atom-adapter.json`)
2. Processing template files with the Eta template engine
3. Replacing template variables with values from core theme definitions
4. Writing adapted files to the appropriate locations

```bash
# Navigate to an adapter repository
cd ../nvim

# Adapt theme files for this adapter
black-atom-core adapt
```

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
# Install dependencies
deno task deps

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

# Compile binary
deno task compile
```

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
3. Update the theme map in `config.ts`
4. Run typechecking and linting

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
