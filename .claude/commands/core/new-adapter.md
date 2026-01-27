---
description: "Create a new adapter for a platform to support Black Atom themes"
allowed-tools: ["Write", "Edit", "Read", "Bash", "Glob", "Grep", "WebFetch", "WebSearch", "AskUserQuestion"]
---

You are creating a new adapter for the Black Atom theme ecosystem. This is a **collaborative process** that involves researching the target platform's theme format, mapping tokens, and creating the adapter structure.

**Existing adapters for reference:** nvim, ghostty, zed, wezterm, tmux, waybar, niri, lazygit
**Adapters location:** `~/repos/black-atom-industries/{adapter-name}/`

## Phase 1: Research

1. **Identify the target platform** from $ARGUMENTS or ask the user
2. **Research the theme format**:
   - Search for official documentation on theme customization
   - Look for existing community themes (especially Catppuccin, Dracula, or similar projects) as references
   - Identify all required/optional color properties
   - Determine the file format (YAML, JSON, TOML, conf, Lua, etc.)

3. **Document findings**:
   - List all color properties the platform supports
   - Note any special requirements (format constraints, file naming, etc.)
   - Identify which properties are essential vs optional

## Phase 2: Token Mapping

Map the platform's color properties to Black Atom's semantic token system.

**Black Atom Token System:**

### UI Tokens (for interface elements)
```
theme.ui.bg.default      # Main background
theme.ui.bg.panel        # Sidebar/panel background
theme.ui.bg.float        # Floating elements
theme.ui.bg.selection    # Selected line/item background
theme.ui.bg.hover        # Hover state background
theme.ui.bg.active       # Active/pressed state
theme.ui.bg.search       # Search highlight background

theme.ui.fg.default      # Default text
theme.ui.fg.subtle       # Dimmed/secondary text
theme.ui.fg.accent       # Accent/highlight color (primary accent)
theme.ui.fg.disabled     # Disabled text
theme.ui.fg.contrast     # High contrast text
theme.ui.fg.negative     # Error/danger (red)
theme.ui.fg.positive     # Success (green)
theme.ui.fg.warn         # Warning (yellow)
theme.ui.fg.info         # Info (blue)
```

### Palette Tokens (for ANSI/terminal colors)
```
theme.palette.black      # ANSI 0
theme.palette.darkRed    # ANSI 1
theme.palette.darkGreen  # ANSI 2
theme.palette.darkYellow # ANSI 3
theme.palette.darkBlue   # ANSI 4
theme.palette.darkMagenta# ANSI 5
theme.palette.darkCyan   # ANSI 6
theme.palette.lightGray  # ANSI 7
theme.palette.gray       # ANSI 8
theme.palette.red        # ANSI 9
theme.palette.green      # ANSI 10
theme.palette.yellow     # ANSI 11
theme.palette.blue       # ANSI 12
theme.palette.magenta    # ANSI 13
theme.palette.cyan       # ANSI 14
theme.palette.white      # ANSI 15
```

### Syntax Tokens (for code highlighting)
```
theme.syntax.variable.default
theme.syntax.string.default
theme.syntax.keyword.default
theme.syntax.func.default
theme.syntax.type.default
theme.syntax.comment.default
theme.syntax.constant.default
theme.syntax.operator.default
theme.syntax.punctuation.default
```

**Mapping Guidelines:**
- **Border/outline colors**: Use `theme.ui.fg.accent` (active) or `theme.ui.fg.subtle` (inactive)
- **Background colors**: Use appropriate `theme.ui.bg.*` token
- **Text colors**: Use appropriate `theme.ui.fg.*` token
- **Error/warning states**: Use `theme.ui.fg.negative`, `theme.ui.fg.warn`
- **ANSI terminal colors**: Use `theme.palette.*` tokens directly
- **NEVER use primaries directly** (`theme.primaries.d10` etc.) - always use semantic tokens

4. **Create mapping table** showing platform property → Black Atom token

## Phase 3: Implementation

5. **Create adapter directory structure**:
```
~/repos/black-atom-industries/{adapter-name}/
├── black-atom-adapter.json
└── themes/
    ├── default/
    │   └── collection.template.{ext}
    ├── jpn/
    │   └── collection.template.{ext}
    ├── stations/
    │   └── collection.template.{ext}
    ├── terra/
    │   └── collection.template.{ext}
    └── mnml/
        └── collection.template.{ext}
```

