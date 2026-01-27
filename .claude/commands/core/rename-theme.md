---
description: "Rename a theme across all repositories with systematic file updates and commits"
allowed-tools: ["Read", "Edit", "Write", "MultiEdit", "Bash", "Glob", "Grep"]
---

You are renaming a theme across the Black Atom theme project. This requires coordinated changes across the core repository and all adapter repositories.

**Theme adapter repositories:** nvim, ghostty, zed, wezterm, tmux
**Non-theme repositories to exclude:** radar.nvim, adapter-template, claude, obsidian, website

**Your task:**

1. **Parse user requirements** from $ARGUMENTS or conversation:
   - Old theme key (e.g., "black-atom-mnml-eink")
   - New theme key (e.g., "black-atom-mnml-mono")
   - Collection name (mnml, jpn, stations, terra, north)
   - Confirm the change with user before proceeding

2. **Update core repository files**:
   - Rename theme definition file in `src/themes/{collection}/`
   - Update `src/types/theme.ts`:
     - Update theme key in `themeKeys` array
     - Update label in `Meta.label` union type
   - Update `src/themes/bundle.ts`:
     - Update import statement for renamed theme
     - Update key in `themeBundle` object
   - Run `deno task check` to verify TypeScript is valid

3. **Update adapter configurations**:
   - For each adapter repository (nvim, ghostty, zed, wezterm, tmux):
     - Read `black-atom-adapter.json`
     - Rename theme key in the configuration
     - For nvim: Also rename the colorscheme loader file in `colors/` directory

4. **Generate and verify**:
   - Generate all adapters: `deno task adapters:gen`
   - Verify no undefined values in generated output
   - Check that old theme files are removed and new ones created

5. **Commit changes**:
   - Present proposed commit messages to user:
     - Core: `refactor({collection}): rename {old-name} theme to {new-name}`
     - Adapters: `refactor({collection}): rename {old-name} theme to {new-name}`
   - Wait for user approval
   - Commit core repository
   - Use ford to commit all adapter repositories
   - Push all repositories

6. **Summary**:
   - List all files renamed
   - List all files updated
   - Confirm successful commit and push

**Usage examples:**

- `/core:rename-theme black-atom-mnml-eink black-atom-mnml-mono`
- `/core:rename-theme black-atom-jpn-sakura black-atom-jpn-cherry`

**Expected $ARGUMENTS format:**
`{old-theme-key} {new-theme-key}`

Where:

- `old-theme-key`: Current full theme key (e.g., black-atom-mnml-eink)
- `new-theme-key`: New full theme key (e.g., black-atom-mnml-mono)

**Key considerations:**

- Always confirm the rename operation with user before proceeding
- Verify TypeScript types are updated correctly
- Ensure all adapter configurations are consistent
- Check that generated files use the new name
- Old theme files should be deleted after new ones are created
- For nvim adapter, remember to rename the colorscheme loader file in `colors/`
- Use semantic commit messages with the collection name in scope
