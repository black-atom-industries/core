import styles from "./index.module.css";

interface Props {
    color: string;
    label: string;
}

export function ColorSwatch({ color, label }: Props) {
    return (
        <div className={styles.swatch}>
            <div
                className={styles.color}
                style={{ background: color }}
                title={color}
            />
            <span className={styles.label}>{label}</span>
            <span className={styles.colorText} style={{ color }}>{color}</span>
            <span className={styles.hex}>{color}</span>
        </div>
    );
}
