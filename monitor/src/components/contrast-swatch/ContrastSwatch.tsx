import styles from "./ContrastSwatch.module.css";

interface Props {
    fgColor: string;
    bgColor: string;
}

export function ContrastSwatch({ fgColor, bgColor }: Props) {
    return (
        <span
            className={styles.swatch}
            data-component="ContrastSwatch"
            style={{ background: bgColor, color: fgColor }}
        >
            Aa
        </span>
    );
}
