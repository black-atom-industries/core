# Creating a New Theme Collection

This guide walks you through creating an entirely new theme collection for Black Atom.

## Prerequisites

- Understanding of Black Atom theme structure
- Color theory knowledge
- Defined collection concept/philosophy

## Planning Your Collection

### 1. Define Collection Identity

Before coding, establish:

- **Name**: Short, memorable (e.g., "terra", "stations")
- **Concept**: What inspires this collection?
- **Variants**: How many themes? Light/dark?
- **Label Format**: e.g., "Black Atom — TER ∷ Spring Day"

### 2. Design Color Philosophy

Each collection should have consistent color principles:

- Stations: Tech/space, high contrast
- Terra: Natural earth tones, seasonal
- JPN: Japanese aesthetics, subtle
- CRBN: Minimal, monochromatic

## Implementation Steps

### 1. Create Collection Directory

```bash
cd core/src/themes
mkdir mycollection  # Use your collection name
```

### 2. Create Shared Components

Collections share UI and syntax definitions between themes.

#### Create UI Components

`src/themes/mycollection/ui_dark.ts`:

```typescript
import * as Theme from "../../types/theme.ts";

export default function ui_dark(
    primaries: Theme.Primaries,
    palette: Theme.Palette,
): Theme.UI {
    return {
        bg: {
            default: primaries.d10, // Main background
            panel: primaries.d20, // Sidebars, status bar
            float: primaries.d30, // Popups, modals
            active: primaries.d30, // Current line
            disabled: primaries.d20, // Disabled elements
            hover: primaries.d40, // Hover states
            selection: primaries.m30, // Text selection
            search: palette.yellow, // Search highlights
            contrast: primaries.d10, // High contrast areas
            // ... complete all bg properties
        },
        fg: {
            default: primaries.l30, // Main text
            subtle: primaries.m40, // Comments, subdued
            accent: palette.blue, // Primary accent
            disabled: primaries.m20, // Disabled text
            contrast: primaries.l40, // High contrast text
            // ... complete all fg properties
        },
    };
}
```

`src/themes/mycollection/ui_light.ts`:

```typescript
// Similar structure but with inverted colors
export default function ui_light(
    primaries: Theme.Primaries,
    palette: Theme.Palette,
): Theme.UI {
    return {
        bg: {
            default: primaries.l40, // Light background
            panel: primaries.l30,
            // ... adjust for light theme
        },
        fg: {
            default: primaries.d20, // Dark text on light
            // ... adjust for light theme
        },
    };
}
```

#### Create Syntax Components

`src/themes/mycollection/syntax_dark.ts`:

```typescript
import * as Theme from "../../types/theme.ts";

export default function syntax_dark(
    primaries: Theme.Primaries,
    palette: Theme.Palette,
): Theme.Syntax {
    return {
        variable: {
            default: primaries.l30,
            builtin: palette.blue,
            parameter: palette.cyan,
            member: primaries.l20,
        },
        string: {
            default: palette.green,
            doc: palette.darkGreen,
            regexp: palette.yellow,
            escape: palette.cyan,
        },
        // ... complete all syntax categories
    };
}
```

### 3. Create Your First Theme

`src/themes/mycollection/black-atom-mycollection-example.ts`:

```typescript
import * as Theme from "../../types/theme.ts";
import syntax_dark from "./syntax_dark.ts";
import ui_dark from "./ui_dark.ts";

const meta: Theme.Meta = {
    key: "black-atom-mycollection-example",
    label: "Black Atom — MYC ∷ Example",
    appearance: "dark",
    status: "development",
    collection: {
        key: "mycollection",
        label: "MYCOLLECTION",
    },
};

const primaries: Theme.Primaries = {
    // Your 16-step gradient
    d10: "#0a0a0a",
    d20: "#141414",
    d30: "#1e1e1e",
    d40: "#282828",

    m10: "#323232",
    m20: "#3c3c3c",
    m30: "#464646",
    m40: "#505050",

    l10: "#5a5a5a",
    l20: "#646464",
    l30: "#6e6e6e",
    l40: "#787878",
};

const palette: Theme.Palette = {
    // Your 16 ANSI colors
    black: primaries.d10,
    gray: primaries.m20,
    // ... define all colors
};

const theme: Theme.Definition = {
    meta,
    primaries,
    palette,
    ui: ui_dark(primaries, palette),
    syntax: syntax_dark(primaries, palette),
};

export default theme;
```

