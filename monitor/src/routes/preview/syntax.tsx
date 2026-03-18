import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useTheme } from "../../queries/themes";
import { Placeholder } from "../../components/placeholder";
import { Page } from "../../components/ui-preview/page";
import { Section } from "../../components/ui-preview/section";
import { SectionTitle } from "../../components/ui-preview/section-title";
import { SyntaxTokenTree } from "../../components/syntax-preview/syntax-token-tree";
import { LanguageTabs } from "../../components/syntax-preview/language-tabs";
import { SyntaxPreviewLayout } from "../../components/syntax-preview/syntax-preview-layout";
import { TypeScriptSnippet } from "../../partials/syntax-preview/snippets/typescript";
import { RustSnippet } from "../../partials/syntax-preview/snippets/rust";
import { PythonSnippet } from "../../partials/syntax-preview/snippets/python";
import { GoSnippet } from "../../partials/syntax-preview/snippets/go";
import { ReactTsxSnippet } from "../../partials/syntax-preview/snippets/react-tsx";
import { HtmlSnippet } from "../../partials/syntax-preview/snippets/html";
import { CssSnippet } from "../../partials/syntax-preview/snippets/css";

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
        { key: "rust", label: "Rust", content: <RustSnippet /> },
        { key: "python", label: "Python", content: <PythonSnippet /> },
        { key: "go", label: "Go", content: <GoSnippet /> },
        { key: "react", label: "React", content: <ReactTsxSnippet /> },
        { key: "html", label: "HTML", content: <HtmlSnippet /> },
        { key: "css", label: "CSS", content: <CssSnippet /> },
    ];

    return (
        <Page>
            <Section>
                <SectionTitle>
                    {theme.meta.collection.label} :: {theme.meta.name}
                </SectionTitle>
                <SyntaxPreviewLayout>
                    <SyntaxTokenTree syntax={theme.syntax} />
                    <LanguageTabs languages={languages} />
                </SyntaxPreviewLayout>
            </Section>
        </Page>
    );
}
