import { useState } from "react";
import styles from "./index.module.css";

interface Props {
    color: string;
    label: string;
}

export function ColorSwatch({ color, label }: Props) {
    const [copied, setCopied] = useState(false);

    function handleClick() {
        navigator.clipboard.writeText(color).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        });
    }

    return (
        <div className={styles.swatch} onClick={handleClick} title="Click to copy">
            <div
                className={styles.color}
                style={{ background: color }}
            />
            <span className={styles.label}>{copied ? "copied!" : label}</span>
            <span className={styles.colorText} style={{ color }}>{color}</span>
            <span className={styles.hex}>{color}</span>
        </div>
    );
}
