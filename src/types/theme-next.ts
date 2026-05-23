import type { Colordx } from "@colordx";

/** Primary color scale with dark (d), medium (m), and light (l) ranges. */
export interface ThemePrimaryColorsNext<Color = Colordx> {
    d10: Color;
    d20: Color;
    d30: Color;
    d40: Color;

    m10: Color;
    m20: Color;
    m30: Color;
    m40: Color;

    l10: Color;
    l20: Color;
    l30: Color;
    l40: Color;
}

/** 16-color terminal palette. */
export interface ThemePaletteColorsNext<Color = Colordx> {
    black: Color;
    gray: Color;
    darkRed: Color;
    red: Color;
    darkGreen: Color;
    green: Color;
    darkYellow: Color;
    yellow: Color;
    darkBlue: Color;
    blue: Color;
    darkMagenta: Color;
    magenta: Color;
    darkCyan: Color;
    cyan: Color;
    lightGray: Color;
    white: Color;
}

/** Semantic feedback colors for UI states. */
export interface ThemeFeedbackColorsNext<Color = Colordx> {
    negative: Color;
    success: Color;
    info: Color;
    warning: Color;
}

/** Colors for git-related UI elements. */
export interface ThemeGitColorsNext<Color = Colordx> {
    add: Color;
    delete: Color;
    modify: Color;
}

/** Minimal accent colors used by MNML collection themes. */
export interface ThemeAccentColorsNext<Color = Colordx> {
    a10: Color;
    a20: Color;
    a30?: Color;
    a40?: Color;
}

/** UI color tokens split into background and foreground groups. */
export interface ThemeUiColorsNext<Color = Colordx> {
    bg: {
        default: Color;
        panel: Color;
        float: Color;
        active: Color;
        disabled: Color;
        hover: Color;
        selection: Color;
        search: Color;
        contrast: Color;

        git?: ThemeGitColorsNext<Color>;
        feedback?: ThemeFeedbackColorsNext<Color>;
    };

    fg: {
        default: Color;
        subtle: Color;
        accent: Color;
        disabled: Color;
        contrast: Color;

        git?: ThemeGitColorsNext<Color>;
        feedback?: ThemeFeedbackColorsNext<Color>;
    };
}

/** Syntax highlighting color tokens for all language constructs. */
export interface ThemeSyntaxColorsNext<Color = Colordx> {
    variable: {
        default: Color;
        builtin: Color;
        parameter: Color;
        member: Color;
    };
    string: {
        default: Color;
        doc: Color;
        regexp: Color;
        escape: Color;
    };
    boolean: {
        default: Color;
    };
    number: {
        default: Color;
    };
    property: {
        default: Color;
    };
    constant: {
        default: Color;
        builtin: Color;
    };
    module: {
        default: Color;
    };
    type: {
        default: Color;
        builtin: Color;
    };
    attribute: {
        default: Color;
        builtin: Color;
    };
    func: {
        default: Color;
        builtin: Color;
        method: Color;
    };
    constructor: {
        default: Color;
    };
    operator: {
        default: Color;
    };
    keyword: {
        default: Color;
        import: Color;
        export: Color;
    };
    punctuation: {
        default: Color;
        delimiter: Color;
        bracket: Color;
        special: Color;
    };
    comment: {
        default: Color;
        doc: Color;
        todo: Color;
        error: Color;
        warn: Color;
        info: Color;
        hint: Color;
    };
    tag: {
        default: Color;
        builtin: Color;
        delimiter: Color;
        attribute: Color;
    };
    markup: {
        heading: {
            h1: Color;
            h2: Color;
            h3: Color;
            h4: Color;
            h5: Color;
            h6: Color;
        };
        list: {
            default: Color;
            checked: Color;
            unchecked: Color;
        };
        strong: Color;
        italic: Color;
        strikethrough: Color;
        quote: Color;
        math: Color;
        link: Color;
        code: {
            fg: Color;
            bg: Color;
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

/** A complete theme definition with metadata, colors, UI tokens, and syntax colors. */
export interface ThemeDefinitionNext<Color = Colordx> {
    meta: ThemeMeta;
    colors: {
        /** Primary color scale. */
        primaries: ThemePrimaryColorsNext<Color>;
        /** 16-color terminal palette. */
        palette: ThemePaletteColorsNext<Color>;
        /** UI color tokens split into background and foreground groups. */
        ui: ThemeUiColorsNext<Color>;
        /** Syntax highlighting color tokens for all language constructs. */
        syntax: ThemeSyntaxColorsNext<Color>;
    };
}

/** Map of all theme keys to their full definitions. */
export type ThemeKeyDefinitionMapNext<Color = Colordx> = Record<
    ThemeKey,
    ThemeDefinitionNext<Color>
>;
