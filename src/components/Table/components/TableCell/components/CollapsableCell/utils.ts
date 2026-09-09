import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the row's expand toggle. The button carries
 * a single unfold icon in both states, so the name has to say which action the
 * toggle performs next.
 * @param isExpanded - Whether the row is currently expanded.
 * @returns The toggle's accessible name.
 */
export function getToggleLabel(isExpanded: boolean): string {
  return isExpanded ? ARIA_LABEL.COLLAPSE_ROW : ARIA_LABEL.EXPAND_ROW;
}
