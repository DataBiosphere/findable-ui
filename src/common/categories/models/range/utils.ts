import { SelectedFilter } from "../../../entities";
import { isSelectedRange } from "./typeGuards";
import { SelectedRange } from "./types";

/**
 * Asserts that the given value is a selected range.
 * Throws an error if the value is not a selected range.
 * @param value - Value to assert is a selected range.
 */
export function assertIsRange(value: unknown): asserts value is SelectedRange {
  if (!isSelectedRange(value)) {
    throw new Error("Value is not a selected range");
  }
}

/**
 * Get the selected values for the given category, if any.
 * Handles type checking for selected range.
 * Falls back to empty array if no selected values or invalid type (should never happen).
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns The selected filter (i.e. the set of selected values) for the given category.
 */
export function getRangeSelectedValue(
  categorySelectedFilter?: SelectedFilter
): SelectedRange {
  return isSelectedRange(categorySelectedFilter?.value)
    ? categorySelectedFilter?.value
    : [];
}
