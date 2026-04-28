import { SelectedFilter } from "../entities";

/**
 * Returns true if the value is a valid SelectedFilter.
 * @param value - Value to check.
 * @returns true if the value has the expected shape.
 */
export function isSelectedFilter(value: unknown): value is SelectedFilter {
  if (typeof value !== "object" || value === null) return false;
  const filter = value as Record<string, unknown>;
  return typeof filter.categoryKey === "string" && Array.isArray(filter.value);
}

/**
 * Parses a filter parameter string into an array of SelectedFilter.
 * Returns an empty array if the string is not valid JSON or does not
 * contain valid SelectedFilter objects. This function must not throw,
 * as it is called from reducers above the ErrorBoundary. The
 * useValidateFilterParam hook in ExploreView handles surfacing
 * invalid filter errors to the user from inside the ErrorBoundary.
 * @param paramValue - URL-decoded filter parameter string.
 * @returns parsed filters, or empty array if invalid.
 */
export function parseFilterParam(paramValue: string): SelectedFilter[] {
  try {
    const parsed: unknown = JSON.parse(paramValue);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSelectedFilter);
  } catch {
    return [];
  }
}
