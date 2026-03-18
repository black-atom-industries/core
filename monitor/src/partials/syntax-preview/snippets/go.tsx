// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function GoSnippet() {
    return (
        <CodeBlock>
            <span style={s("keyword-default")}>package</span>{" "}
            <span style={s("module-default")}>server</span>
            {"\n\n"}
            <span style={s("keyword-import")}>import</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            {"\n"}{"  "}<span style={s("string-default")}>"fmt"</span>
            {"\n"}{"  "}<span style={s("string-default")}>"sync"</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>)</span>
            {"\n\n"}
            <span style={s("keyword-default")}>const</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            {"\n"}{"  "}<span style={s("constant-default")}>MaxConns</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("number-default")}>100</span>
            {"\n"}{"  "}<span style={s("constant-default")}>Timeout</span>{" "}
            <span style={s("operator-default")}>=</span> <span style={s("number-default")}>30</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>)</span>
            {"\n\n"}
            <span style={s("comment-doc")}>
                {"// Handler defines the request handler interface."}
            </span>
            {"\n"}
            <span style={s("keyword-default")}>type</span>{" "}
            <span style={s("type-default")}>Handler</span>{" "}
            <span style={s("keyword-default")}>interface</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("func-default")}>Serve</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-parameter")}>addr</span>{" "}
            <span style={s("type-builtin")}>string</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("type-builtin")}>error</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("keyword-default")}>type</span>{" "}
            <span style={s("type-default")}>Server</span>{" "}
            <span style={s("keyword-default")}>struct</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("property-default")}>mu</span>{"      "}
            <span style={s("type-default")}>sync</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("type-default")}>Mutex</span>
            {"\n"}{"  "}<span style={s("property-default")}>conns</span>{"   "}
            <span style={s("type-builtin")}>int</span>
            {"\n"}{"  "}<span style={s("property-default")}>running</span>{" "}
            <span style={s("type-builtin")}>bool</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n\n"}
            <span style={s("comment-default")}>
                {"// Start launches the server and returns any errors."}
            </span>
            {"\n"}
            <span style={s("keyword-default")}>func</span>{" "}
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-parameter")}>s</span>{" "}
            <span style={s("operator-default")}>*</span>
            <span style={s("type-default")}>Server</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("func-default")}>Start</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-parameter")}>addr</span>{" "}
            <span style={s("type-builtin")}>string</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("type-builtin")}>error</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"  "}<span style={s("variable-parameter")}>s</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-member")}>mu</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>Lock</span>
            <span style={s("punctuation-bracket")}>()</span>
            {"\n"}{"  "}<span style={s("variable-parameter")}>s</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-member")}>running</span>{" "}
            <span style={s("operator-default")}>=</span>{" "}
            <span style={s("boolean-default")}>true</span>
            {"\n"}{"  "}<span style={s("variable-parameter")}>s</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-member")}>mu</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>Unlock</span>
            <span style={s("punctuation-bracket")}>()</span>
            {"\n\n"}{"  "}
            <span style={s("comment-todo")}>{"// TODO: handle graceful shutdown"}</span>
            {"\n"}{"  "}<span style={s("keyword-default")}>go</span>{" "}
            <span style={s("keyword-default")}>func</span>
            <span style={s("punctuation-bracket")}>()</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}<span style={s("module-default")}>fmt</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>Println</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("string-default")}>"listening on"</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("variable-parameter")}>addr</span>
            <span style={s("punctuation-bracket")}>)</span>
            {"\n"}{"  "}<span style={s("punctuation-bracket")}>{"}"}</span>
            <span style={s("punctuation-bracket")}>()</span>
            {"\n\n"}{"  "}<span style={s("keyword-default")}>if</span>{" "}
            <span style={s("variable-parameter")}>s</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-member")}>conns</span>{" "}
            <span style={s("operator-default")}>{">"}</span>{" "}
            <span style={s("constant-default")}>MaxConns</span>
            <span style={s("punctuation-bracket")}>{" {"}</span>
            {"\n"}{"    "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("module-default")}>fmt</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>Errorf</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("string-default")}>"max connections exceeded"</span>
            <span style={s("punctuation-bracket")}>)</span>
            {"\n"}{"  "}<span style={s("punctuation-bracket")}>{"}"}</span>
            {"\n"}{"  "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("constant-builtin")}>nil</span>
            {"\n"}
            <span style={s("punctuation-bracket")}>{"}"}</span>
        </CodeBlock>
    );
}
