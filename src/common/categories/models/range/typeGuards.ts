import { Category } from "../types";
import { RangeCategory, SelectedRange } from "./types";

/**
 * Determine if category is a range category.
 * @param category - Category to check if range category.
 * @returns true if category is a range category.
 */
export function isRangeCategory(category: Category): category is RangeCategory {
  return "max" in category && "min" in category;
}

/**
 * Determine if value is a selected range.
 * @param value - Value to check if selected range.
 * @returns true if value is a selected range.
 */
export function isSelectedRange(value: unknown): value is SelectedRange {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((v) => v === null || typeof v === "number")
  );
}
