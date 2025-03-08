import * as colors from "@std/fmt/colors";

export const icon = {
    success: "󰦕",
    error: "󱄊",
    warn: "󰲼",
    info: "󰲼",
};

const separator = "  ";
const hr_thick_char = "•";
const hr_thin_char = "⋅";
const hr_length = 72; // Standardized line length

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
        // Handle prefix
        const prefixText = prefix ? `${prefix} ` : "";

        // For simplicity, we'll use fixed length calculations
        // Estimate visible length of prefixText
        // This isn't perfect but handles common cases
        const visibleLength = stripAnsiCodes(prefixText).length;

        // Calculate remaining space for separator characters
        const finalHrLength = Math.max(hr_length - visibleLength, 0);
        let hr = prefixText;

        // Fill with separator characters
        hr += hr_thick_char.repeat(finalHrLength);

        console.log(colors.brightYellow(hr));
    },
    hr_thin: (prefix: string = "") => {
        // Handle prefix
        const prefixText = prefix ? `${prefix} ` : "";

        // For simplicity, we'll use fixed length calculations
        // Estimate visible length of prefixText
        const visibleLength = stripAnsiCodes(prefixText).length;

        // Calculate remaining space for separator characters
        const finalHrLength = Math.max(hr_length - visibleLength, 0);
        let hr = prefixText;

        // Fill with separator characters
        hr += hr_thin_char.repeat(finalHrLength);

        console.log(colors.brightYellow(hr));
    },
    menu: logMenu,
};

export default log;
