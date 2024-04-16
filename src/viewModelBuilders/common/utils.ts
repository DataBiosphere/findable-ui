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
 * Sanitizes a string for display i.e. any empty, null or undefined value is sanitized to "Unspecified".
 * @param str - String to sanitize.
 * @returns the string or sanitized string value.
 */
export function sanitizeString(str: string): string {
  if (str === "" || str === null || str === undefined) {
    return "Unspecified";
  } else {
    return str;
  }
}

/**
 * Sanitizes a string array for display i.e. any string element within the string array that is an empty, null or
 * undefined value is sanitized to "Unspecified".
 * @param strArray - String array to sanitize.
 * @returns the string array, sanitized.
 */
export function sanitizeStringArray(strArray: string[]): string[] {
  if (!strArray || strArray.length === 0) {
    return ["Unspecified"];
  }
  return strArray.map(sanitizeString);
}
