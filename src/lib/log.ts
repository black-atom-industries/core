import * as colors from "@std/fmt/colors";

// Configuration for the log system
const config = {
    icon: {
        success: "󰦕",
        error: "󱄊",
        warn: "󰲼",
        info: "󰲼",
    },
    separator: "  ",
    hr: {
        thick: "•",
        thin: "⋅",
        length: 72,
    },
};

// Helper to strip ANSI color codes from strings
// Using a simple string approach instead of regex to avoid linter issues
function stripAnsiCodes(str: string): string {
    // This is a simplified version that handles basic ANSI codes
    let result = "";
    let inEscapeSeq = false;

    for (let i = 0; i < str.length; i++) {
        // ESC character begins an escape sequence
        if (str.charCodeAt(i) === 27) {
            inEscapeSeq = true;
            continue;
        }

        // If we're in an escape sequence and hit 'm', end the sequence
        if (inEscapeSeq && str[i] === "m") {
            inEscapeSeq = false;
            continue;
        }

        // If not in escape sequence, add to result
        if (!inEscapeSeq) {
            result += str[i];
        }
    }

    return result;
}

// Helper function to create horizontal rules
function createHorizontalRule(prefix: string, charType: string): string {
    // Handle prefix
    const prefixText = prefix ? `${prefix} ` : "";

    // Estimate visible length of prefixText
    const visibleLength = stripAnsiCodes(prefixText).length;

    // Calculate remaining space for separator characters
    const finalHrLength = Math.max(config.hr.length - visibleLength, 0);

    // Combine prefix with repeated characters
    return prefixText + charType.repeat(finalHrLength);
}

function logMenu() {
    console.log(`Usage: black-atom-core <command>

Commands:
  ${colors.yellow("adapt")}           Adapt theme files from templates
`);
}

const log = {
    error: (message: string) => {
        console.error(colors.red(config.icon.error + config.separator + message));
    },
    info: (message: string) => {
        console.info(colors.white(config.icon.info + config.separator + message));
    },
    warn: (message: string) => {
        console.warn(colors.yellow(config.icon.warn + config.separator + message));
    },
    success: (message: string) => {
        console.log(colors.green(config.icon.success + config.separator + message));
    },
    hr_thick: (prefix: string = "") => {
        const hr = createHorizontalRule(prefix, config.hr.thick);
        console.log(colors.brightYellow(hr));
    },
    hr_thin: (prefix: string = "") => {
        const hr = createHorizontalRule(prefix, config.hr.thin);
        console.log(colors.brightYellow(hr));
    },
    menu: logMenu,
};

export default log;
