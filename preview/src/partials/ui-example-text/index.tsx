import styles from "./index.module.css";

export function UiExampleText() {
    return (
        <div className={styles.example}>
            <div className={styles.label}>Text Content</div>
            <div className={styles.content}>
                <h1 className={styles.h1}>Heading One</h1>
                <h2 className={styles.h2}>Heading Two</h2>
                <h3 className={styles.h3}>Heading Three</h3>
                <p className={styles.body}>
                    Body text with{" "}
                    <a className={styles.link} href="#">
                        an accent link
                    </a>{" "}
                    and <code className={styles.code}>inline code</code> for emphasis.
                </p>
                <blockquote className={styles.blockquote}>
                    A blockquote shows subtle foreground and a left border accent.
                </blockquote>
            </div>
        </div>
    );
}
