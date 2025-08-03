import * as colors from "@std/fmt/colors";

/**
 * Display help information about commands and usage
 */
export default function help(): void {
    console.log(`Usage: black-atom-core <command> [options]

Commands:
  ${colors.yellow("generate")}        Generate theme files from templates
    ${colors.dim("Options:")}
    ${colors.cyan("--watch, -w")}       Watch for changes and regenerate themes

  ${colors.cyan("--help, -h")}        Show this help message
`);
}
