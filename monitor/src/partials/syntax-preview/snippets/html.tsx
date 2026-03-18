// deno-lint-ignore-file jsx-curly-braces
import { CodeBlock } from "../../../components/syntax-preview/code-block";

const s = (varName: string) => ({ color: `var(--ba-syntax-${varName})` });

export function HtmlSnippet() {
    return (
        <CodeBlock>
            <span style={s("punctuation-special")}>{"<!"}</span>
            <span style={s("keyword-default")}>DOCTYPE</span>{" "}
            <span style={s("tag-attribute")}>html</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}
            <span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>html</span> <span style={s("tag-attribute")}>lang</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"en"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}
            <span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>head</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>meta</span>{" "}
            <span style={s("tag-attribute")}>charset</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"UTF-8"</span>{" "}
            <span style={s("tag-delimiter")}>{"/>"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>meta</span> <span style={s("tag-attribute")}>name</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"viewport"</span>{" "}
            <span style={s("tag-attribute")}>content</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"width=device-width"</span>{" "}
            <span style={s("tag-delimiter")}>{"/>"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>title</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"Black Atom"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>title</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>link</span> <span style={s("tag-attribute")}>rel</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"stylesheet"</span>{" "}
            <span style={s("tag-attribute")}>href</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"styles.css"</span>{" "}
            <span style={s("tag-delimiter")}>{"/>"}</span>
            {"\n"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>head</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}
            <span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>body</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"  "}<span style={s("comment-default")}>{"<!-- Main navigation -->"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>nav</span> <span style={s("tag-attribute")}>class</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"nav-bar"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"    "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>a</span> <span style={s("tag-attribute")}>href</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"/"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"Home"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>a</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"    "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>a</span> <span style={s("tag-attribute")}>href</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"#about"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"About"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>a</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>nav</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n\n"}{"  "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>main</span> <span style={s("tag-attribute")}>id</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"content"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"    "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>form</span>{" "}
            <span style={s("tag-attribute")}>action</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>/submit</span>{" "}
            <span style={s("tag-attribute")}>method</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"post"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"      "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>input</span> <span style={s("tag-attribute")}>type</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"text"</span>{" "}
            <span style={s("tag-attribute")}>name</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"query"</span>{" "}
            <span style={s("tag-attribute")}>required</span>{" "}
            <span style={s("tag-delimiter")}>{"/>"}</span>
            {"\n"}{"      "}<span style={s("tag-delimiter")}>{"<"}</span>
            <span style={s("tag-builtin")}>button</span>{" "}
            <span style={s("tag-attribute")}>type</span>
            <span style={s("operator-default")}>=</span>
            <span style={s("string-default")}>"submit"</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"Search"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>button</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"    "}<span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>form</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}{"  "}<span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>main</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>body</span>
            <span style={s("tag-delimiter")}>{">"}</span>
            {"\n"}
            <span style={s("tag-delimiter")}>{"</"}</span>
            <span style={s("tag-builtin")}>html</span>
            <span style={s("tag-delimiter")}>{">"}</span>
        </CodeBlock>
    );
}
