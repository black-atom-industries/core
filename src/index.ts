import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import ejs from "ejs";

import { config } from "./config";
import * as Theme from "./types/theme";

/** Recursively gets all theme files from collections */
const getThemeFiles = (dir: string): string[] => {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getThemeFiles(fullPath));
    } else if (entry.isFile() && !entry.name.startsWith('ui_') && !entry.name.startsWith('syntax_')) {
      files.push(fullPath);
    }
  }

  return files;
};

/** Dynamically imports all available themes from collections */
const getThemes = async (): Promise<Theme.Definition[]> => {
  const themes: Theme.Definition[] = [];
  const themesDir = config.dirs.themes;
  const themeFiles = getThemeFiles(themesDir);

  for (const file of themeFiles) {
    const theme = await import(file);
    themes.push(theme.default);
  }

  return themes;
};

/** Dynamically aggregates all available file types in the templates directory.*/
const getFileTypes = (templatesDir: string): string[] => {
  const files = fs.readdirSync(templatesDir);
  return files.map(file => file.split(".")[0]);
};

const convertTheme = (theme: Theme.Definition, template: string) => {
  const templatesDir = config.dirs.templates;
  const templatePath = path.join(templatesDir, `${template}.ejs`);
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  return ejs.render(templateContent, { theme });
};

const main = async () => {
  const themes = await getThemes();
  const fileTypes = getFileTypes(config.dirs.templates);

  const generatedFiles: { [key: string]: string[] } = {};

  themes.forEach(theme => {
    generatedFiles[theme.meta.key] = [];

    fileTypes.forEach(ft => {
      const output = convertTheme(theme, ft);
      const ftDir = config.dirs.ft;
      const platformDir = path.join(ftDir, ft);

      if (!fs.existsSync(platformDir)) {
        fs.mkdirSync(platformDir, { recursive: true });
      }

      fs.writeFileSync(path.join(platformDir, `${theme.meta.key}.${ft}`), output);
      generatedFiles[theme.meta.key].push(ft);
    });
  });

  Object.entries(generatedFiles).forEach(([themeKey, files]) => {
    console.log(
      chalk.green("󰄴"),
      chalk.white("Generated"),
      chalk.bold(chalk.magenta(themeKey)),
      `for ${chalk.green(`[` + chalk.cyan(files.join(", ")) + "]")}.`
    );
  });
};

main();
