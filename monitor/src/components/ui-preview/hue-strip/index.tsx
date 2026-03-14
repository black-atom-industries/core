import styles from "./index.module.css";

interface Props {
    colors: string[];
}

export function HueStrip({ colors }: Props) {
    return (
        <div className={styles.hueStrip} data-component="HueStrip">
            {colors.map((color, i) => (
                <div
                    key={`${i}-${color}`}
                    className={styles.chunk}
                    style={{ background: color }}
                />
            ))}
        </div>
    );
}
