import { CategoryKeyLabel } from "./entities";

/**
 * Map category key to category label.
 * @param CATEGORY_KEY - Category key.
 * @param CATEGORY_LABEL - Category label.
 * @returns map of category key to category label.
 */
export function mapCategoryKeyLabel(
  CATEGORY_KEY: Record<string, string>,
  CATEGORY_LABEL: Record<string, string>
): CategoryKeyLabel {
  const categoryKeyLabel: CategoryKeyLabel = new Map();
  for (const [key, categoryKey] of Object.entries(CATEGORY_KEY)) {
    const categoryLabel = CATEGORY_LABEL[key as keyof typeof CATEGORY_LABEL];
    categoryKeyLabel.set(categoryKey, categoryLabel || categoryKey); // Use category key as label if label is not defined.
  }
  return categoryKeyLabel;
}

/**
 * Sanitizes a value to a string for display i.e. any empty, null or undefined value is sanitized to "Unspecified".
 * @param value - Value to sanitize.
 * @returns the string or sanitized string value.
 */
export function sanitizeString(value: unknown): string {
  if (value === "" || value === null || value === undefined) {
    return "Unspecified";
  } else {
    return String(value);
  }
}

/**
 * Sanitizes array elements to strings for display i.e. any element within the string array that is an empty, null or
 * undefined value is sanitized to "Unspecified".
 * @param array - Array to sanitize.
 * @returns the string array, sanitized.
 */
export function sanitizeStringArray(array: unknown[]): string[] {
  if (!array || array.length === 0) {
    return ["Unspecified"];
  }
  return array.map(sanitizeString);
}
