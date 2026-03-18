import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useTheme } from "../../queries/themes";
import { Placeholder } from "../../components/placeholder";
import { Page } from "../../components/ui-preview/page";
import { Section } from "../../components/ui-preview/section";
import { SectionTitle } from "../../components/ui-preview/section-title";
import { SyntaxTokenTree } from "../../components/syntax-preview/syntax-token-tree";
import { LanguageTabs } from "../../components/syntax-preview/language-tabs";
import { TypeScriptSnippet } from "../../partials/syntax-preview/snippets/typescript";
import styles from "./syntax.module.css";

export const Route = createFileRoute("/preview/syntax")({
    component: Component,
});

function Component() {
    const { themeKey } = useSearch({ from: "__root__" });
    const { data: theme, isLoading } = useTheme(themeKey);

    if (isLoading || !theme) {
        return (
            <Placeholder minHeight={200}>
                <p>Loading…</p>
            </Placeholder>
        );
    }

    const languages = [
        { key: "typescript", label: "TypeScript", content: <TypeScriptSnippet /> },
    ];

    return (
        <Page>
            <Section>
                <SectionTitle>
                    {theme.meta.collection.label} :: {theme.meta.name}
                </SectionTitle>
                <div className={styles.layout}>
                    <SyntaxTokenTree syntax={theme.syntax} />
                    <LanguageTabs languages={languages} />
                </div>
            </Section>
        </Page>
    );
}
