import type { HexColor } from "./colors.ts";

/** Primary color scale with dark (d), medium (m), and light (l) ranges. */
export interface ThemePrimaryColors {
    /** Darkest background */
    d10: HexColor;
    d20: HexColor;
    d30: HexColor;
    d40: HexColor;

    /** Mid-range tones */
    m10: HexColor;
    m20: HexColor;
    m30: HexColor;
    m40: HexColor;

    /** Lightest foreground */
    l10: HexColor;
    l20: HexColor;
    l30: HexColor;
    l40: HexColor;
}

/** 16-color terminal palette. */
export interface ThemePaletteColors {
    black: HexColor;
    gray: HexColor;
    darkRed: HexColor;
    red: HexColor;
    darkGreen: HexColor;
    green: HexColor;
    darkYellow: HexColor;
    yellow: HexColor;
    darkBlue: HexColor;
    blue: HexColor;
    darkMagenta: HexColor;
    magenta: HexColor;
    darkCyan: HexColor;
    cyan: HexColor;
    lightGray: HexColor;
    white: HexColor;
}

/** Minimal accent colors used by MNML collection themes. */
export interface ThemeAccentColors {
    a10: HexColor;
    a20: HexColor;
    a30?: HexColor;
    a40?: HexColor;
}

/** Semantic feedback colors for UI states. */
export interface ThemeFeedbackColors {
    negative: HexColor;
    success: HexColor;
    info: HexColor;
    warning: HexColor;
}

/** Options object passed to all create-ui and create-syntax functions. */
export interface ThemeCreatorOptions {
    primaries: ThemePrimaryColors;
    palette: ThemePaletteColors;
    feedback: ThemeFeedbackColors;
    accents: ThemeAccentColors;
}

/** Background colors for UI elements. */
interface ThemeUiBackgroundColors {
    default: HexColor;
    panel: HexColor;
    float: HexColor;
    active: HexColor;
    disabled: HexColor;
    hover: HexColor;
    selection: HexColor;
    search: HexColor;
    contrast: HexColor;
    negative: HexColor;
    warn: HexColor;
    info: HexColor;
    hint: HexColor;
    positive: HexColor;
    add: HexColor;
    delete: HexColor;
    modify: HexColor;
}

/** Foreground colors for UI elements. */
interface ThemeUiForegroundColors {
    default: HexColor;
    subtle: HexColor;
    accent: HexColor;
    disabled: HexColor;
    contrast: HexColor;
    negative: HexColor;
    warn: HexColor;
    info: HexColor;
    hint: HexColor;
    positive: HexColor;
    add: HexColor;
    delete: HexColor;
    modify: HexColor;
}

/** UI color tokens split into background and foreground groups. */
export interface ThemeUiColors {
    bg: ThemeUiBackgroundColors;
    fg: ThemeUiForegroundColors;
}

/** Syntax highlighting color tokens for all language constructs. */
export interface ThemeSyntaxColors {
    variable: {
        default: HexColor;
        builtin: HexColor;
        parameter: HexColor;
        member: HexColor;
    };
    string: {
        default: HexColor;
        doc: HexColor;
        regexp: HexColor;
        escape: HexColor;
    };
    boolean: {
        default: HexColor;
    };
    number: {
        default: HexColor;
    };
    property: {
        default: HexColor;
    };
    constant: {
        default: HexColor;
        builtin: HexColor;
    };
    module: {
        default: HexColor;
    };
    type: {
        default: HexColor;
        builtin: HexColor;
    };
    attribute: {
        default: HexColor;
        builtin: HexColor;
    };
    func: {
        default: HexColor;
        builtin: HexColor;
        method: HexColor;
    };
    constructor: {
        default: HexColor;
    };
    operator: {
        default: HexColor;
    };
    keyword: {
        default: HexColor;
        import: HexColor;
        export: HexColor;
    };
    punctuation: {
        default: HexColor;
        delimiter: HexColor;
        bracket: HexColor;
        special: HexColor;
    };
    comment: {
        default: HexColor;
        doc: HexColor;
        todo: HexColor;
        error: HexColor;
        warn: HexColor;
        info: HexColor;
        hint: HexColor;
    };
    tag: {
        default: HexColor;
        builtin: HexColor;
        delimiter: HexColor;
        attribute: HexColor;
    };
    markup: {
        heading: {
            h1: HexColor;
            h2: HexColor;
            h3: HexColor;
            h4: HexColor;
            h5: HexColor;
            h6: HexColor;
        };
        list: {
            default: HexColor;
            checked: HexColor;
            unchecked: HexColor;
        };
        strong: HexColor;
        italic: HexColor;
        strikethrough: HexColor;
        quote: HexColor;
        math: HexColor;
        link: HexColor;
        code: {
            fg: HexColor;
            bg: HexColor;
        };
    };
}

