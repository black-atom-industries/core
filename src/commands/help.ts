import * as colors from "@std/fmt/colors";

/**
 * Display help information about commands and usage
 */
export default function help(): void {
    console.log(`Usage: black-atom-core <command>

Commands:
  ${colors.yellow("adapt")}           Adapt theme files from templates

  ${colors.cyan("--help, -h")}        Show this help message
`);
}
