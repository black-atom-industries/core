/**
 * Static theme bundle for compiled binary
 *
 * This file statically imports all themes so they can be bundled
 * into the compiled CLI binary. When running via `deno run` (development),
 * the dynamic loader is used instead to support hot-reload.
 *
 * MAINTENANCE: When adding new themes, also add them here.
 */

import type * as Theme from "../types/theme.ts";

// Default collection
import blackAtomDefaultDark from "./default/black-atom-default-dark.ts";
import blackAtomDefaultDarkDimmed from "./default/black-atom-default-dark-dimmed.ts";
import blackAtomDefaultLight from "./default/black-atom-default-light.ts";
import blackAtomDefaultLightDimmed from "./default/black-atom-default-light-dimmed.ts";

// Stations collection
import blackAtomStationsEngineering from "./stations/black-atom-stations-engineering.ts";
import blackAtomStationsOperations from "./stations/black-atom-stations-operations.ts";
import blackAtomStationsMedical from "./stations/black-atom-stations-medical.ts";
import blackAtomStationsResearch from "./stations/black-atom-stations-research.ts";

// JPN collection
import blackAtomJpnKoyoYoru from "./jpn/black-atom-jpn-koyo-yoru.ts";
import blackAtomJpnKoyoHiru from "./jpn/black-atom-jpn-koyo-hiru.ts";
import blackAtomJpnTsukiYoru from "./jpn/black-atom-jpn-tsuki-yoru.ts";
import blackAtomJpnMurasakiYoru from "./jpn/black-atom-jpn-murasaki-yoru.ts";

// Terra collection
import blackAtomTerraSpringDay from "./terra/black-atom-terra-spring-day.ts";
import blackAtomTerraSpringNight from "./terra/black-atom-terra-spring-night.ts";
import blackAtomTerraFallDay from "./terra/black-atom-terra-fall-day.ts";
import blackAtomTerraFallNight from "./terra/black-atom-terra-fall-night.ts";
import blackAtomTerraSummerDay from "./terra/black-atom-terra-summer-day.ts";
import blackAtomTerraSummerNight from "./terra/black-atom-terra-summer-night.ts";
import blackAtomTerraWinterDay from "./terra/black-atom-terra-winter-day.ts";
import blackAtomTerraWinterNight from "./terra/black-atom-terra-winter-night.ts";

// MNML collection
import blackAtomMnmlClayDark from "./mnml/black-atom-mnml-clay-dark.ts";
import blackAtomMnmlClayLight from "./mnml/black-atom-mnml-clay-light.ts";
import blackAtomMnmlOrangeDark from "./mnml/black-atom-mnml-orange-dark.ts";
import blackAtomMnmlOrangeLight from "./mnml/black-atom-mnml-orange-light.ts";
import blackAtomMnmlOsmanLight from "./mnml/black-atom-mnml-osman-light.ts";
import blackAtomMnmlMikadoDark from "./mnml/black-atom-mnml-mikado-dark.ts";
import blackAtomMnmlMikadoLight from "./mnml/black-atom-mnml-mikado-light.ts";
import blackAtomMnml47Light from "./mnml/black-atom-mnml-47-light.ts";
import blackAtomMnml47Dark from "./mnml/black-atom-mnml-47-dark.ts";
import blackAtomMnmlEinkDark from "./mnml/black-atom-mnml-eink-dark.ts";
import blackAtomMnmlEinkLight from "./mnml/black-atom-mnml-eink-light.ts";
import blackAtomMnmlMonoDark from "./mnml/black-atom-mnml-mono-dark.ts";
import blackAtomMnmlMonoLight from "./mnml/black-atom-mnml-mono-light.ts";
import blackAtomMnmlItaLight from "./mnml/black-atom-mnml-ita-light.ts";

export const themeBundle: Theme.ThemeMap = {
    // Default collection
    "black-atom-default-dark": blackAtomDefaultDark,
    "black-atom-default-dark-dimmed": blackAtomDefaultDarkDimmed,
    "black-atom-default-light": blackAtomDefaultLight,
    "black-atom-default-light-dimmed": blackAtomDefaultLightDimmed,

    // Stations collection
    "black-atom-stations-engineering": blackAtomStationsEngineering,
    "black-atom-stations-operations": blackAtomStationsOperations,
    "black-atom-stations-medical": blackAtomStationsMedical,
    "black-atom-stations-research": blackAtomStationsResearch,

    // JPN collection
    "black-atom-jpn-koyo-yoru": blackAtomJpnKoyoYoru,
    "black-atom-jpn-koyo-hiru": blackAtomJpnKoyoHiru,
    "black-atom-jpn-tsuki-yoru": blackAtomJpnTsukiYoru,
    "black-atom-jpn-murasaki-yoru": blackAtomJpnMurasakiYoru,

    // Terra collection
    "black-atom-terra-spring-day": blackAtomTerraSpringDay,
    "black-atom-terra-spring-night": blackAtomTerraSpringNight,
    "black-atom-terra-fall-day": blackAtomTerraFallDay,
    "black-atom-terra-fall-night": blackAtomTerraFallNight,
    "black-atom-terra-summer-day": blackAtomTerraSummerDay,
    "black-atom-terra-summer-night": blackAtomTerraSummerNight,
    "black-atom-terra-winter-day": blackAtomTerraWinterDay,
    "black-atom-terra-winter-night": blackAtomTerraWinterNight,

    // MNML collection
    "black-atom-mnml-clay-dark": blackAtomMnmlClayDark,
    "black-atom-mnml-clay-light": blackAtomMnmlClayLight,
    "black-atom-mnml-orange-dark": blackAtomMnmlOrangeDark,
    "black-atom-mnml-orange-light": blackAtomMnmlOrangeLight,
    "black-atom-mnml-osman-light": blackAtomMnmlOsmanLight,
    "black-atom-mnml-mikado-dark": blackAtomMnmlMikadoDark,
    "black-atom-mnml-mikado-light": blackAtomMnmlMikadoLight,
    "black-atom-mnml-47-light": blackAtomMnml47Light,
    "black-atom-mnml-47-dark": blackAtomMnml47Dark,
    "black-atom-mnml-eink-dark": blackAtomMnmlEinkDark,
    "black-atom-mnml-eink-light": blackAtomMnmlEinkLight,
    "black-atom-mnml-mono-dark": blackAtomMnmlMonoDark,
    "black-atom-mnml-mono-light": blackAtomMnmlMonoLight,
    "black-atom-mnml-ita-light": blackAtomMnmlItaLight,
};
