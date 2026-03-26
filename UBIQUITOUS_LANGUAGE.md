# Ubiquitous Language

## Theme Structure

| Term | Definition | Aliases to avoid |
|-|-|
| **Theme** | A complete visual definition for one appearance variant, composed of metadata, primaries, palette, UI colors, and syntax colors | Colorscheme, scheme, skin |
| **Theme Key** | Unique identifier string for a theme (e.g., `black-atom-terra-winter-night`) | ID, slug, theme name |
| **Theme Definition** | The TypeScript object (`ThemeDefinition`) representing a complete theme — metadata plus all color groups | Theme config, theme data |
| **Appearance** | Whether a theme is `"light"` or `"dark"` | Mode, variant, brightness |
| **Status** | A theme's maturity level: `"development"`, `"beta"`, or `"release"` | Stage, phase |

## Collections

| Term               | Definition                                                                                           | Aliases to avoid               |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Collection**     | A named group of thematically related themes sharing a design concept (e.g., `jpn`, `terra`, `mnml`) | Category, family, group        |
| **Collection Key** | The string identifier for a collection: `"default"`, `"stations"`, `"jpn"`, `"terra"`, `"mnml"`      | Collection name, collection ID |

## Color Groups

| Term          | Definition                                                                                                                                                  | Aliases to avoid                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Primaries** | A 12-color gradient scale spanning dark-to-light, organized as d10-d40 (dark), m10-m40 (mid), l10-l40 (light) — the foundation all other colors derive from | Base colors, scale, gradient                 |
| **Palette**   | A 16-color ANSI terminal color set (black, red, green, yellow, blue, magenta, cyan, white + dark variants) derived from primaries                           | Terminal colors, ANSI colors                 |
| **Feedback**  | Four semantic status colors: `negative`, `success`, `info`, `warning` — represent application state, orthogonal to primaries                                | Status colors, state colors, semantic colors |
| **Accents**   | A minimal emphasis scale (a10-a40) used primarily by the MNML collection to add color without a full palette                                                | Highlights, emphasis colors                  |

## Derived Color Layers

| Term                      | Definition                                                                                                                                                                  | Aliases to avoid                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **UI Colors**             | Semantic background and foreground tokens for interface elements (default, panel, float, active, disabled, hover, selection, search, contrast, plus feedback-mapped states) | Theme tokens, design tokens     |
| **Syntax Colors**         | Color assignments for code highlighting categories (variable, string, keyword, type, comment, etc.)                                                                         | Highlight colors, editor colors |
| **Theme Creator Options** | The input structure (`{primaries, palette, feedback, accents}`) passed to UI and syntax creation functions                                                                  | Creator config, color inputs    |

## Adapter & Generation Pipeline

| Term               | Definition                                                                                                                                | Aliases to avoid               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Adapter**        | A platform-specific repository that consumes Black Atom themes and generates output files for that platform (e.g., Zed, Neovim, Obsidian) | Plugin, extension, integration |
| **Adapter Config** | The `black-atom-adapter.json` file in an adapter repo that declares its collections, templates, and optional post-generation commands     | Manifest, config file          |
| **Template**       | An Eta template file (`.template.{ext}`) in an adapter repo that receives a `ThemeDefinition` and produces platform-specific output       | Eta file, template file        |
| **Generated File** | The output artifact produced by rendering a template with theme data — the file end-users consume                                         | Output, artifact, built file   |
| **postGenerate**   | An optional shell command in adapter config that runs after template rendering (e.g., formatting, building)                               | Post-hook, after-generate      |

## Color Utilities

| Term         | Definition                                                                                                                       | Aliases to avoid        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **HexColor** | The constrained color type used throughout the system: a hex string in `#rrggbb` or `#rrggbbaa` format                           | Color string, hex value |
| **tint()**   | The primary color derivation function: blends a base color toward a target color by a specified amount using OKLCH interpolation | Mix, blend, interpolate |
| **oklch()**  | Utility that converts an OKLCH color-space value to a HexColor                                                                   | Color convert           |

## Metadata

| Term                | Definition                                                                                             | Aliases to avoid         |
| ------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------ |
| **Theme Meta**      | Metadata attached to a theme: key, name, label, appearance, status, collection                         | Header, info, properties |
| **Theme Meta Base** | The author-defined subset of metadata — excludes computed fields like `label`                          | Raw meta, base meta      |
| **Label**           | A computed display string combining theme name and collection, derived at runtime from `ThemeMetaBase` | Display name, title      |
| **Name**            | The human-readable short name for a theme (e.g., "Winter Night")                                       | Title, display name      |

## Relationships

- A **Collection** contains one or more **Themes** sharing a design concept
- A **Theme** is uniquely identified by its **Theme Key**
- **Primaries** are the foundation — **Palette**, **UI Colors**, and **Syntax Colors** are all derived from them
- **Feedback** colors are orthogonal to **Primaries** — they represent application state, not the theme's color identity
- **Accents** optionally supplement **Primaries** for collections (like MNML) that need emphasis without a full **Palette**
- An **Adapter** discovers themes via core, applies them to **Templates**, and produces **Generated Files**
- **Theme Creator Options** bundle all color groups (**Primaries**, **Palette**, **Feedback**, **Accents**) as input to UI/Syntax creation

## Example dialogue

> **Dev:** "When I create a new **Theme** in the `terra` **Collection**, do I need to define all color groups?"
>
> **Domain expert:** "You define **Primaries** and **Feedback** — those are always required. **Palette** is derived from **Primaries** by the collection's creator function. **Accents** are optional and mostly used by `mnml`."
>
> **Dev:** "So the **Template** in an **Adapter** receives the full **Theme Definition** including derived colors?"
>
> **Domain expert:** "Exactly. The **Adapter** calls core's generation pipeline, which resolves all color groups into a complete **Theme Definition**. The **Template** just maps those tokens to platform-specific syntax."
>
> **Dev:** "What's the difference between **Name** and **Label** on the metadata?"
>
> **Domain expert:** "**Name** is the short display name you define — like 'Winter Night'. **Label** is computed at runtime by combining **Name** with the **Collection** label, so it becomes something like 'Winter Night (Terra)'. You never set **Label** directly."

## Flagged ambiguities

- **"semantic"** is used in code comments to describe **Feedback** colors ("semantic feedback colors for UI states"), but also describes **UI Colors** which are semantic tokens. Recommendation: reserve "semantic" for **UI Colors** (which map meaning to slots); call **Feedback** colors "status colors" instead.
- **"name" vs "label" vs "key"** — three different identifiers on theme metadata. **Key** is the machine identifier, **Name** is the human-readable short form, **Label** is the computed long form. This is clear in types but easy to confuse in conversation.
- **Palette overlap with Primaries** — both are color scales, but serve fundamentally different roles. **Primaries** are a continuous dark-to-light gradient; **Palette** is a categorical 16-color ANSI mapping. The word "colors" is sometimes used loosely for both.
- **UI foreground feedback states vs Feedback colors** — UI foreground includes `negative`, `warn`, `info`, `hint`, `positive` which partially mirror but don't exactly match **Feedback** (`negative`, `success`, `info`, `warning`). The naming divergence (`success` vs `positive`, `warning` vs `warn`, plus `hint` having no Feedback equivalent) could cause confusion.
