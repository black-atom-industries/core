# Black Atom Color Token System

This document explains the color token system used across Black Atom Industries theme collections. The token system provides a consistent and semantic approach to color definitions, ensuring themes maintain visual harmony while allowing for creative expression.

## Core Principles

The Black Atom color system is built on these principles:

1. **Semantic naming** - Colors are named by their function, not their visual appearance
2. **Structured gradients** - Colors follow a predictable scale from darkest to lightest
3. **Shared components** - UI and syntax definitions share common patterns across themes
4. **Consistency across platforms** - The same tokens create consistent experiences across applications

## Primaries Structure

At the heart of every Black Atom theme is the `primaries` object - a structured set of 12 color tokens organized into three ranges:

```typescript
interface Primaries {
    /* Dark range */
    d10: HexColor; // Darkest
    d20: HexColor;
    d30: HexColor;
    d40: HexColor; // Transition to medium

    /* Middle range */
    m10: HexColor; // Mid-dark
    m20: HexColor;
    m30: HexColor;
    m40: HexColor; // Transition to high

    /* Light range */
    l10: HexColor; // Light
    l20: HexColor;
    l30: HexColor;
    l40: HexColor; // Brightest
}
```

This 12-color gradient system creates a full spectrum from darkest (d10) to brightest (l40), providing the foundation for all theme components.

### Range Guidelines

- **Dark range (d10-d40)**:
  - In dark themes: Used for backgrounds, panels, and UI containers
  - In light themes: Used for text, borders, and accents
  - d10 is typically the darkest background in dark themes

- **Middle range (m10-m40)**:
  - Used for mid-tone elements like inactive UI, borders, and secondary content
  - Provides transition colors between dark and light ranges
  - Often contains subtle color tinting to establish theme identity

- **Light range (l10-l40)**:
  - In dark themes: Used for text, icons, and highlights
  - In light themes: Used for backgrounds, panels, and UI containers
  - l40 is typically the brightest background in light themes

## UI Component

The UI component defines colors for user interface elements, separated into background and foreground categories with semantic naming:

```typescript
interface UITheme {
    bg: {
        default: HexColor; // Default background
        panel: HexColor; // Panels, sidebars
        float: HexColor; // Floating UI (popups, tooltips)
        selection: HexColor; // Selected text background
        active: HexColor; // Active line/item
        inactive: HexColor; // Inactive areas
        hover: HexColor; // Hover state
        border: HexColor; // Borders
        // Status colors
        positive: HexColor; // Success states
        negative: HexColor; // Error states
        warn: HexColor; // Warning states
        info: HexColor; // Info states
        hint: HexColor; // Hint states
    };
    fg: {
        default: HexColor; // Default text
        subtle: HexColor; // Secondary text
        muted: HexColor; // Tertiary/disabled text
        accent: HexColor; // Emphasized text
        // Status colors
        positive: HexColor; // Success text
        negative: HexColor; // Error text
        warn: HexColor; // Warning text
        info: HexColor; // Info text
        hint: HexColor; // Hint text
    };
}
```

### UI Pattern Guidelines

- Dark themes typically use:
  - Dark range (d10-d40) for backgrounds
  - Light range (l10-l40) for text
  - Middle range (m10-m40) for borders and inactive elements

- Light themes typically use:
  - Light range (l10-l40) for backgrounds
  - Dark range (d10-d40) for text
  - Middle range (m10-m40) for borders and inactive elements

## Syntax Component

The syntax component defines colors for syntax highlighting, organized by language constructs:

```typescript
interface SyntaxTheme {
    base: {
        text: HexColor; // Default text
        punctuation: HexColor; // Punctuation marks
        comment: HexColor; // Comments
        constant: HexColor; // Constants and literals
        string: HexColor; // String literals
        variable: HexColor; // Variables
        keyword: HexColor; // Keywords
        function: HexColor; // Functions
        operator: HexColor; // Operators
        property: HexColor; // Properties
        tag: HexColor; // Tags (HTML, XML)
        markup: {
            heading: HexColor; // Markdown headings
            list: HexColor; // Markdown lists
            bold: HexColor; // Bold text
            italic: HexColor; // Italic text
            quote: HexColor; // Blockquotes
            link: HexColor; // Links
        };
    };
    syntax: {
        // Specific language syntax elements
        added: HexColor; // Added code (git diff)
        deleted: HexColor; // Deleted code (git diff)
        changed: HexColor; // Changed code (git diff)
    };
}
```

### Syntax Pattern Guidelines

- Use primaries and palette colors consistently for syntax elements
- Maintain readability through adequate contrast
- Emphasize important language constructs (functions, keywords)
- Use subtle variations for related constructs (variables vs. properties)

## Terminal Palette

Each theme includes a 16-color ANSI terminal palette mapping:

```typescript
interface Palette {
    black: HexColor; // ANSI 0
    red: HexColor; // ANSI 1
    green: HexColor; // ANSI 2
    yellow: HexColor; // ANSI 3
    blue: HexColor; // ANSI 4
    magenta: HexColor; // ANSI 5
    cyan: HexColor; // ANSI 6
    white: HexColor; // ANSI 7
    brightBlack: HexColor; // ANSI 8
    brightRed: HexColor; // ANSI 9
    brightGreen: HexColor; // ANSI 10
    brightYellow: HexColor; // ANSI 11
    brightBlue: HexColor; // ANSI 12
    brightMagenta: HexColor; // ANSI 13
    brightCyan: HexColor; // ANSI 14
    brightWhite: HexColor; // ANSI 15
}
```

### Palette Guidelines

- Black/brightBlack should align with dark range (d10-d30)
- White/brightWhite should align with light range (l10-l40)
- Color selections should complement the primaries and maintain theme cohesion
- Bright variants should be distinct but related to their base colors

## Creating New Themes

When creating a new theme, follow these steps to ensure compatibility with the token system:

1. **Choose a collection** (or create a new one)
2. **Define your primaries spectrum** (d10-d40, m10-m40, l10-l40)
   - Start with the darkest (d10) and lightest (l40) colors
   - Fill in gradients for a smooth progression
   - Ensure adequate contrast between ranges
3. **Create your terminal palette** to complement your primaries
4. **Import or create UI components** that map primaries to semantic UI elements
5. **Import or create syntax components** that map primaries to syntax highlighting
6. **Test across platforms** using adapter repositories

### Color Selection Tips

- Start with the core identity colors (accent, primary tones)
- Use color theory principles (complementary, analogous, monochromatic)
- Test for accessibility and contrast
- Create both dark and light variants for complete theme sets
- Maintain consistency within collections while expressing theme identity

## Adapter Usage

When creating adapter templates for specific platforms, reference theme tokens using the Eta template syntax:

```
// Background colors
background: <%= theme.ui.bg.default %>,
panels: <%= theme.ui.bg.panel %>,
selection: <%= theme.ui.bg.selection %>,

// Foreground colors
foreground: <%= theme.ui.fg.default %>,
comments: <%= theme.syntax.base.comment %>,
strings: <%= theme.syntax.base.string %>,
```

This ensures consistent color application across all platform-specific adaptations.

## Future Directions

The color token system is designed to be extensible. Future enhancements may include:

- Expanded semantic color sets for specialized domains
- Color manipulation utilities (lighten, darken, alpha)
- Contrast ratio validation
- Additional metadata for color purpose and relationships

## Troubleshooting

If you encounter issues with color representation:

- Ensure HexColor values use the correct format (#RRGGBB)
- Verify token references match the current structure
- Check for typos in property names
- Validate adapter templates reference the correct token paths
