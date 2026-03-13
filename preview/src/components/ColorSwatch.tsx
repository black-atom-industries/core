import styles from "./ColorSwatch.module.css";

interface Props {
    color: string;
    label: string;
    size?: number;
}

export function ColorSwatch({ color, label, size = 56 }: Props) {
    return (
        <div className={styles.swatch}>
            <div
                className={styles.color}
                style={{ width: size, height: size, background: color }}
                title={`${label}: ${color}`}
            />
            <span className={styles.label}>{label}</span>
            <span className={styles.hex}>{color}</span>
        </div>
    );
}
