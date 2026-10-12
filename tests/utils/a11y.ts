import axe, { type Result, type RunOptions } from "axe-core";

/**
 * Axe rules that don't apply to a component rendered on its own in jsdom:
 * - color-contrast: jsdom does no layout or painting, so axe cannot resolve
 *   colours and the rule never reaches a verdict.
 * - region: requires all content to sit inside a landmark, which is decided by
 *   the consuming app's page, not by a component.
 */
export const AXE_RUN_OPTIONS: RunOptions = {
  // Skips building node detail for passing and inapplicable results.
  resultTypes: ["violations"],
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
};

/**
 * Formats axe violations as one line per offending node, so a failing
 * assertion names the rule, what it requires, and where it failed.
 * @param violations - Axe violations.
 * @returns One "rule: help (selector)" line per offending node.
 */
export function formatA11yViolations(violations: Result[]): string[] {
  return violations.flatMap(({ help, id, nodes }) =>
    nodes.map(({ target }) => `${id}: ${help} (${target.join(" ")})`),
  );
}

/**
 * Runs axe over the rendered DOM.
 * @param element - Root of the DOM to check.
 * @returns Axe violations.
 */
export async function getA11yViolations(element: Element): Promise<Result[]> {
  const { violations } = await axe.run(element, AXE_RUN_OPTIONS);
  return violations;
}