6. **Create `black-atom-adapter.json`**:
```json
{
  "$schema": "https://raw.githubusercontent.com/black-atom-industries/core/refs/heads/main/adapter.schema.json",
  "collections": {
    "default": {
      "template": "./themes/default/collection.template.{ext}",
      "themes": [
        "black-atom-default-dark",
        "black-atom-default-dark-dimmed",
        "black-atom-default-light",
        "black-atom-default-light-dimmed"
      ]
    },
    "jpn": {
      "template": "./themes/jpn/collection.template.{ext}",
      "themes": [
        "black-atom-jpn-koyo-yoru",
        "black-atom-jpn-koyo-hiru",
        "black-atom-jpn-tsuki-yoru",
        "black-atom-jpn-murasaki-yoru"
      ]
    },
    "stations": {
      "template": "./themes/stations/collection.template.{ext}",
      "themes": [
        "black-atom-stations-engineering",
        "black-atom-stations-operations",
        "black-atom-stations-medical",
        "black-atom-stations-research"
      ]
    },
    "terra": {
      "template": "./themes/terra/collection.template.{ext}",
      "themes": [
        "black-atom-terra-spring-day",
        "black-atom-terra-spring-night",
        "black-atom-terra-summer-day",
        "black-atom-terra-summer-night",
        "black-atom-terra-fall-day",
        "black-atom-terra-fall-night",
        "black-atom-terra-winter-day",
        "black-atom-terra-winter-night"
      ]
    },
    "mnml": {
      "template": "./themes/mnml/collection.template.{ext}",
      "themes": [
        "black-atom-mnml-clay-dark",
        "black-atom-mnml-clay-light",
        "black-atom-mnml-orange-dark",
        "black-atom-mnml-orange-light",
        "black-atom-mnml-osman-light",
        "black-atom-mnml-mikado-dark",
        "black-atom-mnml-mikado-light",
        "black-atom-mnml-47-light",
        "black-atom-mnml-47-dark",
        "black-atom-mnml-eink-light",
        "black-atom-mnml-eink-dark"
      ]
    }
  }
}
```

7. **Create template file** using Eta syntax (`<%= theme.path.to.token %>`):
   - Add header comment with theme label: `# <%= theme.meta.label %>`
   - Add Black Atom attribution comment
   - Replace all color values with appropriate token references
   - **If all collections use identical token mappings**, create one template and copy to all collection directories

## Phase 4: Verification

8. **Generate themes**:
```bash
cd ~/repos/black-atom-industries/{adapter-name} && black-atom-core generate
```

9. **Check for undefined values**:
```bash
grep -r "undefined" ~/repos/black-atom-industries/{adapter-name}/themes/ || echo "No undefined values found"
```

10. **Inspect generated output**:
    - Read a generated dark theme file
    - Read a generated light theme file
    - Verify hex colors look reasonable (dark themes have dark backgrounds, light themes have light backgrounds)

11. **Visual testing** (if possible):
    - Copy a generated theme to the platform's config location
    - Launch the platform and verify colors apply correctly
    - Check that the theme looks cohesive

## Phase 5: Finalize

12. **Initialize git repository**:
```bash
cd ~/repos/black-atom-industries/{adapter-name}
git init
git add -A
git commit -m "feat: initial {adapter-name} adapter with all collections"
```

13. **Verify core recognizes the adapter**:
```bash
cd ~/repos/black-atom-industries/core && deno task adapters:status
```

14. **Summary**: Present to user:
    - Files created
    - Token mappings used
    - Any platform-specific notes
    - Instructions for using the themes

---

**Usage examples:**

- `/core:new-adapter lazygit`
- `/core:new-adapter alacritty`
- `/core:new-adapter kitty`
- `/core:new-adapter foot`
- `/core:new-adapter starship`

**Key considerations:**

- **Semantic tokens**: Always use UI/syntax/palette tokens, never primaries
- **File format**: Match the platform's expected format exactly
- **Template naming**: `collection.template.{ext}` → generates `{theme-key}.{ext}`
- **Collections share templates**: If token mappings are identical across collections, use the same template content
- **Test generation**: Always run `black-atom-core generate` and check for undefined values before committing
- **Reference existing adapters**: Look at ghostty, lazygit, or other adapters for patterns
