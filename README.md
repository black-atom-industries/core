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

| Collection   | Themes                                                     | Description                   |
| ------------ | ---------------------------------------------------------- | ----------------------------- |
| **Default**  | dark, dark-dimmed, light, light-dimmed                     | Core default themes           |
| **Stations** | engineering, operations, medical, research                 | Space station-inspired themes |
| **JPN**      | koyo-hiru, koyo-yoru, murasaki-yoru, tsuki-yoru            | Japanese-inspired themes      |
| **Terra**    | seasons (spring, summer, fall, winter) x time (day, night) | Earth season-inspired themes  |
| **MNML**     | 47, clay, eink, ita, mikado, mono, orange, osman           | Minimalist themes             |

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
2. **Adapter Repositories**: Implement themes for specific platforms (Neovim, terminals, etc.)
3. **Template Files**: Transform core definitions into platform-specific formats

Each adapter repository contains:

- Template files (e.g., `.template.lua`, `.template.json`)
- A `black-atom-adapter.json` configuration file
- Generated theme files

### Supported Adapters

- [Neovim](https://github.com/black-atom-industries/nvim)
- [Ghostty](https://github.com/black-atom-industries/ghostty)
- [WezTerm](https://github.com/black-atom-industries/wezterm)
- [Tmux](https://github.com/black-atom-industries/tmux)
- [Zed](https://github.com/black-atom-industries/zed)
- [Obsidian](https://github.com/black-atom-industries/obsidian)
- [Lazygit](https://github.com/black-atom-industries/lazygit)
- [Niri](https://github.com/black-atom-industries/niri)
- [Waybar](https://github.com/black-atom-industries/waybar)

## Development

### Prerequisites

- [Deno](https://deno.land/) runtime

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

### Multi-Adapter Management

The core repository provides tasks for managing all adapter repositories simultaneously:

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

**Note**: Multi-adapter commands require all adapter repositories to be cloned as siblings under the same parent directory. Example structure: `~/repos/black-atom-industries/{core,nvim,ghostty,zed,obsidian,...}`

### Creating New Themes

Detailed guides are available as Claude Code slash commands in `.claude/commands/core/`:

- `/core:new-theme` — Create a new theme within an existing collection
- `/core:new-adapter` — Create a new adapter for a platform
- `/core:rename-theme` — Rename a theme across all repositories

## Contributing

Contributions are welcome! If you'd like to improve existing themes or add new features:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run typechecking and linting
5. Create a pull request

## License

MIT - See [LICENSE](./LICENSE) for details
