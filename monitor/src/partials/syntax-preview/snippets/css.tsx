// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function CssSnippet() {
    return (
        <CodeBlock>
            <span style={s("comment-default")}>{"/* Design tokens */"}</span>
            {"\n"}
            <span style={s("punctuation-special")}>:</span>
            <span style={s("func-builtin")}>root</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>--color-primary</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("string-default")}>#1a1a2e</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>--spacing-md</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("number-default")}>1rem</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>--radius</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("number-default")}>0.5rem</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-default")}>container</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>display</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("keyword-default")}>grid</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>gap</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("func-default")}>var</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("property-default")}>--spacing-md</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>padding</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("func-default")}>calc</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("number-default")}>2rem</span>{" "}
            <span style={s("operator-default")}>*</span>{" "}
            <span style={s("number-default")}>1.5</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>border-radius</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("func-default")}>var</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("property-default")}>--radius</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>background</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("func-default")}>color-mix</span>
            <span style={s("punctuation-bracket")}>(</span>
            {"\n"}{"    "}
            <span style={s("keyword-default")}>in</span>{" "}
            <span style={s("variable-default")}>oklch</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("func-default")}>var</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("property-default")}>--color-primary</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("number-default")}>80%</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"    "}
            <span style={s("keyword-default")}>transparent</span>
            {"\n"}{"  "}
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>transition</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("variable-default")}>opacity</span>{" "}
            <span style={s("number-default")}>200ms</span>{" "}
            <span style={s("keyword-default")}>ease-out</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-default")}>container</span>
            <span style={s("punctuation-delimiter")}>:</span>
            <span style={s("func-builtin")}>hover</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}
            <span style={s("property-default")}>opacity</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("number-default")}>0.9</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("keyword-default")}>@media</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("property-default")}>min-width</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("number-default")}>768px</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-default")}>container</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}
            <span style={s("property-default")}>grid-template-columns</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("func-default")}>repeat</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("number-default")}>3</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("number-default")}>1fr</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"    "}
            <span style={s("property-default")}>max-width</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("number-default")}>1200px</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
        </CodeBlock>
    );
}
