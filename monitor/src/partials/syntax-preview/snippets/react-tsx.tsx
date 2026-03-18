// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function ReactTsxSnippet() {
    return (
        <CodeBlock>
            <span style={s("keyword-import")}>import</span>
            <span style={s("punctuation-bracket")}>{" { "}</span>
            <span style={s("variable-default")}>useState</span>
            <span style={s("punctuation-bracket")}>{" } "}</span>
            <span style={s("keyword-import")}>from</span>{" "}
            <span style={s("string-default")}>"react"</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}
            <span style={s("keyword-default")}>interface</span>{" "}
            <span style={s("type-default")}>BadgeProps</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("property-default")}>label</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>string</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}<span style={s("property-default")}>count</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>number</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("keyword-export")}>export</span>{" "}
            <span style={s("keyword-default")}>function</span>{" "}
            <span style={s("func-default")}>Badge</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("punctuation-bracket")}>{"{ "}</span>
            <span style={s("variable-parameter")}>label</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("variable-parameter")}>count</span>
            <span style={s("punctuation-bracket")}>{" }"}</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>BadgeProps</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("keyword-default")}>const</span>{" "}
            <span style={s("punctuation-bracket")}>[</span>
            <span style={s("variable-default")}>expanded</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("variable-default")}>setExpanded</span>
            <span style={s("punctuation-bracket")}>]</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("func-default")}>useState</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("boolean-default")}>false</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}{"  "}<span style={s("keyword-default")}>const</span>{" "}
            <span style={s("func-default")}>handleClick</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-parameter")}>e</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>React</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("type-default")}>MouseEvent</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("operator-default")}>={">"}</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}<span style={s("variable-parameter")}>e</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>preventDefault</span>
            <span style={s("punctuation-bracket")}>()</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"    "}<span style={s("variable-default")}>setExpanded</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("punctuation-special")}>!</span>
            <span style={s("variable-default")}>expanded</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}{"  "}<span style={s("punctuation-bracket")}>{"}"}</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}{"  "}
            <span style={s("comment-default")}>{"// Render badge with optional details"}</span>
            {"\n"}{"  "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            {"\n"}{"    "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>div</span>{" "}
            <span style={s("tag-attribute")}>className</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"badge"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"      "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>button</span>{" "}
            <span style={s("tag-attribute")}>onClick</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("punctuation-bracket")}>{"{"}</span>
            <span style={s("func-default")}>handleClick</span>
            <span style={s("punctuation-bracket")}>{"}"}</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"        "}<span style={s("punctuation-bracket")}>{"{"}</span>
            <span style={s("variable-parameter")}>label</span>
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {": "}
            <span style={s("punctuation-bracket")}>{"{"}</span>
            <span style={s("variable-parameter")}>count</span>
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}{"      "}<span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>button</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"      "}<span style={s("punctuation-bracket")}>{"{"}</span>
            <span style={s("variable-default")}>expanded</span>{" "}
            <span style={s("operator-default")}>&&</span>{" "}
            <span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-default")}>Badge</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("tag-default")}>Detail</span>{" "}
            <span style={s("tag-attribute")}>count</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("punctuation-bracket")}>{"{"}</span>
            <span style={s("variable-parameter")}>count</span>
            <span style={s("punctuation-bracket")}>{"}"}</span>{" "}
            <span style={s("tag-delimiter")}>{"/>"}</span>
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}{"    "}<span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>div</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"  "}<span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
        </CodeBlock>
    );
}
