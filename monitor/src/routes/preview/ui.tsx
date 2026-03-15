import { createFileRoute } from "@tanstack/react-router";
import { UiPreviewContainer } from "../../containers/ui-preview";

export const Route = createFileRoute("/preview/ui")({
    component: UiPreviewContainer,
});
