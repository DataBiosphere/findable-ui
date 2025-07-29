/**
 * Returns true if the value is a string, false otherwise.
 * @param value - Value.
 * @returns true if the value is a string, false otherwise.
 */
export function isValueString(value: unknown): value is string {
  return typeof value === "string";
}
