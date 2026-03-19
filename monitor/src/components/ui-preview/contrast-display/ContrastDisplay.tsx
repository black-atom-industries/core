import styles from "./ContrastDisplay.module.css";

interface Props {
    ratio: number;
    grade: "AAA" | "AA" | "fail";
}

export function ContrastDisplay({ ratio, grade }: Props) {
    return (
        <div data-component="ContrastDisplay">
            <span className={styles.ratio} data-grade={grade}>
                {ratio.toFixed(2)}:1
            </span>
            <span className={styles.grade} data-grade={grade}>
                {grade}
            </span>
        </div>
    );
}
