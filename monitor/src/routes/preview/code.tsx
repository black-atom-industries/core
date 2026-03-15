import { createFileRoute } from "@tanstack/react-router";
import { CodePreviewContainer } from "../../containers/code-preview";

export const Route = createFileRoute("/preview/code")({
    component: CodePreviewContainer,
});
