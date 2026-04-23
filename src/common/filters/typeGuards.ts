import { SelectedFilter } from "../entities";

/**
 * Returns true if the value is a valid SelectedFilter.
 * @param value - Value to check.
 * @returns true if the value has the expected shape.
 */
export function isSelectedFilter(value: unknown): value is SelectedFilter {
  return (
    typeof value === "object" &&
    value !== null &&
    "categoryKey" in value &&
    "value" in value &&
    Array.isArray((value as SelectedFilter).value)
  );
}
