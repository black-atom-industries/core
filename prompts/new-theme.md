# Creating a New Theme

This guide walks you through creating a new theme for an existing Black Atom collection.

## Prerequisites

- Core repository cloned and set up
- Deno installed
- Understanding of the Black Atom color system (primaries, palette, UI, syntax)

## Steps

### 1. Choose Your Collection

Decide which collection your theme belongs to:
- `stations` - Space station inspired themes
- `jpn` - Japanese inspired themes  
- `terra` - Earth seasons inspired themes
- `crbn` - Carbon minimal themes
- `north` - Nordic inspired themes

### 2. Create Theme File

Create a new TypeScript file in the collection directory:

```bash
# Example for a new stations theme
touch src/themes/stations/black-atom-stations-science.ts
```

### 3. Define Theme Structure

```typescript
import * as Theme from "../../types/theme.ts";
import syntax_dark from "./syntax_dark.ts";  // or syntax_light
import ui_dark from "./ui_dark.ts";          // or ui_light

const meta: Theme.Meta = {
    key: "black-atom-stations-science",
    label: "Black Atom — STA ∷ Science",  // Follow collection pattern
    appearance: "dark",                    // or "light"
    status: "development",                 // Start with development
    collection: {
        key: "stations",
        label: "STATIONS",
    },
};

const primaries: Theme.Primaries = {
    // Define your 16-color gradient from dark to light
    d10: "#000000",  // Darkest
    d20: "#111111",
    d30: "#222222",
    d40: "#333333",
    
    m10: "#444444",  // Mid-dark
    m20: "#555555",
    m30: "#666666",
    m40: "#777777",
    
    l10: "#888888",  // Light
    l20: "#999999",
    l30: "#AAAAAA",
    l40: "#BBBBBB",  // Lightest
};

const palette: Theme.Palette = {
    // Map ANSI colors - use primaries or custom colors
    black: primaries.d20,
    gray: primaries.m20,
    
    darkRed: "#AA0000",
    red: "#FF0000",
    
    darkGreen: "#00AA00",
    green: "#00FF00",
    
    // ... complete all 16 colors
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),      // Use shared UI
    syntax: syntax_dark(primaries, palette), // Use shared syntax
};

export default theme;
```

### 4. Add Theme to Configuration

Update `src/config.ts`:

```typescript
// Add to themeKeys array
"black-atom-stations-science",

// Add to themePathMap
"black-atom-stations-science": "./themes/stations/black-atom-stations-science",
```

Update `src/types/theme.ts`:

```typescript
// Add to themeKeys const
"black-atom-stations-science",

// Add to Meta label union type
| "Black Atom — STA ∷ Science"
```

### 5. Generate and Test

```bash
# Type check
deno task check

# Generate schema
deno task schema

# Generate adapters
deno task dev:adapters:generate
```

## Testing Your Theme

### 1. Terminal Testing (WezTerm/Ghostty)

```bash
# For WezTerm
cd ../wezterm
# Edit your wezterm config to use the new theme
# Look for the generated file in themes/stations/

# For Ghostty  
cd ../ghostty
# Set theme in Ghostty config
# theme = themes/stations/black-atom-stations-science
```

Test with:
- `ls -la` with colorized output
- `git diff` to see diff colors
- Run `htop` or `btop` for UI elements
- SSH into a server to test remote colors

### 2. Neovim Testing

```bash
cd ../nvim

# In Neovim, run:
:colorscheme black-atom-stations-science

# Test with various file types:
# - Open .ts, .js files for syntax highlighting
# - Open .md files for markdown
# - Use telescope/fzf for UI elements
# - Check git gutter signs
# - Test with LSP diagnostics
```

### 3. Zed Testing

```bash
cd ../zed
# Open Zed settings
# Select your theme from the theme picker
# It will appear as "Black Atom — STA ∷ Science"
```

Test with:
- Multiple file types
- Terminal integration
- Git diff view
- Command palette

### 4. Visual Testing Checklist

- [ ] Background/foreground contrast is readable
- [ ] All syntax colors are distinguishable
- [ ] Selection highlight is visible
- [ ] Cursor is clearly visible
- [ ] Comments are readable but subdued
- [ ] Errors/warnings stand out appropriately
- [ ] Git diff colors (add/delete/modify) are clear
- [ ] Terminal colors work well together
- [ ] UI elements (borders, panels) are subtle but visible

### 5. Automated Testing

```bash
# Run core tests
deno task check
deno task lint
deno task format

# Check all adapters generated correctly
deno task dev:adapters:status
```

## Color Selection Tips

1. **Maintain Consistency**: Follow the collection's color philosophy
2. **Test Contrast**: Ensure sufficient contrast (WCAG AA minimum)
3. **Color Harmony**: Use a color wheel or palette generator
4. **Accessibility**: Test with color blindness simulators
5. **Real-World Testing**: Use the theme for actual work for a few hours

## Common Issues

### Type Errors
- Ensure all required properties are defined
- Check hex color format (must include #)
- Verify theme key matches everywhere

### Generation Errors  
- Run `deno task check` first
- Ensure no duplicate theme keys
- Check adapter configurations are valid

### Visual Issues
- Adjust primaries for better contrast
- Tweak palette colors for syntax clarity
- Test in both light and dark environments

## Final Steps

1. Change status from "development" to "beta"
2. Use theme for a week of regular work
3. Get feedback from others
4. Change status to "release" when ready
5. Create PR with your new theme