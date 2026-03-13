import styles from "./index.module.css";

export function UiExampleForm() {
    return (
        <div className={styles.example}>
            <div className={styles.label}>Form Elements</div>
            <div className={styles.form}>
                <input
                    className={styles.input}
                    placeholder="Input field"
                    readOnly
                />
                <div className={styles.buttons}>
                    <button type="button" className={styles.btnPrimary}>
                        Primary
                    </button>
                    <button type="button" className={styles.btnSecondary}>
                        Secondary
                    </button>
                    <button type="button" className={styles.btnSecondary} disabled>
                        Disabled
                    </button>
                </div>
            </div>
        </div>
    );
}
