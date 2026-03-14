import styles from "./index.module.css";

interface Props {
    from: string;
    to: string;
}

export function LightnessBar({ from, to }: Props) {
    return (
        <div
            className={styles.lightnessBar}
            style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
        />
    );
}