export const themeKeys = [
    "black-atom-default-dark",
    "black-atom-default-dark-dimmed",
    "black-atom-default-light",
    "black-atom-default-light-dimmed",
    "black-atom-stations-engineering",
    "black-atom-stations-operations",
    "black-atom-stations-medical",
    "black-atom-stations-research",
    "black-atom-jpn-koyo-yoru",
    "black-atom-jpn-koyo-hiru",
    "black-atom-jpn-tsuki-yoru",
    "black-atom-jpn-murasaki-yoru",
    "black-atom-terra-spring-day",
    "black-atom-terra-spring-night",
    "black-atom-terra-fall-day",
    "black-atom-terra-fall-night",
    "black-atom-terra-summer-day",
    "black-atom-terra-summer-night",
    "black-atom-terra-winter-day",
    "black-atom-terra-winter-night",
    "black-atom-mnml-clay-dark",
    "black-atom-mnml-clay-light",
    "black-atom-mnml-orange-dark",
    "black-atom-mnml-orange-light",
    "black-atom-mnml-osman-light",
    "black-atom-mnml-mikado-dark",
    "black-atom-mnml-mikado-light",
    "black-atom-mnml-47-light",
    "black-atom-mnml-47-dark",
    "black-atom-mnml-eink-dark",
    "black-atom-mnml-eink-light",
    "black-atom-mnml-mono-dark",
    "black-atom-mnml-mono-light",
    "black-atom-mnml-ita-light",
] as const;

export type ThemeKey = typeof themeKeys[number];

const collectionKeys = [
    "default",
    "stations",
    "jpn",
    "terra",
    "mnml",
] as const;

export type ThemeCollectionKey = typeof collectionKeys[number];

/** Display metadata for a theme collection. */
interface ThemeCollectionMeta {
    key: ThemeCollectionKey;
    label: string;
}

/** Theme metadata including display name, appearance, and collection info. */
export interface ThemeMeta {
    /** Unique identifier for the theme. */
    key: ThemeKey;
    /** Short display name for the theme (e.g. "Dark", "Engineering", "Koyo Yoru"). */
    name: string;
    /** Appearance of the theme (light or dark). */
    appearance: "light" | "dark";
    /** Status of the theme (development, beta, or release). */
    status: "development" | "beta" | "release";
    /** Collection that the theme belongs to. */
    collection: ThemeCollectionMeta;
}

/** A complete theme definition with metadata, colors, UI tokens, and syntax colors. */
export interface ThemeDefinition {
    /** Metadata for the theme. */
    meta: ThemeMeta;
    /** Primary color scale. */
    primaries: ThemePrimaryColors;
    /** 16-color terminal palette. */
    palette: ThemePaletteColors;
    /** UI color tokens split into background and foreground groups. */
    ui: ThemeUiColors;
    /** Syntax highlighting color tokens for all language constructs. */
    syntax: ThemeSyntaxColors;
}

/** Map of all theme keys to their full definitions. */
export type ThemeKeyDefinitionMap = Record<ThemeKey, ThemeDefinition>;
