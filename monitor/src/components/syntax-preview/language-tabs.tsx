import type { ReactNode } from "react";
import { Tabs } from "@base-ui/react/tabs";
import styles from "./language-tabs.module.css";

type Language = {
    key: string;
    label: string;
    content: ReactNode;
};

type Props = {
    languages: Language[];
    defaultLanguage?: string;
};

export function LanguageTabs({ languages, defaultLanguage }: Props) {
    return (
        <Tabs.Root
            className={styles.root}
            defaultValue={defaultLanguage ?? languages[0]?.key}
            data-component="LanguageTabs"
        >
            <Tabs.List className={styles.list}>
                {languages.map(({ key, label }) => (
                    <Tabs.Tab key={key} value={key} className={styles.tab}>
                        {label}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            {languages.map(({ key, content }) => (
                <Tabs.Panel key={key} value={key} className={styles.panel}>
                    {content}
                </Tabs.Panel>
            ))}
        </Tabs.Root>
    );
}
