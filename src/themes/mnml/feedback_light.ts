import { HexColor } from "../../types/theme.ts";

export interface MnmlFeedback {
    red: HexColor;
    green: HexColor;
    blue: HexColor;
    yellow: HexColor;
}

export const feedback: MnmlFeedback = {
    red: "#e74c3c",
    green: "#27ae60",
    blue: "#3498db",
    yellow: "#f39c12",
};

export default feedback;