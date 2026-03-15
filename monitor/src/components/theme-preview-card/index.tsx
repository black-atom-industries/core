import { Link } from "@tanstack/react-router";
import type { ThemeSummary } from "../../queries/themes";
import { AppearanceBadge } from "../appearance-badge";
import styles from "./index.module.css";

interface Props {
    theme: ThemeSummary;
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
            search={{ theme: t.meta.key }}
            className={styles.card}
            style={{ backgroundColor: t.bgDefault, color: t.fgDefault }}
            data-component="ThemePreviewCard"
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
                <div className={styles.footer}>
                    <span className={styles.contrast}>{t.contrast.ratio.toFixed(1)}:1</span>
                    <AppearanceBadge appearance={t.meta.appearance} />
                </div>
            </div>
        </Link>
    );
}
