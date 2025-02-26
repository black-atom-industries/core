// Import types from the core project - we're duplicating for now
// Later this can be imported directly from the core project
export type HexColor = string;

export const themeKeys = [
    "black-atom-corp-engineering",
    "black-atom-corp-operations",
    "black-atom-corp-medical",
    "black-atom-corp-research",
    "black-atom-crbn-null",
    "black-atom-crbn-supr",
    "black-atom-jpn-koyo-yoru",
    "black-atom-jpn-koyo-hiru",
    "black-atom-jpn-tsuki-yoru",
    "black-atom-terra-spring-day",
    "black-atom-terra-spring-night",
    "black-atom-terra-fall-day",
    "black-atom-terra-fall-night",
    "black-atom-terra-summer-day",
    "black-atom-terra-summer-night",
    "black-atom-terra-winter-day",
    "black-atom-terra-winter-night",
] as const;

export type Key = typeof themeKeys[number];

export type CollectionKey = "corp" | "crbn" | "terra" | "jpn";

export type CollectionLabel = string;

export interface Meta {
    key: Key;
    label:
        | "Black Atom - Corp Engineering"
        | "Black Atom - Corp Operations"
        | "Black Atom - Corp Medical"
        | "Black Atom - Corp Research"
        | "Black Atom - Carbon NULL"
        | "Black Atom - Carbon SUPR"
        | "Black Atom - JPN Koyo Yoru"
        | "Black Atom - JPN Koyo Hiru"
        | "Black Atom - JPN Tsuki Yoru"
        | "Black Atom - Terra Spring Day"
        | "Black Atom - Terra Spring Night"
        | "Black Atom - Terra Fall Day"
        | "Black Atom - Terra Fall Night"
        | "Black Atom - Terra Summer Day"
        | "Black Atom - Terra Summer Night"
        | "Black Atom - Terra Winter Day"
        | "Black Atom - Terra Winter Night";
    appearance: "light" | "dark";
    status: "development" | "beta" | "release";
    collection: {
        key: CollectionKey;
        label: CollectionLabel;
    };
}

export type ThemeMap = Record<Key, Definition | null>;

export type Primaries = [
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
    HexColor,
];

export interface Palette {
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

export interface UIBackground {
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

export interface UIForeground {
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

export interface UI {
    bg: UIBackground;
    fg: UIForeground;
}

export interface Syntax {
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

export interface Definition {
    meta: Meta;
    primaries: Primaries;
    palette: Palette;
    ui: UI;
    syntax: Syntax;
}