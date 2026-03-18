import type { ThemeSyntaxColors } from "@core/types/theme";
import styles from "./syntax-token-tree.module.css";

type Props = {
    syntax: ThemeSyntaxColors;
};

type SyntaxGroup = Record<string, string | Record<string, string | Record<string, string>>>;

function isHexColor(value: unknown): value is string {
    return typeof value === "string" && value.startsWith("#");
}

function renderLeaf(key: string, color: string, depth: "shallow" | "deep") {
    const rowClass = depth === "shallow" ? styles.leafRow : styles.deepLeafRow;
    return (
        <div key={key} className={rowClass}>
            <span className={styles.leafSwatch} style={{ background: color }} />
            <span>{key}</span>
        </div>
    );
}

function renderGroup(name: string, group: SyntaxGroup[string]) {
    if (isHexColor(group)) {
        return null;
    }

    const entries = Object.entries(group as Record<string, unknown>);

    const firstColor = entries.find(([, v]) => isHexColor(v))?.[1] as string ??
        Object.values(
            entries.find(([, v]) => typeof v === "object")?.[1] as Record<string, string> ?? {},
        )[0] ?? "#888";

    return (
        <div key={name}>
            <div className={styles.groupLabel}>
                <span className={styles.swatch} style={{ background: firstColor }} />
                <span>{name}</span>
            </div>
            {entries.map(([key, value]) => {
                if (isHexColor(value)) {
                    return renderLeaf(key, value, "shallow");
                }
                const subEntries = Object.entries(value as Record<string, unknown>);
                return (
                    <div key={key}>
                        <div className={styles.subGroupLabel}>
                            <span>{key}</span>
                        </div>
                        {subEntries.map(([subKey, subValue]) => {
                            if (isHexColor(subValue)) {
                                return renderLeaf(subKey, subValue, "deep");
                            }
                            return Object.entries(subValue as Record<string, string>).map(
                                ([deepKey, deepValue]) =>
                                    renderLeaf(`${subKey}.${deepKey}`, deepValue, "deep"),
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export function SyntaxTokenTree({ syntax }: Props) {
    return (
        <div className={styles.root} data-component="SyntaxTokenTree">
            {Object.entries(syntax).map(([name, group]) => renderGroup(name, group))}
        </div>
    );
}
