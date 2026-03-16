/**
 * WCAG 2.1 contrast ratio thresholds for text readability.
 *
 * @see https://www.w3.org/TR/WCAG21/#contrast-minimum (Level AA)
 * @see https://www.w3.org/TR/WCAG21/#contrast-enhanced (Level AAA)
 */
export const WCAG_CONTRAST = {
    /** Level AA: minimum contrast for normal text (4.5:1) */
    AA: 4.5,
    /** Level AAA: enhanced contrast for normal text (7:1) */
    AAA: 7,
} as const;

export type WcagGrade = "AAA" | "AA" | "fail";

/** Evaluates a contrast ratio against WCAG 2.1 thresholds. */
export function wcagGrade(ratio: number): WcagGrade {
    if (ratio >= WCAG_CONTRAST.AAA) return "AAA";
    if (ratio >= WCAG_CONTRAST.AA) return "AA";
    return "fail";
}
