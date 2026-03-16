import type { ThemeDefinition } from "@core/types/theme.ts";
import { Link } from "@tanstack/react-router";
import { themeToCssVars } from "../../lib/theme-css-vars";
import { AppearanceBadge } from "../appearance-badge";
import styles from "./index.module.css";

interface Props {
    theme: ThemeDefinition;
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

export function ThemePreviewCard({ theme: t }: Props) {
    return (
        <Link
            to="/preview/ui"
            search={{ themeKey: t.meta.key }}
            data-component="ThemePreviewCard"
            className={styles.root}
            style={themeToCssVars(t)}
        >
            <div className={styles.primaries}>
                {PRIMARY_ORDER.map((key) => (
                    <div
                        key={key}
                        className={styles.primaryStrip}
                        style={{ background: t.primaries[key] }}
                    />
                ))}
            </div>
            <div className={styles.palette}>
                {PALETTE_ORDER.map((key) => (
                    <div
                        key={key}
                        className={styles.paletteSwatch}
                        style={{ background: t.palette[key] }}
                    />
                ))}
            </div>
            <div className={styles.meta}>
                <div className={styles.name}>{t.meta.name}</div>
                <AppearanceBadge appearance={t.meta.appearance} />
            </div>
        </Link>
    );
}
