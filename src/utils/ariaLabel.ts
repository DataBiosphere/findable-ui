/**
 * Returns the given accessible name, falling back to the default when it is
 * absent or blank. A blank `aria-label` is discarded by the accessible name
 * computation, which would leave an icon-only control unnamed — its icon is
 * `aria-hidden`, so there is no text to fall back to.
 * @param label - Accessible name provided by the consumer.
 * @param fallback - Accessible name to use when the provided label is blank.
 * @returns The resolved accessible name.
 */
export function resolveAriaLabel(
  label: string | undefined,
  fallback: string,
): string {
  return label?.trim() || fallback;
}
