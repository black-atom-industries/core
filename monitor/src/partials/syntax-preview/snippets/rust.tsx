// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function RustSnippet() {
    return (
        <CodeBlock>
            <span style={s("keyword-import")}>use</span>{" "}
            <span style={s("module-default")}>std</span>
            <span style={s("operator-default")}>::</span>
            <span style={s("module-default")}>collections</span>
            <span style={s("operator-default")}>::</span>
            <span style={s("type-default")}>HashMap</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}
            <span style={s("attribute-default")}>{"#[derive(Debug, Clone)]"}</span>
            {"\n"}
            <span style={s("keyword-export")}>pub</span>{" "}
            <span style={s("keyword-default")}>struct</span>{" "}
            <span style={s("type-default")}>Config</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("property-default")}>name</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>String</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"  "}<span style={s("property-default")}>max_retries</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>u32</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"  "}<span style={s("property-default")}>enabled</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>bool</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("keyword-default")}>const</span>{" "}
            <span style={s("constant-default")}>MAX_SIZE</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>usize</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("number-default")}>1024</span>
            <span style={s("punctuation-delimiter")}>;</span>
            {"\n\n"}
            <span style={s("keyword-default")}>impl</span>{" "}
            <span style={s("type-default")}>Config</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}
            <span style={s("comment-doc")}>{"/// Creates a new Config instance"}</span>
            {"\n"}{"  "}
            <span style={s("keyword-export")}>pub</span>{" "}
            <span style={s("keyword-default")}>fn</span>{" "}
            <span style={s("constructor-default")}>new</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-parameter")}>name</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("operator-default")}>&</span>
            <span style={s("type-builtin")}>str</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("operator-default")}>{"->"}</span>{" "}
            <span style={s("type-default")}>Self</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}
            <span style={s("type-default")}>Config</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"      "}
            <span style={s("property-default")}>name</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("variable-parameter")}>name</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>to_string</span>
            <span style={s("punctuation-bracket")}>()</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"      "}
            <span style={s("property-default")}>max_retries</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("number-default")}>3</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"      "}
            <span style={s("property-default")}>enabled</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("boolean-default")}>true</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"    "}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}{"  "}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}{"  "}
            <span style={s("keyword-export")}>pub</span>{" "}
            <span style={s("keyword-default")}>fn</span>{" "}
            <span style={s("func-default")}>process</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("operator-default")}>&</span>
            <span style={s("variable-builtin")}>self</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("variable-parameter")}>value</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>i32</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("operator-default")}>{"->"}</span>{" "}
            <span style={s("type-builtin")}>i32</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}
            <span style={s("comment-todo")}>{"// TODO: implement caching"}</span>
            {"\n"}{"    "}
            <span style={s("keyword-default")}>match</span>{" "}
            <span style={s("variable-parameter")}>value</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"      "}
            <span style={s("number-default")}>0</span>{" "}
            <span style={s("operator-default")}>={">"}</span>{" "}
            <span style={s("func-builtin")}>println!</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("string-default")}>"zero"</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"      "}
            <span style={s("variable-default")}>n</span>{" "}
            <span style={s("operator-default")}>={">"}</span>{" "}
            <span style={s("func-builtin")}>println!</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("string-default")}>"value: </span>
            <span style={s("string-escape")}>{"{}"}</span>
            <span style={s("string-default")}>"</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("variable-default")}>n</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-delimiter")}>,</span>
            {"\n"}{"    "}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}{"    "}
            <span style={s("variable-parameter")}>value</span>{" "}
            <span style={s("operator-default")}>+</span>{" "}
            <span style={s("number-default")}>1</span>
            {"\n"}{"  "}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
        </CodeBlock>
    );
}
