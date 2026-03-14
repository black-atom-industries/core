import { ExampleSection } from "../../components/ui-preview/example-section";
import { StatusItem } from "../../components/ui-preview/status-item";
import { StatusList } from "../../components/ui-preview/status-list";

interface Props {
    success: string;
    warning: string;
    error: string;
    info: string;
}

export function UiExampleBadges({ success, warning, error, info }: Props) {
    const states = [
        { label: "success", color: success, message: "Something happened" },
        { label: "warning", color: warning, message: "Something happened" },
        { label: "error", color: error, message: "Something went wrong" },
        { label: "info", color: info, message: "Something happened" },
    ];

    return (
        <ExampleSection label="Notifications">
            <StatusList>
                {states.map(({ label, color, message }) => (
                    <StatusItem key={label} color={color} label={label} message={message} />
                ))}
            </StatusList>
        </ExampleSection>
    );
}
