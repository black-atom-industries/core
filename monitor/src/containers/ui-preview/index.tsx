import { useUiPreview } from "./use-ui-preview";
import { ColorTokenGroup } from "../../partials/color-token-group";
import { StatsRow } from "../../partials/stats-row";
import { UiExampleText } from "../../partials/ui-example-text";
import { UiExampleChrome } from "../../partials/ui-example-chrome";
import { UiExampleForm } from "../../partials/ui-example-form";
import { UiExampleBadges } from "../../partials/ui-example-badges";
import styles from "./index.module.css";

interface Props {
    themeKey: string;
}

export function UiPreviewContainer({ themeKey }: Props) {
    const { data, isLoading } = useUiPreview(themeKey);

    if (isLoading || !data) {
        return <div className={styles.loading}>Loading…</div>;
    }

    const { theme, contrast, paletteColors, darkestPrimary, lightestPrimary, notificationColors } =
        data;

    return (
        <div className={styles.page}>
            {/* Section 1: Color tokens */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    {theme.meta.collection.label} :: {theme.meta.name}
                </h2>

                <div className={styles.tokenColumns}>
                    <div className={styles.tokenCol}>
                        <ColorTokenGroup
                            label="Primaries — Dark"
                            tokens={[
                                ["d10", theme.primaries.d10],
                                ["d20", theme.primaries.d20],
                                ["d30", theme.primaries.d30],
                                ["d40", theme.primaries.d40],
                            ]}
                        />
                        <ColorTokenGroup
                            label="Primaries — Mid"
                            tokens={[
                                ["m10", theme.primaries.m10],
                                ["m20", theme.primaries.m20],
                                ["m30", theme.primaries.m30],
                                ["m40", theme.primaries.m40],
                            ]}
                        />
                        <ColorTokenGroup
                            label="Primaries — Light"
                            tokens={[
                                ["l10", theme.primaries.l10],
                                ["l20", theme.primaries.l20],
                                ["l30", theme.primaries.l30],
                                ["l40", theme.primaries.l40],
                            ]}
                        />
                    </div>
                    <div className={styles.tokenCol}>
                        <ColorTokenGroup label="Palette" tokens={Object.entries(theme.palette)} />
                        <ColorTokenGroup
                            label="UI Backgrounds"
                            tokens={Object.entries(theme.ui.bg)}
                        />
                        <ColorTokenGroup
                            label="UI Foregrounds"
                            tokens={Object.entries(theme.ui.fg)}
                        />
                    </div>
                </div>
            </section>

            {/* Sections 2+3: Stats + UI Examples (side-by-side on desktop) */}
            <section className={styles.statsAndExamples}>
                <StatsRow
                    contrast={contrast}
                    paletteColors={paletteColors}
                    darkestPrimary={darkestPrimary}
                    lightestPrimary={lightestPrimary}
                />

                <div className={styles.examples}>
                    <UiExampleText />
                    <UiExampleChrome />
                    <UiExampleForm />
                    <UiExampleBadges
                        success={notificationColors.success}
                        warning={notificationColors.warning}
                        error={notificationColors.error}
                        info={notificationColors.info}
                    />
                </div>
            </section>
        </div>
    );
}