### 4. Update Core Configuration

#### Update Types

`src/types/theme.ts`:

```typescript
// Add to themeKeys
"black-atom-mycollection-example",

// Add to CollectionKey
type CollectionKey = "crbn" | "terra" | "jpn" | "stations" | "north" | "mycollection";

// Add to Meta labels
| "Black Atom — MYC ∷ Example"
```

#### Update Config

`src/config.ts`:

```typescript
// Add to themePathMap
"black-atom-mycollection-example": "./themes/mycollection/black-atom-mycollection-example",
```

#### Update Validator

`src/lib/validate-adapter.ts`:

```typescript
// Add to collectionEntries
mycollection: collectionConfigSchema,
```

### 5. Test Core Integration

```bash
# Must pass without errors
deno task check

# Regenerate schema
deno task schema

# Test theme loading
deno task dev:adapters:generate
```

## Testing Your Collection

### 1. Visual Consistency Test

Create a test file with all themes from your collection:

```bash
# Generate all adapters
deno task dev:adapters:generate

# Test in Neovim
cd ../nvim
nvim test.ts

# Cycle through your themes
:colorscheme black-atom-mycollection-theme1
:colorscheme black-atom-mycollection-theme2
# Check visual consistency
```

### 2. Color Harmony Test

```typescript
// Create a color test file
const colors = {
    primaries: ["#0a0a0a", "#141414" /*...*/],
    palette: {
        red: "#ff5555",
        green: "#50fa7b",
        // ...
    },
};

// Use a color harmony checker
// Ensure colors work well together
```

### 3. Accessibility Test

- Check contrast ratios (WCAG AA minimum)
- Test with colorblind simulators
- Verify readability in different lighting

### 4. Cross-Platform Test

Test in each adapter:

#### Terminal

```bash
# Test ANSI colors
for i in {0..15}; do
    echo -en "\e[48;5;${i}m  \e[0m "
done
echo

# Test with common tools
ls --color=always
git diff
htop
```

#### Editors

- Neovim: Syntax highlighting, UI elements
- Zed: Theme picker, integrated terminal
- VS Code (if adapter exists): Full IDE experience

### 5. Edge Case Testing

Test with:

- Very long lines
- Dense code (minified JS)
- Multiple cursors
- Split panes
- Different file types (.md, .json, .yaml)

## Adding to Adapters

### 1. Create Templates

For each adapter, create collection template:

`nvim/lua/black-atom/themes/mycollection/collection.template.lua`:

```lua
local M = {}

M.meta = {
    key = "<%= theme.meta.key %>",
    label = "<%= theme.meta.label %>",
    -- ...
}

-- Template structure for nvim
return M
```

### 2. Update Adapter Configs

In each adapter's `black-atom-adapter.json`:

```json
{
    "collections": {
        "mycollection": {
            "template": "./themes/mycollection/collection.template.ext",
            "themes": [
                "black-atom-mycollection-example"
            ]
        }
    }
}
```

## Best Practices

### Color Selection

1. Start with primaries (16-step gradient)
2. Build palette from primaries where possible
3. Test colors together, not in isolation
4. Consider color meaning (red=error, green=success)

### Naming Conventions

- Collection key: lowercase, no spaces
- Theme key: `black-atom-{collection}-{variant}`
- Label: `Black Atom — {COL} ∷ {Variant}`

### Development Workflow

1. Create one complete theme first
2. Extract common patterns to shared components
3. Build additional variants
4. Test as a cohesive set

## Debugging Issues

### Type Errors

```bash
# Check exact error
deno task check

# Common fixes:
# - Ensure all keys are unique
# - Check CollectionKey type updated
# - Verify imports are correct
```

### Generation Failures

```bash
# Check adapter logs
deno task dev:adapters:generate

# Verify template syntax
# Check file permissions
# Ensure directories exist
```

### Visual Problems

- Screenshot and compare
- Check color picker values
- Test in different environments
- Get feedback from others

## Publishing Checklist

- [ ] All themes have consistent style
- [ ] Shared components are well-organized
- [ ] Type checking passes
- [ ] All adapters generate correctly
- [ ] Tested in all target applications
- [ ] Documentation is complete
- [ ] Screenshots/previews created
- [ ] Status set to "release" when ready
