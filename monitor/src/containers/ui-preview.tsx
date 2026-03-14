import { useUiPreview } from "../hooks/use-ui-preview";
import { Placeholder } from "../components/placeholder";
import { Examples } from "../components/ui-preview/examples";
import { Page } from "../components/ui-preview/page";
import { Section } from "../components/ui-preview/section";
import { SectionTitle } from "../components/ui-preview/section-title";
import { StatsAndExamples } from "../components/ui-preview/stats-and-examples";
import { TokenCol } from "../components/ui-preview/token-col";
import { TokenColumns } from "../components/ui-preview/token-columns";
import { ColorTokenGroup } from "../partials/ui-preview/color-token-group";
import { StatsRow } from "../partials/ui-preview/stats-row";
import { UiExampleBadges } from "../partials/ui-preview/ui-example-badges";
import { UiExampleChrome } from "../partials/ui-preview/ui-example-chrome";
import { UiExampleForm } from "../partials/ui-preview/ui-example-form";
import { UiExampleText } from "../partials/ui-preview/ui-example-text";

interface Props {
    themeKey: string;
}

export function UiPreviewContainer({ themeKey }: Props) {
    const { data, isLoading } = useUiPreview(themeKey);

    if (isLoading || !data) {
        return (
            <Placeholder minHeight={200}>
                <p>Loading…</p>
            </Placeholder>
        );
    }

    const { theme, contrast, paletteColors, darkestPrimary, lightestPrimary, notificationColors } =
        data;

    return (
        <Page>
            {/* Section 1: Color tokens */}
            <Section>
                <SectionTitle>
                    {theme.meta.collection.label} :: {theme.meta.name}
                </SectionTitle>

                <TokenColumns>
                    <TokenCol>
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
                    </TokenCol>
                    <TokenCol>
                        <ColorTokenGroup label="Palette" tokens={Object.entries(theme.palette)} />
                        <TokenColumns>
                            <ColorTokenGroup
                                label="UI Backgrounds"
                                tokens={Object.entries(theme.ui.bg)}
                            />
                            <ColorTokenGroup
                                label="UI Foregrounds"
                                tokens={Object.entries(theme.ui.fg)}
                                swatchType="foreground"
                            />
                        </TokenColumns>
                    </TokenCol>
                </TokenColumns>
            </Section>

            {/* Sections 2+3: Stats + UI Examples (side-by-side on desktop) */}
            <StatsAndExamples>
                <StatsRow
                    contrast={contrast}
                    paletteColors={paletteColors}
                    darkestPrimary={darkestPrimary}
                    lightestPrimary={lightestPrimary}
                />

                <Examples>
                    <UiExampleText />
                    <UiExampleChrome />
                    <UiExampleForm />
                    <UiExampleBadges
                        success={notificationColors.success}
                        warning={notificationColors.warning}
                        error={notificationColors.error}
                        info={notificationColors.info}
                    />
                </Examples>
            </StatsAndExamples>
        </Page>
    );
}
