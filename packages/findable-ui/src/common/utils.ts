/**
 * Returns true if the route specified is valid.
 * @param testRoute - Route to check if valid.
 * @returns true when the route is valid.
 */
export function isValidRoute(testRoute: string): boolean {
  return /^\/(?!\/)/.test(testRoute);
}

/**
 * Return true if url specified is valid.
 * @param testUrl - URL to check if valid.
 * @returns true when the url is valid.
 */
export function isValidUrl(testUrl: string): boolean {
  try {
    return Boolean(new URL(testUrl));
  } catch (e) {
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
