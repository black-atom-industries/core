import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "../../components/placeholder";

export const Route = createFileRoute("/preview/code")({
    component: Component,
});

function Component() {
    return (
        <Placeholder>
            <p>Code Preview — coming soon</p>
        </Placeholder>
    );
}
