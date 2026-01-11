---
description: "Link Black Atom themes to Nik's dotfiles via theme-link.sh"
allowed-tools: ["Bash", "Read", "Edit"]
---

After generating themes with Black Atom adapters, link them to your dotfiles for use.

**Dotfiles repo:** `~/repos/nikbrunner/dots`
**Theme linker:** `~/repos/nikbrunner/dots/scripts/theme-link.sh`

## Important: Relative Symlinks

The script creates **relative symlinks**, not absolute ones. This is critical because:
- Dotfiles are portable across machines
- Paths work regardless of home directory location
- Symlinks remain valid when dots repo is cloned elsewhere

Example symlink structure:
```
dots/arch/.config/waybar/themes/black-atom-terra-winter-night.css
  -> ../../../../../black-atom-industries/waybar/themes/black-atom-terra-winter-night.css
```

## Current Adapter Mappings

| Adapter  | Extension | Dots Target                          |
|----------|-----------|--------------------------------------|
| ghostty  | conf      | common/.config/ghostty/themes        |
| wezterm  | toml      | common/.config/wezterm/colors        |
| zed      | json      | common/.config/zed/themes            |
| niri     | kdl       | arch/.config/niri/themes             |
| waybar   | css       | arch/.config/waybar/themes           |

## Usage

**Dry run (preview changes):**
```bash
~/repos/nikbrunner/dots/scripts/theme-link.sh --dry-run
```

**Apply symlinks:**
```bash
~/repos/nikbrunner/dots/scripts/theme-link.sh
```

## Adding a New Adapter

When a new Black Atom adapter is created, update `theme-link.sh`:

1. Open `~/repos/nikbrunner/dots/scripts/theme-link.sh`
2. Add a new `process_adapter` call at the end:
   ```bash
   process_adapter "<adapter-name>" "<file-extension>" "<dots-target-path>"
   ```
3. Run with `--dry-run` to verify
4. Run without flag to apply

## After Linking

1. Verify symlinks are relative: `ls -la ~/repos/nikbrunner/dots/<target-path>/`
2. Commit dots changes if desired
3. Configure your application to use the themed file
