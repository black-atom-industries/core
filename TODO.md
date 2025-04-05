# Black Atom Core TODOs

## Collection-based Templates

_Created: April 5, 2025_

Currently, each theme has its own template file, even though templates within a collection are identical. We'll update the system to use collection-based templates instead.

### Schema Changes

- [x] Update `adapter.schema.json` to add collection-based template structure
- [x] Modify `src/lib/validate-adapter.ts` to support new schema with collections

### Core Code Changes

- [x] Update `src/lib/template.ts` to handle collection templates
- [x] Add collection-to-theme mapping functionality
- [x] Modify theme processing to use collection templates

### Migration

- [x] Create collection template files for each theme family (jpn, crbn, etc.)
- [x] Update nvim adapter configuration to use collection templates (as a test case)
- [x] Test with full adaptation process

### Cleanup

- [x] Update documentation in ADAPTER_DEVELOPMENT.md
- [x] Migrate other adapters (zed, wezterm, etc.) to use collection templates
  - [x] zed
  - [x] wezterm
  - [x] ghostty
  - [x] obsidian
- [ ] Remove redundant theme-specific template files after all adapters are migrated

## Proposed Structure

```json
{
  "$schema": "...",
  "collections": {
    "jpn": {
      "template": "lua/black-atom/themes/jpn/collection.template.lua",
      "themes": [
        "black-atom-jpn-koyo-yoru",
        "black-atom-jpn-tsuki-yoru",
        "black-atom-jpn-koyo-hiru",
        "black-atom-jpn-murasaki-yoru"
      ]
    },
    "crbn": {
      "template": "lua/black-atom/themes/crbn/collection.template.lua",
      "themes": ["black-atom-crbn-null", "black-atom-crbn-supr"]
    }
    // ... other collections
  }
}
```

