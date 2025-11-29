export type HexColor = `#${string}`;

export const themeKeys = [
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
    "black-atom-north-night",
    "black-atom-north-dark-night",
    "black-atom-north-day",
    "black-atom-mnml-clay-dark",
    "black-atom-mnml-clay-light",
    "black-atom-mnml-orange-dark",
    "black-atom-mnml-orange-light",
    "black-atom-mnml-mikado-dark",
    "black-atom-mnml-mikado-light",
    "black-atom-mnml-47-light",
    "black-atom-mnml-47-dark",
    "black-atom-mnml-eink-dark",
    "black-atom-mnml-eink-light",
] as const;

type Key = (typeof themeKeys)[number];

type ThemeKeyPathMap = Record<Key, string>;

type CollectionKey = "terra" | "jpn" | "stations" | "north" | "mnml";

type CollectionLabel = string;

interface Meta {
    key: Key;
    label:
        | "Black Atom — STA ∷ Engineering"
        | "Black Atom — STA ∷ Operations"
        | "Black Atom — STA ∷ Medical"
        | "Black Atom — STA ∷ Research"
        | "Black Atom — JPN ∷ Koyo Yoru"
        | "Black Atom — JPN ∷ Koyo Hiru"
        | "Black Atom — JPN ∷ Tsuki Yoru"
        | "Black Atom — JPN ∷ Murasaki Yoru"
        | "Black Atom — TER ∷ Spring Day"
        | "Black Atom — TER ∷ Spring Night"
        | "Black Atom — TER ∷ Fall Day"
        | "Black Atom — TER ∷ Fall Night"
        | "Black Atom — TER ∷ Summer Day"
        | "Black Atom — TER ∷ Summer Night"
        | "Black Atom — TER ∷ Winter Day"
        | "Black Atom — TER ∷ Winter Night"
        | "Black Atom — NORTH ∷ Night"
        | "Black Atom — NORTH ∷ Dark Night"
        | "Black Atom — NORTH ∷ Day"
        | "Black Atom — MNM ∷ Clay Dark"
        | "Black Atom — MNM ∷ Clay Light"
        | "Black Atom — MNM ∷ Orange Dark"
        | "Black Atom — MNM ∷ Orange Light"
        | "Black Atom — MNM ∷ 47 Light"
        | "Black Atom — MNM ∷ 47 Dark"
        | "Black Atom — MNM ∷ Mikado Dark"
        | "Black Atom — MNM ∷ Mikado Light"
        | "Black Atom — MNM ∷ E-Ink Dark"
        | "Black Atom — MNM ∷ E-Ink Light";
    appearance: "light" | "dark";
    status: "development" | "beta" | "release";
    collection: {
        key: CollectionKey;
        label: CollectionLabel;
    };
}

// NOTE: The `null` is only temporary until I have everything migrated
type ThemeMap = Record<Key, Definition | null>;

interface Primaries {
    /* Dark range */
    d10: HexColor;
    d20: HexColor;
    d30: HexColor;
    d40: HexColor;

    /* Middle range */
    m10: HexColor;
    m20: HexColor;
    m30: HexColor;
    m40: HexColor;

    /* Light range */
    l10: HexColor;
    l20: HexColor;
    l30: HexColor;
    l40: HexColor;
}

interface Palette {
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

/** Minimal accent interface for mnml themes */
interface MnmlAccents {
    a10: HexColor;
    a20: HexColor;
    a30?: HexColor;
}

/** Minimal feedback interface for mnml themes */
export interface MnmlFeedback {
    negative: HexColor;
    success: HexColor;
    info: HexColor;
    warning: HexColor;
}

interface UIBackground {
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

interface UIForeground {
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

interface UI {
    bg: UIBackground;
    fg: UIForeground;
}

interface Syntax {
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

interface Definition {
    meta: Meta;
    primaries: Primaries;
    palette: Palette;
    ui: UI;
    syntax: Syntax;
}

export type {
    CollectionKey,
    CollectionLabel,
    Definition,
    Key,
    Meta,
    MnmlAccents,
    Palette,
    Primaries,
    Syntax,
    ThemeKeyPathMap,
    ThemeMap,
    UI,
};
