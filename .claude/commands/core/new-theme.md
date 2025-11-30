---
description: "Create a new theme in an existing collection with all required files and configurations"
allowed-tools: ["Write", "Edit", "Read", "Bash", "Glob", "Grep"]
---

You are creating a new theme for the Black Atom theme project. Based on the conversation context and user input, create all necessary files and configurations.

**Theme adapter repositories:** nvim, ghostty, zed, wezterm, tmux
**Non-theme repositories to exclude:** radar.nvim, adapter-template, claude, obsidian, website

**Your task:**

1. **Parse user requirements** from $ARGUMENTS or conversation:
   - Collection name (jpn, stations, terra, north, mnml)
   - Theme variant name (e.g., "blue", "green", "purple")
   - Appearance (dark/light or both)
   - Primary accent color (hex code or OKLCH values)
   - Any special instructions
   - Confirm requirements with user before proceeding

2. **Create theme definition files** in core repository:
   - Create `src/themes/{collection}/black-atom-{collection}-{variant}-dark.ts` and/or light variant
   - Use existing themes in the same collection as templates
   - Implement proper accent system (especially for mnml collection)
   - Follow established patterns for primaries, palette, and accents
   - Use OKLCH color space via `oklchToHex()` for all color definitions
   - No comments in theme definition files (keep code clean)

3. **Update core configuration**:
   - Add new theme keys to `src/types/theme.ts` in `themeKeys` array
   - Add theme labels to `Meta.label` union type
   - Update `src/config.ts`:
     - Add to `themePathMap` with new theme paths
     - Add proper import statements

4. **Verify TypeScript**:
   - Run `deno task check` to verify types are valid
   - Fix any TypeScript errors before proceeding

5. **Update adapter configurations**:
   - For each adapter repository (nvim, ghostty, zed, wezterm, tmux):
     - Read `black-atom-adapter.json`
     - Add new theme keys to the appropriate collection's themes array
     - Maintain alphabetical order within collections

6. **Handle adapter-specific requirements**:
   - **nvim**: Create colorscheme loader files in `colors/` directory:
     ```lua
     local theme = require("black-atom.themes.{collection}.black-atom-{collection}-{variant}-{appearance}")

     require("black-atom").load(theme)
     ```
   - **ghostty**: No special handling needed (generated from templates)
   - **zed**: No special handling needed (generated from templates)
   - **wezterm**: No special handling needed (generated from templates)
   - **tmux**: No special handling needed (generated from templates)

7. **Generate and verify**:
   - Generate all adapters: `deno task adapters:gen`
   - Verify no undefined values in generated themes
   - Check that new theme files were created in each adapter

8. **Commit changes**:
   - Present proposed commit messages to user:
     - Core: `feat({collection}): add {variant} theme`
     - Adapters: `feat({collection}): add {variant} theme`
   - Wait for user approval
   - Commit core repository
   - Use ford to commit all adapter repositories:
     ```bash
     cd ~/repos/black-atom-industries && ford --exclude radar.nvim,adapter-template,claude,obsidian,website bash -c 'git add -A && git commit -m "message"'
     ```
   - Push all repositories:
     ```bash
     cd ~/repos/black-atom-industries && ford --exclude radar.nvim,adapter-template,claude,obsidian,website git push
     ```

9. **Present summary** of all created files and changes for user review

**Usage examples:**

- `/core:new-theme mnml green dark #22C55E` (single theme)
- `/core:new-theme mnml purple both #8B5CF6` (both dark and light)
- `/core:new-theme jpn sakura light #FF69B4` (light only)

**Expected $ARGUMENTS format:**
`{collection} {variant} {appearance} {accent-color} [additional-notes]`

Where:

- `collection`: jpn | stations | terra | north | mnml
- `variant`: descriptive name (blue, green, sakura, etc.)
- `appearance`: dark | light | both
- `accent-color`: hex color code (e.g., #005CC5)
- `additional-notes`: optional special instructions

**Key considerations:**

- **Color system**: Always use OKLCH color space via `oklchToHex()` for color definitions
- **mnml collection**: Use accent abstraction system with a10, a20, a30, a40 tokens
- **Other collections**: Follow existing patterns in that collection
- **Code style**: No comments in theme definitions, maintain clean code
- **Semantic mapping**: Use grayscale base with strategic accent placement
- **TypeScript validation**: Always run `deno task check` before generating adapters
- **Alphabetical order**: Maintain alphabetical order in adapter configurations
- **Commit messages**: Use semantic format with collection scope (e.g., `feat(mnml): add blue theme`)
- **Testing**: Verify generated themes have no undefined values before committing
