import { ChromeCard } from "../../components/ui-preview/chrome-card";
import { ChromeLayout } from "../../components/ui-preview/chrome-layout";
import { ChromePanel } from "../../components/ui-preview/chrome-panel";
import { ChromeSidebar } from "../../components/ui-preview/chrome-sidebar";
import { ChromeSidebarItem } from "../../components/ui-preview/chrome-sidebar-item";
import { ExampleSection } from "../../components/ui-preview/example-section";

export function UiExampleChrome() {
    return (
        <ExampleSection label="App Chrome" data-partial="UiExampleChrome">
            <ChromeLayout>
                <ChromeSidebar>
                    <ChromeSidebarItem active>Dashboard</ChromeSidebarItem>
                    <ChromeSidebarItem>Settings</ChromeSidebarItem>
                    <ChromeSidebarItem>Profile</ChromeSidebarItem>
                </ChromeSidebar>
                <ChromePanel header="Dashboard">
                    <ChromeCard>Content area</ChromeCard>
                    <ChromeCard>Another panel</ChromeCard>
                </ChromePanel>
            </ChromeLayout>
        </ExampleSection>
    );
}
