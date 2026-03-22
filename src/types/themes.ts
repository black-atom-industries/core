import type { ThemeKey, ThemeMeta, ThemeMetaBase } from "./theme.ts";

// *****************************************************************************
// Collection defaults
// *****************************************************************************

const defaultCollection = {
    status: "release",
    collection: { key: "default", label: "Default" },
} as const satisfies Partial<ThemeMetaBase>;

const stationsCollection = {
    status: "release",
    collection: { key: "stations", label: "Stations" },
} as const satisfies Partial<ThemeMetaBase>;

const jpnCollection = {
    status: "release",
    collection: { key: "jpn", label: "JPN" },
} as const satisfies Partial<ThemeMetaBase>;

const terraCollection = {
    collection: { key: "terra", label: "TERRA" },
} as const satisfies Partial<ThemeMetaBase>;

const mnmlCollection = {
    status: "development",
    collection: { key: "mnml", label: "MNML" },
} as const satisfies Partial<ThemeMetaBase>;

// *****************************************************************************
// Label computation
// *****************************************************************************

function computeLabel(meta: ThemeMetaBase): string {
    if (meta.collection.key === "default") {
        return `Black Atom — ${meta.name}`;
    }
    return `Black Atom — ${meta.collection.label} ∷ ${meta.name}`;
}

// *****************************************************************************
// Theme Key Meta Map
// *****************************************************************************

type ThemeKeyMetaInputMap = Record<ThemeKey, ThemeMetaBase>;

/**
 * Central registry of all theme metadata.
 *
 * This is the single source of truth — ThemeCollectionKey,
 * and themeKeys are all derived from this object.
 */
