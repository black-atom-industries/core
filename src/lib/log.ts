import * as colors from "@std/fmt/colors";

export const icon = {
    success: "󰦕 ",
    error: "󱄊 ",
    warn: "󰲼 ",
    info: "󰲼 ",
};

const separator = " ";
const hr_thick_char = "•";
const hr_thin_char = "⋅";
const hr_length = 80;

const logMenu = () => {
    console.log(`Usage: black-atom-core <command>

Commands:
  ${colors.yellow("adapt")}           Adapt theme files from templates
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
    hr_thick: (prefix: string = "") => {
        const prefixLength = prefix.length;
        const finalHrLength = hr_length - prefixLength;
        let hr: string = prefix ? `${prefix} ` : "";

        for (let i = 0; i < finalHrLength; i++) {
            hr += hr_thick_char;
        }

        console.log(colors.brightYellow(hr));
    },
    hr_thin: (prefix: string = "") => {
        const prefixLength = prefix.length;
        const finalHrLength = hr_length - prefixLength;
        let hr: string = prefix ? `${prefix} ` : "";

        for (let i = 0; i < finalHrLength; i++) {
            hr += hr_thin_char;
        }

        console.log(colors.brightYellow(hr));
    },
    menu: logMenu,
};

export default log;
