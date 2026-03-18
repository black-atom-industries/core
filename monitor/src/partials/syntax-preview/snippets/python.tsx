// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function PythonSnippet() {
    return (
        <CodeBlock>
            <span style={s("keyword-import")}>import</span>{" "}
            <span style={s("module-default")}>re</span>
            {"\n"}
            <span style={s("keyword-import")}>from</span>{" "}
            <span style={s("module-default")}>dataclasses</span>{" "}
            <span style={s("keyword-import")}>import</span>{" "}
            <span style={s("type-default")}>dataclass</span>
            {"\n\n"}
            <span style={s("variable-default")}>PATTERN</span>{" "}
            <span style={s("operator-default")}>=</span> <span style={s("module-default")}>re</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("func-method")}>compile</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("string-regexp")}>{'r"^[a-z]+@[a-z]+\\.\\w{2,}$"'}</span>
            <span style={s("punctuation-bracket")}>)</span>
            {"\n\n"}
            <span style={s("attribute-default")}>@dataclass</span>
            {"\n"}
            <span style={s("keyword-default")}>class</span>{" "}
            <span style={s("type-default")}>User</span>
            <span style={s("punctuation-delimiter")}>:</span>
            {"\n"}{"  "}
            <span style={s("string-doc")}>{'"""Represents an authenticated user."""'}</span>
            {"\n\n"}{"  "}<span style={s("property-default")}>name</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>str</span>
            {"\n"}{"  "}<span style={s("property-default")}>age</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>int</span>
            {"\n"}{"  "}<span style={s("property-default")}>active</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-builtin")}>bool</span> <span style={s("operator-default")}>=</span>
            {" "}
            <span style={s("boolean-default")}>True</span>
            {"\n\n"}{"  "}<span style={s("keyword-default")}>def</span>{" "}
            <span style={s("func-default")}>validate</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-builtin")}>self</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("operator-default")}>{"->"}</span>{" "}
            <span style={s("type-builtin")}>bool</span>
            <span style={s("punctuation-delimiter")}>:</span>
            {"\n"}{"    "}<span style={s("comment-default")}>{"# Check email pattern"}</span>
            {"\n"}{"    "}<span style={s("keyword-default")}>if</span>{" "}
            <span style={s("variable-builtin")}>self</span>
            <span style={s("punctuation-delimiter")}>.</span>
            <span style={s("variable-member")}>age</span>{" "}
            <span style={s("operator-default")}>{"<"}</span>{" "}
            <span style={s("number-default")}>0</span>
            <span style={s("punctuation-delimiter")}>:</span>
            {"\n"}{"      "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("boolean-default")}>False</span>
            {"\n"}{"    "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("boolean-default")}>True</span>
            {"\n\n\n"}
            <span style={s("keyword-default")}>def</span>{" "}
            <span style={s("func-default")}>greet</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-parameter")}>user</span>
            <span style={s("punctuation-delimiter")}>:</span>{" "}
            <span style={s("type-default")}>User</span>
            <span style={s("punctuation-bracket")}>)</span>{" "}
            <span style={s("operator-default")}>{"->"}</span>{" "}
            <span style={s("type-builtin")}>str</span>
            <span style={s("punctuation-delimiter")}>:</span>
            {"\n"}{"  "}<span style={s("keyword-default")}>return</span>{" "}
            <span style={s("string-default")}>{'f"'}</span>
            <span style={s("string-default")}>Hello,</span>
            <span style={s("string-escape")}>{"{user.name}"}</span>
            <span style={s("string-default")}>{'"'}</span>
            {"\n\n\n"}
            <span style={s("keyword-default")}>if</span>{" "}
            <span style={s("variable-builtin")}>__name__</span>{" "}
            <span style={s("operator-default")}>==</span>{" "}
            <span style={s("string-default")}>"__main__"</span>
            <span style={s("punctuation-delimiter")}>:</span>
            {"\n"}{"  "}<span style={s("variable-default")}>user</span>{" "}
            <span style={s("operator-default")}>=</span> <span style={s("type-default")}>User</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("string-default")}>"Alice"</span>
            <span style={s("punctuation-delimiter")}>,</span>{" "}
            <span style={s("number-default")}>30</span>
            <span style={s("punctuation-bracket")}>)</span>
            {"\n"}{"  "}<span style={s("func-builtin")}>print</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("func-default")}>greet</span>
            <span style={s("punctuation-bracket")}>(</span>
            <span style={s("variable-default")}>user</span>
            <span style={s("punctuation-bracket")}>)</span>
            <span style={s("punctuation-bracket")}>)</span>
        </CodeBlock>
    );
}
