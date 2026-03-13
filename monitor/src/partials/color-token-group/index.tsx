import { ColorSwatch } from "../../components/color-swatch";
import styles from "./index.module.css";

interface Props {
    label: string;
    tokens: [string, string][];
    swatchType?: "background" | "foreground";
}

export function ColorTokenGroup({ label, tokens, swatchType = "background" }: Props) {
    return (
        <div className={styles.group}>
            <div className={styles.label}>{label}</div>
            <div className={styles.swatches}>
                {tokens.map(([name, color]) => (
                    <ColorSwatch
                        key={name}
                        color={color}
                        label={name}
                        type={swatchType}
                    />
                ))}
            </div>
        </div>
    );
}
