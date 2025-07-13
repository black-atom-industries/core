# Theme/Collection Rename Migration

This guide helps you rename themes or collections across the entire Black Atom ecosystem.

## Prerequisites

- All repositories cloned as siblings
- Clean git status in all repos
- Core CLI installed globally

## Steps for Renaming a Collection (e.g., Nord → North)

### 1. Plan the Rename

Document what you're changing:

- Old name: `nord`
- New name: `north`
- Affected themes: List all theme keys
- Label format: Define new label pattern

### 2. Core Repository Updates

```bash
cd core
```

#### a. Rename directory

```bash
mv src/themes/nord src/themes/north
```

#### b. Rename theme files

```bash
cd src/themes/north
mv black-atom-nord-night.ts black-atom-north-night.ts
mv black-atom-nord-dark-night.ts black-atom-north-dark-night.ts
mv black-atom-nord-day.ts black-atom-north-day.ts
```

#### c. Update theme files

In each theme file, update:

- `key`: "black-atom-nord-night" → "black-atom-north-night"
- `label`: "Black Atom — NRD ∷ Night" → "Black Atom — NORTH ∷ Night"
- `collection.key`: "nord" → "north"
- `collection.label`: "NORD" → "NORTH"

#### d. Update configuration files

`src/types/theme.ts`:

```typescript
// Update themeKeys array
"black-atom-north-night",  // was nord
"black-atom-north-dark-night",
"black-atom-north-day",

// Update CollectionKey type
type CollectionKey = "crbn" | "terra" | "jpn" | "stations" | "north";

// Update Meta label union
| "Black Atom — NORTH ∷ Night"
| "Black Atom — NORTH ∷ Dark Night"  
| "Black Atom — NORTH ∷ Day"
```

`src/config.ts`:

```typescript
// Update themePathMap
"black-atom-north-night": "./themes/north/black-atom-north-night",
"black-atom-north-dark-night": "./themes/north/black-atom-north-dark-night",
"black-atom-north-day": "./themes/north/black-atom-north-day",
```

`src/lib/validate-adapter.ts`:

```typescript
// Update collection entries
north: collectionConfigSchema,  // was nord
```

### 3. Test Core Changes

```bash
# Type check must pass
deno task check

# Regenerate schema
deno task schema

# Test theme loading
deno run --allow-read src/lib/theme-loader.ts
```

### 4. Update Each Adapter

For each adapter (nvim, wezterm, ghostty, zed):

#### a. Update adapter configuration

```json
{
    "collections": {
        "north": { // was "nord"
            "template": "./themes/north/collection.template.ext",
            "themes": [
                "black-atom-north-night",
                "black-atom-north-dark-night",
                "black-atom-north-day"
            ]
        }
    }
}
```

#### b. Rename directories and files

```bash
# Example for nvim
cd nvim
mv lua/black-atom/themes/nord lua/black-atom/themes/north
mv colors/black-atom-nord-night.lua colors/black-atom-north-night.lua
# ... repeat for all files
```

### 5. Generate All Adapters

```bash
cd core
deno task dev:adapters:generate
```

## Testing the Migration

### 1. Verify File Structure

```bash
# Check all files renamed
find . -name "*nord*" -type f  # Should return nothing
find . -name "*north*" -type f # Should list new files
```

### 2. Test in Each Application

#### Terminal (WezTerm/Ghostty)

```bash
# WezTerm - check theme list
wezterm ls-fonts --list-system  # Restart and check theme picker

# Ghostty - edit config
theme = themes/north/black-atom-north-night
```

#### Neovim

```vim
:colorscheme black-atom-north-night
" Should load without errors
" Check :messages for any issues
```

#### Zed

- Open settings
- Search for "Black Atom — NORTH"
- Verify all variants appear

### 3. Visual Verification

Create test files to verify colors:

```bash
# Create a test script with various colors
cat > test-colors.sh << 'EOF'
#!/bin/bash
echo -e "\033[0;30mBlack\033[0m"
echo -e "\033[0;31mRed\033[0m"
echo -e "\033[0;32mGreen\033[0m"
echo -e "\033[0;33mYellow\033[0m"
echo -e "\033[0;34mBlue\033[0m"
echo -e "\033[0;35mMagenta\033[0m"
echo -e "\033[0;36mCyan\033[0m"
echo -e "\033[0;37mWhite\033[0m"
EOF

chmod +x test-colors.sh
./test-colors.sh
```

### 4. Git Verification

```bash
# Check nothing references old name
git grep -i "nord" --exclude-dir=node_modules
```

## Commit Strategy

### Option 1: Single Coordinated Commit

```bash
# Commit all repos with the same message
cd core
git add -A
git commit -m "feat: rename Nord to North theme collection"

cd ../nvim  
git add -A
git commit -m "feat: add North theme collection"
# ... repeat for each adapter
```

### Option 2: Staged Migration

1. Commit core changes first
2. Push and verify
3. Update adapters one by one
4. Test between each update

## Common Issues

### Type Errors

- Ensure all references updated in types
- Check CollectionKey type includes new name
- Verify no old imports remain

### Missing Files

- Check git status for untracked files
- Ensure directories renamed, not just copied
- Verify template files updated

### Theme Not Found

- Clear editor caches
- Restart applications
- Check exact spelling/casing

### Broken Imports

```typescript
// Find and update all imports
import theme from "./themes/north/..."; // was nord
```

## Rollback Plan

If something goes wrong:

```bash
# In each repo
git reset --hard HEAD~1  # Undo last commit
git checkout -- .        # Discard changes

# Or restore from remote
git fetch origin
git reset --hard origin/main
```

## Final Checklist

- [ ] All files renamed (no references to old name)
- [ ] Type checking passes
- [ ] Schema regenerated
- [ ] All adapters updated
- [ ] Themes load correctly in each application
- [ ] Colors display properly
- [ ] Git history clean
- [ ] Documentation updated (if any)
- [ ] README files updated (if mentioned)
