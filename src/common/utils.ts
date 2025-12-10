/**
 * Return true if url specified is valid.
 * @param testUrl - URL to check if valid.
 * @returns true when the url is valid.
 */
export function isValidUrl(testUrl: string): boolean {
  try {
    return Boolean(new URL(testUrl));
  } catch {
    return false;
  }
}

/**
 * String-concatenates the specified list of values to a string value, joined by a comma ",".
 * @param values - List of values.
 * @returns the values in a string, each value joined by a comma.
 */
export function stringifyValues(values: string[]): string {
  return values.join(", ");
}

/**
 * Returns string with any special characters escaped.
 * @param string - String to escape.
 * @returns string with any special characters escaped.
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
