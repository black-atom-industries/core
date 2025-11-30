---
description: "Create a new theme in an existing collection with all required files and configurations"
allowed-tools: ["Write", "Edit", "Read", "Bash", "Glob", "Grep"]
---

You are creating a new theme for the Black Atom theme project. This is a **collaborative, conversational process** where you work with the user to develop the theme concept and details.

**Theme adapter repositories:** nvim, ghostty, zed, wezterm, tmux
**Non-theme repositories to exclude:** radar.nvim, adapter-template, claude, obsidian, website

**Your task:**

1. **Start a conversation to gather requirements**:
   - $ARGUMENTS may contain freetext describing the theme idea, or be empty
   - Check if an image is attached to the message
   - **Engage conversationally** to understand:
     - What inspired this theme? (reference image, color, concept, etc.)
     - Which collection does it belong in? (jpn, stations, terra, north, mnml)
     - What should we call it? (variant name like "sunset", "ocean", "murder")
     - Dark, light, or both appearances?
     - Any special aesthetic goals or constraints?
   - **Don't rigidly demand structured input** - work with whatever the user provides
   - If uncertain about collection or naming, offer suggestions based on the theme concept
   - **Use the AskUserQuestion tool** for structured questions (collection selection, palette selection, refinement options, etc.)

1a. **If reference image is attached or mentioned**:
   - Ask user for the file path to the image (if not already provided)
   - Import palette extraction utility:
     ```typescript
     import { extractPaletteFromImage, formatPaletteResult, adjustPaletteSuggestion, generatePrimariesFromSuggestion } from "./src/utils/palette-from-image.ts";
     ```
   - Strip `@` prefix if present from image path
   - Call `extractPaletteFromImage({ imagePath, numColors: 10, appearance })`
   - Display formatted result using `formatPaletteResult(result)`
   - **Use AskUserQuestion tool** to ask which palette to use (1-3)
   - **Use AskUserQuestion tool** to ask if user wants to refine the palette
     - If yes, ask for specific adjustments using the tool
     - Apply adjustments using `adjustPaletteSuggestion()`
   - Use the selected/adjusted palette for theme creation

1b. **If hex color provided**:
   - Use the color directly
   - Confirm it matches the theme vision

1c. **If no color specified**:
   - Ask: "Would you like to provide a hex color or a reference image?"
   - Proceed based on response

2. **Once requirements are clear** (collection, variant, appearance, colors), confirm with user before proceeding

3. **Create theme definition files** in core repository:
   - Create `src/themes/{collection}/black-atom-{collection}-{variant}-dark.ts` and/or light variant
   - Use existing themes in the same collection as templates
   - Implement proper accent system (especially for mnml collection)
   - Follow established patterns for primaries, palette, and accents
   - Use OKLCH color space via `oklchToHex()` for all color definitions
   - No comments in theme definition files (keep code clean)

4. **Update core configuration**:
   - Add new theme keys to `src/types/theme.ts` in `themeKeys` array
   - Add theme labels to `Meta.label` union type
   - Update `src/config.ts`:
     - Add to `themePathMap` with new theme paths
     - Add proper import statements

5. **Verify TypeScript**:
   - Run `deno task check` to verify types are valid
   - Fix any TypeScript errors before proceeding

6. **Update adapter configurations**:
   - For each adapter repository (nvim, ghostty, zed, wezterm, tmux):
     - Read `black-atom-adapter.json`
     - Add new theme keys to the appropriate collection's themes array
     - Maintain alphabetical order within collections

7. **Handle adapter-specific requirements**:
   - **nvim**: Create colorscheme loader files in `colors/` directory:
     ```lua
     local theme = require("black-atom.themes.{collection}.black-atom-{collection}-{variant}-{appearance}")

     require("black-atom").load(theme)
     ```
   - **ghostty**: No special handling needed (generated from templates)
   - **zed**: No special handling needed (generated from templates)
   - **wezterm**: No special handling needed (generated from templates)
   - **tmux**: No special handling needed (generated from templates)

8. **Generate and verify**:
   - Generate all adapters: `deno task adapters:gen`
   - Verify no undefined values in generated themes
   - Check that new theme files were created in each adapter

9. **Commit changes**:
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

10. **Present summary** of all created files and changes for user review

**Usage examples:**

**Freetext/conversational approach (preferred):**
- `/core:new-theme` [drag book cover image] "I want a theme based on this"
- `/core:new-theme inspired by that murder mystery book cover`
- `/core:new-theme something dark with vibrant red accents`
- `/core:new-theme` (start completely blank, figure it out together)

**Structured approach (also fine):**
- `/core:new-theme mnml green dark #22C55E`
- `/core:new-theme jpn sakura light #FF69B4`
- `/core:new-theme mnml sunset dark @~/sunset.jpg`

**Key point:** $ARGUMENTS is freetext - work conversationally to understand what the user wants rather than expecting rigid structure.

**Key considerations:**

- **Interactive questions**: Use the AskUserQuestion tool for all structured questions (collection selection, palette choice, refinement options, confirmations)
- **Color system**: Always use OKLCH color space via `oklch()` for color definitions
- **Image palette extraction**: Use `extractPaletteFromImage()` utility for reference images
- **Palette refinement**: Allow user to adjust hue/chroma/lightness after selection
- **mnml collection**: Use accent abstraction system with a10, a20, a30, a40 tokens
- **Other collections**: Follow existing patterns in that collection
- **Code style**: No comments in theme definitions, maintain clean code
- **Semantic mapping**: Use grayscale base with strategic accent placement
- **TypeScript validation**: Always run `deno task check` before generating adapters
- **Alphabetical order**: Maintain alphabetical order in adapter configurations
- **Commit messages**: Use semantic format with collection scope (e.g., `feat(mnml): add sunset theme`)
- **Testing**: Verify generated themes have no undefined values before committing
