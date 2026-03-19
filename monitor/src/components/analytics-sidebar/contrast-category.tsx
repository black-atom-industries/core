import type { ContrastCategory as ContrastCategoryType } from "@core/lib/contrast-analysis.ts";
import { ContrastPairRow } from "./contrast-pair-row";
import styles from "./AnalyticsSidebar.module.css";

type Props = { category: ContrastCategoryType };

export function ContrastCategory({ category }: Props) {
    return (
        <div className={styles.category}>
            <div className={styles.categoryLabel}>{category.name}</div>
            {category.pairs.map((pair) => (
                <ContrastPairRow key={`${pair.fg.key}-${pair.bg.key}`} pair={pair} />
            ))}
        </div>
    );
}
