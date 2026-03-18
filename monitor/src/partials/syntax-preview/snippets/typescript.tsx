// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function TypeScriptSnippet() {
    return (
        <CodeBlock>
            <span style={s("keyword-import")}>import</span>
            <span style={s("punctuation-bracket")}>{" { "}</span>
            <span style={s("type-default")}>EventEmitter</span>
            <span style={s("punctuation-bracket")}>{" } "}</span>
            <span style={s("keyword-import")}>from</span>{" "}
            <span style={s("string-default")}>"node:events"</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}
            <span style={s("comment-doc")}>{"/** Configuration for the processor */"}</span>
            {"\n"}
            <span style={s("keyword-default")}>interface</span>{" "}
            <span style={s("type-default")}>Config</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("property-default")}>name</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>string</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}<span style={s("property-default")}>maxRetries</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>number</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}<span style={s("property-default")}>enabled</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>boolean</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("keyword-default")}>const</span>{" "}
            <span style={s("variable-default")}>MAX_ITEMS</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("number-default")}>100</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("keyword-default")}>const</span>{" "}
            <span style={s("variable-default")}>isDebug</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("boolean-default")}>true</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}
            <span style={s("comment-doc")}>{"/** Process items with retry logic */"}</span>
            {"\n"}
            <span style={s("keyword-default")}>async</span>{" "}
            <span style={s("keyword-default")}>function</span>{" "}
            <span style={s("func-default")}>processItems</span>
            <span style={s("punctuation-bracket")}>{"<"}</span>
            <span style={s("type-default")}>T</span>
            <span style={s("punctuation-bracket")}>{">"}</span>
            <span style={s("punctuation-bracket")}>(</span>
            {"\n"}{"  "}<span style={s("variable-parameter")}>items</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>T</span>
            <span style={s("punctuation-bracket")}>[]</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"  "}<span style={s("variable-parameter")}>config</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>Config</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>Promise</span>
            <span style={s("punctuation-bracket")}>{"<"}</span>
            <span style={s("type-default")}>T</span>
            <span style={s("punctuation-bracket")}>{"[]>"}</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("keyword-default")}>const</span>{" "}
            <span style={s("variable-default")}>results</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>T</span>
            <span style={s("punctuation-bracket")}>[]</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("punctuation-bracket")}>[]</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}{"  "}<span style={s("keyword-default")}>for</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("keyword-default")}>const</span>{" "}
            <span style={s("variable-default")}>item</span>{" "}
            <span style={s("keyword-default")}>of</span>{" "}
            <span style={s("variable-default")}>items</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}<span style={s("comment-todo")}>{"// TODO: add rate limiting"}</span>
            {"\n"}{"    "}<span style={s("variable-default")}>results</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>push</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-default")}>item</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}<span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}{"  "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("variable-default")}>results</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
        </CodeBlock>
    );
}
