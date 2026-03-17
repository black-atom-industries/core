import type { ThemeContrastAnalysis } from "@core/lib/contrast-analysis.ts";
import { PassRateSummary } from "./pass-rate-summary";
import { WorstPairCard } from "./worst-pair-card";
import { ContrastCategory } from "./contrast-category";
import styles from "./index.module.css";

type Props = { analysis: ThemeContrastAnalysis };

export function AnalyticsSidebar({ analysis }: Props) {
    return (
        <div className={styles.root}>
            <PassRateSummary aa={analysis.passRate.aa} aaa={analysis.passRate.aaa} />
            <WorstPairCard pair={analysis.worstPair} />
            <div className={styles.divider} />
            {analysis.categories.map((cat) => <ContrastCategory key={cat.name} category={cat} />)}
        </div>
    );
}