const rawThemeKeyMetaMap = {
    // *************************************************************************
    // DEFAULT COLLECTION
    // *************************************************************************
    "black-atom-default-dark": {
        ...defaultCollection,
        key: "black-atom-default-dark",
        name: "Dark",
        appearance: "dark",
    },
    "black-atom-default-dark-dimmed": {
        ...defaultCollection,
        key: "black-atom-default-dark-dimmed",
        name: "Dark Dimmed",
        appearance: "dark",
    },
    "black-atom-default-light": {
        ...defaultCollection,
        key: "black-atom-default-light",
        name: "Light",
        appearance: "light",
    },
    "black-atom-default-light-dimmed": {
        ...defaultCollection,
        key: "black-atom-default-light-dimmed",
        name: "Light Dimmed",
        appearance: "light",
    },

    // *************************************************************************
    // STATIONS COLLECTION
    // *************************************************************************
    "black-atom-stations-engineering": {
        ...stationsCollection,
        key: "black-atom-stations-engineering",
        name: "Engineering",
        appearance: "dark",
    },
    "black-atom-stations-operations": {
        ...stationsCollection,
        key: "black-atom-stations-operations",
        name: "Operations",
        appearance: "dark",
    },
    "black-atom-stations-medical": {
        ...stationsCollection,
        key: "black-atom-stations-medical",
        name: "Medical",
        appearance: "light",
    },
    "black-atom-stations-research": {
        ...stationsCollection,
        key: "black-atom-stations-research",
        name: "Research",
        appearance: "light",
    },

    // *************************************************************************
    // JPN COLLECTION
    // *************************************************************************
    "black-atom-jpn-koyo-yoru": {
        ...jpnCollection,
        key: "black-atom-jpn-koyo-yoru",
        name: "Koyo Yoru",
        appearance: "dark",
    },
    "black-atom-jpn-koyo-hiru": {
        ...jpnCollection,
        key: "black-atom-jpn-koyo-hiru",
        name: "Koyo Hiru",
        appearance: "light",
    },
    "black-atom-jpn-tsuki-yoru": {
        ...jpnCollection,
        key: "black-atom-jpn-tsuki-yoru",
        name: "Tsuki Yoru",
        appearance: "dark",
    },
    "black-atom-jpn-murasaki-yoru": {
        ...jpnCollection,
        key: "black-atom-jpn-murasaki-yoru",
        name: "Murasaki Yoru",
        appearance: "dark",
    },

    // *************************************************************************
    // TERRA COLLECTION
    // *************************************************************************
    "black-atom-terra-spring-day": {
        ...terraCollection,
        key: "black-atom-terra-spring-day",
        name: "Spring Day",
        appearance: "light",
        status: "beta",
    },
    "black-atom-terra-spring-night": {
        ...terraCollection,
        key: "black-atom-terra-spring-night",
        name: "Spring Night",
        appearance: "dark",
        status: "release",
    },
    "black-atom-terra-fall-day": {
        ...terraCollection,
        key: "black-atom-terra-fall-day",
        name: "Fall Day",
        appearance: "light",
        status: "development",
    },
    "black-atom-terra-fall-night": {
        ...terraCollection,
        key: "black-atom-terra-fall-night",
        name: "Fall Night",
        appearance: "dark",
        status: "release",
    },
    "black-atom-terra-summer-day": {
        ...terraCollection,
        key: "black-atom-terra-summer-day",
        name: "Summer Day",
        appearance: "light",
        status: "development",
    },
    "black-atom-terra-summer-night": {
        ...terraCollection,
        key: "black-atom-terra-summer-night",
        name: "Summer Night",
        appearance: "dark",
        status: "release",
    },
    "black-atom-terra-winter-day": {
        ...terraCollection,
        key: "black-atom-terra-winter-day",
        name: "Winter Day",
        appearance: "light",
        status: "development",
    },
    "black-atom-terra-winter-night": {
        ...terraCollection,
        key: "black-atom-terra-winter-night",
        name: "Winter Night",
        appearance: "dark",
        status: "release",
    },

    // *************************************************************************
    // MNML COLLECTION
    // *************************************************************************
    "black-atom-mnml-clay-dark": {
        ...mnmlCollection,
        key: "black-atom-mnml-clay-dark",
        name: "Clay Dark",
        appearance: "dark",
    },
    "black-atom-mnml-clay-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-clay-light",
        name: "Clay Light",
        appearance: "light",
    },
    "black-atom-mnml-orange-dark": {
        ...mnmlCollection,
        key: "black-atom-mnml-orange-dark",
        name: "Orange Dark",
        appearance: "dark",
    },
    "black-atom-mnml-orange-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-orange-light",
        name: "Orange Light",
        appearance: "light",
    },
    "black-atom-mnml-osman-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-osman-light",
        name: "Osman Light",
        appearance: "light",
    },
    "black-atom-mnml-mikado-dark": {
        ...mnmlCollection,
        key: "black-atom-mnml-mikado-dark",
        name: "Mikado Dark",
        appearance: "dark",
    },
    "black-atom-mnml-mikado-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-mikado-light",
        name: "Mikado Light",
        appearance: "light",
    },
    "black-atom-mnml-47-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-47-light",
        name: "47 Light",
        appearance: "light",
    },
    "black-atom-mnml-47-dark": {
        ...mnmlCollection,
        key: "black-atom-mnml-47-dark",
        name: "47 Dark",
        appearance: "dark",
    },
    "black-atom-mnml-eink-dark": {
        ...mnmlCollection,
        key: "black-atom-mnml-eink-dark",
        name: "E-Ink Dark",
        appearance: "dark",
    },
    "black-atom-mnml-eink-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-eink-light",
        name: "E-Ink Light",
        appearance: "light",
    },
    "black-atom-mnml-mono-dark": {
        ...mnmlCollection,
        key: "black-atom-mnml-mono-dark",
        name: "Mono Dark",
        appearance: "dark",
    },
    "black-atom-mnml-mono-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-mono-light",
        name: "Mono Light",
        appearance: "light",
    },
    "black-atom-mnml-ita-light": {
        ...mnmlCollection,
        key: "black-atom-mnml-ita-light",
        name: "ITA Light",
        appearance: "light",
    },
} as const satisfies ThemeKeyMetaInputMap;

// *****************************************************************************
// Exported map (enriched with computed label)
// *****************************************************************************

export const themeKeyMetaMap = Object.fromEntries(
    Object.entries(rawThemeKeyMetaMap).map(([key, meta]) => [
        key,
        { ...meta, label: computeLabel(meta) },
    ]),
) as Record<ThemeKey, ThemeMeta>;
