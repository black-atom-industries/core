import React from "react";
import { Definition } from "../types/theme";

interface EditorPreviewProps {
  theme: Definition | null;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({ theme }) => {
  if (!theme) {
    return (
      <div className="p-4 bg-slate-800 rounded-lg">
        Select a theme to preview
      </div>
    );
  }

  // Create the preview style based on the theme
  const codePreviewStyle = {
    backgroundColor: theme.ui.bg.default,
    color: theme.ui.fg.default,
    padding: "1.5rem",
    borderRadius: "0.5rem",
    fontFamily: "monospace",
    fontSize: "14px",
    lineHeight: "1.5",
    overflow: "auto",
  };

  const keywordStyle = { color: theme.syntax.keyword.default };
  const stringStyle = { color: theme.syntax.string.default };
  const functionStyle = { color: theme.syntax.func.default };
  const typeStyle = { color: theme.syntax.type.default };
  const commentStyle = { color: theme.syntax.comment.default };
  const variableStyle = { color: theme.syntax.variable.default };
  const punctuationStyle = { color: theme.syntax.punctuation.default };
  const numberStyle = { color: theme.syntax.number.default };
  const propertyStyle = { color: theme.syntax.property.default };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Editor Preview</h2>
      <div style={codePreviewStyle}>
        <pre>
          {/* TypeScript Code Sample */}
          <span style={commentStyle}>
            // A sample TypeScript file to preview syntax highlighting
          </span>
          <br />
          <span style={keywordStyle}>import</span>{" "}
          <span style={punctuationStyle}>{"{ "}</span>
          <span style={variableStyle}>useState</span>
          <span style={punctuationStyle}>{", "}</span>
          <span style={variableStyle}>useEffect</span>
          <span style={punctuationStyle}>{" }"}</span>{" "}
          <span style={keywordStyle}>from</span>{" "}
          <span style={stringStyle}>'react'</span>
          <span style={punctuationStyle}>;</span>
          <br />
          <br />
          <span style={keywordStyle}>interface</span>{" "}
          <span style={typeStyle}>ThemeProps</span>{" "}
          <span style={punctuationStyle}>{"{"}</span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={propertyStyle}>name</span>
            <span style={punctuationStyle}>:</span>{" "}
            <span style={typeStyle}>string</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={propertyStyle}>colors</span>
            <span style={punctuationStyle}>:</span>{" "}
            <span style={typeStyle}>Record</span>
            <span style={punctuationStyle}>{"<"}</span>
            <span style={typeStyle}>string</span>
            <span style={punctuationStyle}>{", "}</span>
            <span style={typeStyle}>string</span>
            <span style={punctuationStyle}>{">"}</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <span style={punctuationStyle}>{"}"}</span>
          <br />
          <br />
          <span style={keywordStyle}>function</span>{" "}
          <span style={functionStyle}>ThemeEditor</span>
          <span style={punctuationStyle}>({"<"}</span>
          <span style={typeStyle}>Props</span>
          <span style={punctuationStyle}>{">"}</span>
          <span style={punctuationStyle}>(</span>
          <span style={variableStyle}>props</span>
          <span style={punctuationStyle}>:</span>{" "}
          <span style={typeStyle}>ThemeProps</span>
          <span style={punctuationStyle}>)</span>{" "}
          <span style={punctuationStyle}>{"{"}</span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={keywordStyle}>const</span>{" "}
            <span style={punctuationStyle}>{"["}</span>
            <span style={variableStyle}>count</span>
            <span style={punctuationStyle}>{", "}</span>
            <span style={variableStyle}>setCount</span>
            <span style={punctuationStyle}>{"]"}</span>{" "}
            <span style={punctuationStyle}>=</span>{" "}
            <span style={functionStyle}>useState</span>
            <span style={punctuationStyle}>{"<"}</span>
            <span style={typeStyle}>number</span>
            <span style={punctuationStyle}>{">"}</span>
            <span style={punctuationStyle}>(</span>
            <span style={numberStyle}>0</span>
            <span style={punctuationStyle}>)</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={keywordStyle}>const</span>{" "}
            <span style={variableStyle}>primaryColor</span>{" "}
            <span style={punctuationStyle}>=</span>{" "}
            <span style={variableStyle}>props</span>
            <span style={punctuationStyle}>.</span>
            <span style={propertyStyle}>colors</span>
            <span style={punctuationStyle}>.</span>
            <span style={propertyStyle}>primary</span>{" "}
            <span style={punctuationStyle}>||</span>{" "}
            <span style={stringStyle}>'#000000'</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={keywordStyle}>useEffect</span>
            <span style={punctuationStyle}>(</span>
            <span style={punctuationStyle}>(</span>
            <span style={punctuationStyle}>)</span>{" "}
            <span style={punctuationStyle}>{"=>"}</span>{" "}
            <span style={punctuationStyle}>{"{"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "4rem" }}>
            <span style={commentStyle}>
              // Update document title with theme name
            </span>
          </span>
          <br />
          <span style={{ marginLeft: "4rem" }}>
            <span style={variableStyle}>document</span>
            <span style={punctuationStyle}>.</span>
            <span style={propertyStyle}>title</span>{" "}
            <span style={punctuationStyle}>=</span>{" "}
            <span style={stringStyle}>{"`Theme: ${props.name}`"}</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={punctuationStyle}>{"}"}</span>
            <span style={punctuationStyle}>,</span>{" "}
            <span style={punctuationStyle}>{"["}</span>
            <span style={variableStyle}>props</span>
            <span style={punctuationStyle}>.</span>
            <span style={propertyStyle}>name</span>
            <span style={punctuationStyle}>{"]"}</span>
            <span style={punctuationStyle}>)</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={keywordStyle}>return</span>{" "}
            <span style={punctuationStyle}>(</span>
          </span>
          <br />
          <span style={{ marginLeft: "4rem" }}>
            <span style={punctuationStyle}>{"<"}</span>
            <span style={variableStyle}>div</span>{" "}
            <span style={propertyStyle}>style</span>
            <span style={punctuationStyle}>=</span>
            <span style={punctuationStyle}>{"{"}</span>
            <span style={punctuationStyle}>{"{"}</span>{" "}
            <span style={propertyStyle}>color</span>
            <span style={punctuationStyle}>:</span>{" "}
            <span style={variableStyle}>primaryColor</span>{" "}
            <span style={punctuationStyle}>{"}"}</span>
            <span style={punctuationStyle}>{"}"}</span>
            <span style={punctuationStyle}>{">"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "6rem" }}>
            <span style={punctuationStyle}>{"<"}</span>
            <span style={variableStyle}>h1</span>
            <span style={punctuationStyle}>{">"}</span>
            <span style={variableStyle}>props</span>
            <span style={punctuationStyle}>.</span>
            <span style={propertyStyle}>name</span>
            <span style={punctuationStyle}>{"</"}</span>
            <span style={variableStyle}>h1</span>
            <span style={punctuationStyle}>{">"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "6rem" }}>
            <span style={punctuationStyle}>{"<"}</span>
            <span style={variableStyle}>button</span>{" "}
            <span style={propertyStyle}>onClick</span>
            <span style={punctuationStyle}>=</span>
            <span style={punctuationStyle}>{"{"}</span>
            <span style={punctuationStyle}>(</span>
            <span style={punctuationStyle}>)</span>{" "}
            <span style={punctuationStyle}>{"=>"}</span>{" "}
            <span style={functionStyle}>setCount</span>
            <span style={punctuationStyle}>(</span>
            <span style={variableStyle}>count</span>{" "}
            <span style={punctuationStyle}>+</span>{" "}
            <span style={numberStyle}>1</span>
            <span style={punctuationStyle}>)</span>
            <span style={punctuationStyle}>{"}"}</span>
            <span style={punctuationStyle}>{">"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "8rem" }}>
            <span style={keywordStyle}>Count:</span>{" "}
            <span style={punctuationStyle}>{"{"}</span>
            <span style={variableStyle}>count</span>
            <span style={punctuationStyle}>{"}"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "6rem" }}>
            <span style={punctuationStyle}>{"</"}</span>
            <span style={variableStyle}>button</span>
            <span style={punctuationStyle}>{">"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "4rem" }}>
            <span style={punctuationStyle}>{"</"}</span>
            <span style={variableStyle}>div</span>
            <span style={punctuationStyle}>{">"}</span>
          </span>
          <br />
          <span style={{ marginLeft: "2rem" }}>
            <span style={punctuationStyle}>)</span>
            <span style={punctuationStyle}>;</span>
          </span>
          <br />
          <span style={punctuationStyle}>{"}"}</span>
          <br />
          <br />
          <span style={keywordStyle}>export</span>{" "}
          <span style={keywordStyle}>default</span>{" "}
          <span style={variableStyle}>ThemeEditor</span>
          <span style={punctuationStyle}>;</span>
        </pre>
      </div>
    </div>
  );
};

export default EditorPreview;

