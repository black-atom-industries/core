import type { ThemePaletteColors, ThemePrimaryColors } from "@core/types/theme.ts";
import { Link } from "@tanstack/react-router";
import { AppearanceBadge } from "../appearance-badge";
import styles from "./index.module.css";

interface Props {
    name: string;
    appearance: "dark" | "light";
    primaries: ThemePrimaryColors;
    palette: ThemePaletteColors;
    contrastRatio: number;
    themeKey: string;
}

const PRIMARY_ORDER = [
    "d10",
    "d20",
    "d30",
    "d40",
    "m10",
    "m20",
    "m30",
    "m40",
    "l10",
    "l20",
    "l30",
    "l40",
] as const;

const PALETTE_ORDER = [
    "black",
    "gray",
    "red",
    "darkRed",
    "yellow",
    "darkYellow",
    "green",
    "darkGreen",
    "cyan",
    "darkCyan",
    "blue",
    "darkBlue",
    "magenta",
    "darkMagenta",
    "lightGray",
    "white",
] as const;

export function ThemePreviewCard(
    { name, appearance, primaries, palette, contrastRatio, themeKey }: Props,
) {
    return (
        <Link
            to="/preview/ui"
            search={{ theme: themeKey }}
            className={styles.card}
            data-component="ThemePreviewCard"
        >
            <div className={styles.primaries}>
                {PRIMARY_ORDER.map((key) => (
                    <div
                        key={key}
                        className={styles.primaryStrip}
                        style={{ background: primaries[key] }}
                    />
                ))}
            </div>
            <div className={styles.palette}>
                {PALETTE_ORDER.map((key) => (
                    <div
                        key={key}
                        className={styles.paletteSwatch}
                        style={{ background: palette[key] }}
                    />
                ))}
            </div>
            <div className={styles.meta}>
                <div className={styles.name}>{name}</div>
                <div className={styles.footer}>
                    <span className={styles.contrast}>{contrastRatio.toFixed(1)}:1</span>
                    <AppearanceBadge appearance={appearance} />
                </div>
            </div>
        </Link>
    );
}
