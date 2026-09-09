import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the dialog's close button, falling back to
 * the default when the given label is absent or blank. A blank `aria-label` is
 * discarded by the accessible name computation, which would leave the button
 * unnamed — the bug this component's label exists to prevent.
 * @param closeLabel - Accessible name provided by the consumer.
 * @returns The close button's accessible name.
 */
export function getCloseLabel(closeLabel?: string): string {
  return closeLabel?.trim() || ARIA_LABEL.CLOSE;
}
