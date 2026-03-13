import styles from "./index.module.css";

export function UiExampleChrome() {
    return (
        <div className={styles.example}>
            <div className={styles.label}>App Chrome</div>
            <div className={styles.chrome}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarItem} data-active="true">Dashboard</div>
                    <div className={styles.sidebarItem}>Settings</div>
                    <div className={styles.sidebarItem}>Profile</div>
                </aside>
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>Dashboard</div>
                    <div className={styles.panelContent}>
                        <div className={styles.card}>Content area</div>
                        <div className={styles.card}>Another panel</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
