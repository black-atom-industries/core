import styles from "./TypographyExample.module.css";

export function TypographyExample() {
    return (
        <div className={styles.content} data-component="TypographyExample">
            <h1 className={styles.h1}>Heading One</h1>
            <h2 className={styles.h2}>Heading Two</h2>
            <h3 className={styles.h3}>Heading Three</h3>
            <p className={styles.body}>
                Body text with{" "}
                <a className={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                    an accent link
                </a>{" "}
                and <code className={styles.code}>inline code</code> for emphasis.
            </p>
            <blockquote className={styles.blockquote}>
                A blockquote shows subtle foreground and a left border accent.
            </blockquote>
        </div>
    );
}
