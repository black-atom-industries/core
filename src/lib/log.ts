import * as colors from "@std/fmt/colors";

export const icon = {
    success: "󰦕 ",
    error: "󱄊 ",
    warn: "󰲼 ",
    info: "󰲼 ",
};

const separator = ":: ";

const logMenu = () => {
    console.log(`Usage: black-atom-core <command>

Commands:
  ${colors.yellow("generate")}    Generate theme files from templates
`);
};

const log = {
    error: (message: string) => {
        console.error(colors.red(icon.error + separator + message));
    },
    info: (message: string) => {
        console.info(colors.white(icon.info + separator + message));
    },
    warn: (message: string) => {
        console.warn(colors.yellow(icon.warn + separator + message));
    },
    success: (message: string) => {
        console.log(colors.green(icon.success + separator + message));
    },
    menu: logMenu,
};

export default log;
