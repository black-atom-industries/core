import { useState } from "react";
import styles from "./index.module.css";

interface Props {
    color: string;
    label: string;
    type?: "background" | "foreground";
}

export function ColorSwatch({ color, label, type = "background" }: Props) {
    const [copied, setCopied] = useState(false);

    function handleClick() {
        navigator.clipboard.writeText(color).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        });
    }

    return (
        <div
            className={styles.swatch}
            data-component="ColorSwatch"
            onClick={handleClick}
            title="Click to copy"
        >
            {type === "background"
                ? (
                    <div
                        className={styles.colorBg}
                        style={{ background: color }}
                    />
                )
                : (
                    <div className={styles.colorFg} style={{ color }}>
                        Aa
                    </div>
                )}
            <span className={styles.label}>{copied ? "copied!" : label}</span>
            <span className={styles.colorText} style={{ color }}>{color}</span>
            <span className={styles.hex}>{color}</span>
        </div>
    );
}
