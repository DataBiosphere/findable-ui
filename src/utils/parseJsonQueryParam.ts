/**
 * Parses a JSON-encoded value from a URL query parameter.
 *
 * This function is specifically designed for query parameters that contain
 * serialized complex data (arrays or objects), not for simple string values.
 *
 * It handles Next.js query parameters which can be string, string[] or undefined.
 * Repeated parameters (`string[]`) are not supported.
 *
 * @param param - URL query parameter value.
 * @param defaultValue - Default value.
 * @returns Parsed complex data structure or default value.
 */
export function parseJsonQueryParam<T = unknown>(
  param: string | string[] | undefined,
  defaultValue?: T,
): T | undefined {
  // Handle non-string parameters.
  if (typeof param !== "string") return defaultValue;

  try {
    return JSON.parse(decodeURIComponent(param));
  } catch (error) {
    console.warn("Failed to parse query param JSON:", error);
    return defaultValue;
  }
}
