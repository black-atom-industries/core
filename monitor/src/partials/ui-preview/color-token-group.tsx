import { ColorSwatch } from "../../components/color-swatch";
import { ExampleSection } from "../../components/ui-preview/example-section";
import { SwatchGrid } from "../../components/ui-preview/swatch-grid";

interface Props {
    label: string;
    tokens: [string, string][];
    swatchType?: "background" | "foreground";
}

export function ColorTokenGroup({ label, tokens, swatchType = "background" }: Props) {
    return (
        <ExampleSection label={label} data-partial="ColorTokenGroup">
            <SwatchGrid>
                {tokens.map(([name, color]) => (
                    <ColorSwatch
                        key={name}
                        color={color}
                        label={name}
                        type={swatchType}
                    />
                ))}
            </SwatchGrid>
        </ExampleSection>
    );
}
