---
description: "Create a new theme in an existing collection with all required files and configurations"
allowed-tools: ["Write", "Edit", "Read", "Bash", "LS"]
---

You are creating a new theme for the Black Atom theme project. Based on the conversation context and user input, create all necessary files and configurations.

**Your task:**

1. **Parse user requirements** from $ARGUMENTS:
   - Collection name (jpn, stations, terra, north, mnml)
   - Theme variant name (e.g., "blue", "green", "purple")
   - Appearance (dark/light or both)
   - Primary accent color (hex code)
   - Any special instructions

2. **Create theme definition files** in core repository:
   - Create `black-atom-{collection}-{variant}-dark.ts` and/or `black-atom-{collection}-{variant}-light.ts`
   - Use existing themes in the same collection as templates
   - Implement proper accent system (especially for mnml collection)
   - Follow established patterns for primaries, palette, and accents

3. **Update core configuration**:
   - Add new theme keys to `src/types/theme.ts` in `themeKeys` array
   - Add theme labels to `Meta.label` union type
   - Update `src/config.ts` themePathMap with new theme paths

4. **Update adapter configurations**:
   - Add new theme keys to `black-atom-adapter.json` in each adapter repo (nvim, ghostty, zed, wezterm)
   - Add to the appropriate collection's themes array

5. **Handle adapter-specific requirements**:
   - **nvim**: Create colorscheme loader files in `colors/` directory:
     ```lua
     local theme = require("black-atom.themes.{collection}.black-atom-{collection}-{variant}-{appearance}")

     require("black-atom").load(theme)
     ```
   - **ghostty**: No special handling needed (generated from templates)
   - **zed**: No special handling needed (generated from templates)
   - **wezterm**: No special handling needed (generated from templates)

6. **Generate and test**:
   - Run TypeScript typecheck: `deno task check`
   - Generate themes: `deno task dev:adapters:generate`
   - Verify no undefined values in generated themes

7. **Present summary** of all created files and changes for user review

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

- For mnml collection: Use accent abstraction system with a10, a20, a30, a40 tokens
- For other collections: Follow existing patterns in that collection
- Maintain consistent code style (no comments in theme definitions)
- Use semantic color mapping (grayscale base + strategic accent placement)
