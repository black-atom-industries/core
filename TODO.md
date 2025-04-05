# Black Atom Core TODOs

## Collection-based Templates

_Created: April 5, 2025_

Currently, each theme has its own template file, even though templates within a collection are identical. We'll update the system to use collection-based templates instead.

### Schema Changes

- [ ] Update `adapter.schema.json` to add collection-based template structure
- [ ] Modify `src/lib/validate-adapter.ts` to support new schema with collections

### Core Code Changes

- [ ] Update `src/lib/template.ts` to handle collection templates
- [ ] Add collection-to-theme mapping functionality
- [ ] Modify theme processing to use collection templates

### Migration

- [ ] Create collection template files for each theme family (jpn, crbn, etc.)
- [ ] Update all adapter configuration files (nvim, zed, wezterm, etc.)
- [ ] Test with full adaptation process

### Cleanup

- [ ] Remove redundant theme-specific template files
- [ ] Update documentation in ADAPTER_DEVELOPMENT.md

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

