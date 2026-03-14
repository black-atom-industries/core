import { Button } from "../../components/ui-preview/button";
import { ButtonGroup } from "../../components/ui-preview/button-group";
import { ExampleSection } from "../../components/ui-preview/example-section";
import { FormInput } from "../../components/ui-preview/form-input";
import { FormPanel } from "../../components/ui-preview/form-panel";

export function UiExampleForm() {
    return (
        <ExampleSection label="Form Elements" data-partial="UiExampleForm">
            <FormPanel>
                <FormInput placeholder="Input field" readOnly />
                <ButtonGroup>
                    <Button variant="primary" type="button">Primary</Button>
                    <Button variant="secondary" type="button">Secondary</Button>
                    <Button variant="secondary" type="button" disabled>Disabled</Button>
                </ButtonGroup>
            </FormPanel>
        </ExampleSection>
    );
}
