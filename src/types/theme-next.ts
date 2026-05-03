import type { Colordx } from "@colordx";

/** Primary color scale with dark (d), medium (m), and light (l) ranges. */
export interface ThemePrimaryColorsNext {
    d10: Colordx;
    d20: Colordx;
    d30: Colordx;
    d40: Colordx;

    m10: Colordx;
    m20: Colordx;
    m30: Colordx;
    m40: Colordx;

    l10: Colordx;
    l20: Colordx;
    l30: Colordx;
    l40: Colordx;
}

/** 16-color terminal palette. */
export interface ThemePaletteColorsNext {
    black: Colordx;
    gray: Colordx;
    darkRed: Colordx;
    red: Colordx;
    darkGreen: Colordx;
    green: Colordx;
    darkYellow: Colordx;
    yellow: Colordx;
    darkBlue: Colordx;
    blue: Colordx;
    darkMagenta: Colordx;
    magenta: Colordx;
    darkCyan: Colordx;
    cyan: Colordx;
    lightGray: Colordx;
    white: Colordx;
}

/** Semantic feedback colors for UI states. */
export interface ThemeFeedbackColorsNext {
    negative: Colordx;
    success: Colordx;
    info: Colordx;
    warning: Colordx;
}

/** Colors for git-related UI elements. */
export interface ThemeGitColorsNext {
    add: Colordx;
    delete: Colordx;
    modify: Colordx;
}

/** Minimal accent colors used by MNML collection themes. */
export interface ThemeAccentColorsNext {
    a10: Colordx;
    a20: Colordx;
    a30?: Colordx;
    a40?: Colordx;
}

/** UI color tokens split into background and foreground groups. */
export interface ThemeUiColorsNext {
    bg: {
        default: Colordx;
        panel: Colordx;
        float: Colordx;
        active: Colordx;
        disabled: Colordx;
        hover: Colordx;
        selection: Colordx;
        search: Colordx;
        contrast: Colordx;

        git?: ThemeGitColorsNext;
        feedback?: ThemeFeedbackColorsNext;
    };

    fg: {
        default: Colordx;
        subtle: Colordx;
        accent: Colordx;
        disabled: Colordx;
        contrast: Colordx;

        git?: ThemeGitColorsNext;
        feedback?: ThemeFeedbackColorsNext;
    };
}

/** Syntax highlighting color tokens for all language constructs. */
export interface ThemeSyntaxColorsNext {
    variable: {
        default: Colordx;
        builtin: Colordx;
        parameter: Colordx;
        member: Colordx;
    };
    string: {
        default: Colordx;
        doc: Colordx;
        regexp: Colordx;
        escape: Colordx;
    };
    boolean: {
        default: Colordx;
    };
    number: {
        default: Colordx;
    };
    property: {
        default: Colordx;
    };
    constant: {
        default: Colordx;
        builtin: Colordx;
    };
    module: {
        default: Colordx;
    };
    type: {
        default: Colordx;
        builtin: Colordx;
    };
    attribute: {
        default: Colordx;
        builtin: Colordx;
    };
    func: {
        default: Colordx;
        builtin: Colordx;
        method: Colordx;
    };
    constructor: {
        default: Colordx;
    };
    operator: {
        default: Colordx;
    };
    keyword: {
        default: Colordx;
        import: Colordx;
        export: Colordx;
    };
    punctuation: {
        default: Colordx;
        delimiter: Colordx;
        bracket: Colordx;
        special: Colordx;
    };
    comment: {
        default: Colordx;
        doc: Colordx;
        todo: Colordx;
        error: Colordx;
        warn: Colordx;
        info: Colordx;
        hint: Colordx;
    };
    tag: {
        default: Colordx;
        builtin: Colordx;
        delimiter: Colordx;
        attribute: Colordx;
    };
    markup: {
        heading: {
            h1: Colordx;
            h2: Colordx;
            h3: Colordx;
            h4: Colordx;
            h5: Colordx;
            h6: Colordx;
        };
        list: {
            default: Colordx;
            checked: Colordx;
            unchecked: Colordx;
        };
        strong: Colordx;
        italic: Colordx;
        strikethrough: Colordx;
        quote: Colordx;
        math: Colordx;
        link: Colordx;
        code: {
            fg: Colordx;
            bg: Colordx;
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

export const DEFAULT_THEME_KEY: ThemeKey = "black-atom-default-dark";

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

/** Base theme metadata without computed properties — used for authoring theme entries. */
export type ThemeMetaBase = Omit<ThemeMeta, "label">;

/** Theme metadata including display name, appearance, and collection info. */
export interface ThemeMeta {
    /** Unique identifier for the theme. */
    key: ThemeKey;
    /** Short display name for the theme (e.g. "Dark", "Engineering", "Koyo Yoru"). */
    name: string;
    /** Full display label (e.g. "Black Atom — TERRA ∷ Fall Night"). */
    label: string;
    /** Appearance of the theme (light or dark). */
    appearance: "light" | "dark";
    /** Status of the theme (development, beta, or release). */
    status: "development" | "beta" | "release";
    /** Collection that the theme belongs to. */
    collection: ThemeCollectionMeta;
}

/** A complete theme definition with metadata, colors, UI tokens, and syntax colors.
 * TODO: Make this and the nexted properties generic so their values can be either `Colordx` or `HexColor`.
 */
export interface ThemeDefinitionNext {
    meta: ThemeMeta;
    colors: {
        /** Primary color scale. */
        primaries: ThemePrimaryColorsNext;
        /** 16-color terminal palette. */
        palette: ThemePaletteColorsNext;
        /** UI color tokens split into background and foreground groups. */
        ui: ThemeUiColorsNext;
        /** Syntax highlighting color tokens for all language constructs. */
        syntax: ThemeSyntaxColorsNext;
    };
}

/** Map of all theme keys to their full definitions. */
export type ThemeKeyDefinitionMapNext = Record<ThemeKey, ThemeDefinitionNext>;
