import { Link } from "@tanstack/react-router";
import styles from "./index.module.css";

export function Logo() {
    return (
        <Link
            to="/"
            search={(s) => ({ ...s, themeKey: s.themeKey })}
            className={styles.logo}
            data-component="Logo"
        >
            <strong>Black&nbsp;Atom</strong> Monitor
        </Link>
    );
}
