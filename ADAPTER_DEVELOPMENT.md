# Black Atom Adapter Development Guide

This guide outlines the process and best practices for developing adapter templates for the Black Atom theme system.

## Adapter Pattern Overview

The Black Atom theme system uses an adapter pattern to generate platform-specific theme files from the core theme definitions:

1. **Core Theme Definitions**: TypeScript files that define the theme's colors, UI elements, and syntax highlighting
2. **Adapter Templates**: Template files specific to each platform (e.g., Neovim, Ghostty, Zed)
3. **Generated Files**: Platform-specific theme files created by processing templates with the core definitions

## Creating an Adapter

### 1. Setup

The easiest way to start a new adapter is to use the [adapter-template](https://github.com/black-atom-industries/adapter-template) repository:

1. Clone the adapter template repository
2. Rename it to match your target platform (e.g., `vscode`, `alacritty`)
3. Follow the instructions in the template's README

Alternatively, you can create a repository from scratch:

1. Create a new repository for your adapter (e.g., `black-atom-industries/vscode`)
2. Add a `black-atom-adapter.json` configuration file to map themes to templates
3. Create a directory structure for themes and templates

### 2. Template Creation

1. Create template files with `.template.{ext}` naming convention
   - Use the appropriate extension for your platform (e.g., `.json`, `.lua`, `.css`)
2. Use [Eta template syntax](https://eta.js.org/) for variable interpolation
   - Reference theme properties with `<%= theme.property.path %>`
3. **IMPORTANT**: Templates should use UI, syntax colors, or palette colors, NEVER primaries directly

### 3. Adapter Configuration

Your `black-atom-adapter.json` should look like:

```json
{
  "$schema": "https://raw.githubusercontent.com/black-atom-industries/core/refs/heads/main/adapter.schema.json",
  "black-atom-stations-engineering": {
    "templates": ["./themes/stations/black-atom-stations-engineering.template.json"]
  },
  "black-atom-jpn-koyo-yoru": {
    "templates": ["./themes/jpn/black-atom-jpn-koyo-yoru.template.json"]
  }
  // ... other themes
}
```

## Theme Adaptation Process

1. Run `black-atom-core adapt` in the adapter repository
2. The CLI reads your `black-atom-adapter.json` file
3. For each theme, the corresponding template is processed
4. Variables are replaced with values from the core theme definitions
5. Generated files are written to their specified locations

## Best Practices

### Accessing Theme Properties

Adapters should **never** access primaries directly in templates. Instead, use:

- **UI colors**: `<%= theme.ui.bg.default %>`, `<%= theme.ui.fg.accent %>`, etc.
- **Syntax colors**: `<%= theme.syntax.string.default %>`, `<%= theme.syntax.keyword.default %>`, etc.
- **Palette colors**: `<%= theme.palette.red %>`, `<%= theme.palette.blue %>`, etc.

#### Do Not Use:
```
<%= theme.primaries.d10 %>
<%= theme.primaries[0] %>
```

#### Do Use:
```
<%= theme.ui.bg.default %>
<%= theme.syntax.string.default %>
<%= theme.palette.red %>
```

This abstraction keeps adapters more stable when the core theme structure changes, as UI, syntax, and palette colors provide a consistent interface while primaries may evolve.

### Template Organization

Organize template files by theme collection:

```
themes/
  jpn/
    black-atom-jpn-koyo-yoru.template.json
    black-atom-jpn-koyo-hiru.template.json
  stations/
    black-atom-stations-engineering.template.json
    ...
```

### Testing Templates

After generating theme files:

1. Test them in the target application
2. Verify colors and styling match the intended design
3. Check for any platform-specific issues

## Troubleshooting

- **Template Errors**: Check variable paths and template syntax
- **Missing Colors**: Ensure you're accessing the correct theme properties
- **Adapter Issues**: Verify your `black-atom-adapter.json` is correctly formatted

## Development Workflow

1. Update template files when changes are needed
2. Run `black-atom-core adapt` to regenerate theme files
3. Test the changes in the target application
4. Commit both the template changes and the generated files

## Existing Adapters for Reference

You can refer to these existing adapters for examples:

- [nvim](https://github.com/black-atom-industries/nvim) - Neovim editor
- [ghostty](https://github.com/black-atom-industries/ghostty) - Ghostty terminal
- [zed](https://github.com/black-atom-industries/zed) - Zed editor
- [obsidian](https://github.com/black-atom-industries/obsidian) - Obsidian note-taking app

## Reference

### Theme Structure

```typescript
// Basic theme structure reference
{
  meta: {
    key: "black-atom-jpn-koyo-yoru",
    label: "Black At•m — JPN ∷ Koyo Yoru",
    appearance: "dark",
    collection: { key: "jpn", label: "JPN" },
  },
  // Don't access these directly in templates
  primaries: {
    d10: "#271f27", d20: "#332733", d30: "#3f2f3f", d40: "#4a384a",
    m10: "#605872", m20: "#6e6a86", m30: "#908caa", m40: "#aaa7be",
    l10: "#dab18c", l20: "#e0be9f", l30: "#e6cbb2", l40: "#ecd8c5",
  },
  // Access these in templates
  palette: {
    black: "#3f2f3f", gray: "#6e6a86", dark_red: "#b46371", red: "#eb6f84", 
    // ... other colors
  },
  ui: {
    bg: {
      default: "#332733", panel: "#271f27", float: "#271f27",
      // ... other background colors
    },
    fg: {
      default: "#e6cbb2", subtle: "#dab18c", accent: "#e9b162",
      // ... other foreground colors
    }
  },
  syntax: {
    variable: { default: "#e0be9f", builtin: "#aaa7be" },
    string: { default: "#7ab89b", doc: "#7ab89b" },
    // ... other syntax highlighting colors
  }
}
```