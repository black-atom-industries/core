// monitor/src/routes/preview/syntax.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "../../components/placeholder";

export const Route = createFileRoute("/preview/syntax")({
    component: Component,
});

function Component() {
    return (
        <Placeholder>
            <p>Syntax Preview — loading…</p>
        </Placeholder>
    );
}
