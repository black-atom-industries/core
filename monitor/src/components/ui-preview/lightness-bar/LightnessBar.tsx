import styles from "./LightnessBar.module.css";

interface Props {
    from: string;
    to: string;
}

export function LightnessBar({ from, to }: Props) {
    return (
        <div
            className={styles.lightnessBar}
            data-component="LightnessBar"
            style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
        />
    );
}
