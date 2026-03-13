import { ColorSwatch } from "../../components/color-swatch";
import styles from "./index.module.css";

interface Props {
    label: string;
    tokens: Record<string, string>;
}

export function ColorTokenGroup({ label, tokens }: Props) {
    return (
        <div className={styles.group}>
            <div className={styles.label}>{label}</div>
            <div className={styles.swatches}>
                {Object.entries(tokens).map(([name, color]) => (
                    <ColorSwatch key={name} color={color} label={name} />
                ))}
            </div>
        </div>
    );
}
