import { ReactNode } from "react";

/**
 * Returns a parsed value based on the original value.
 * If the value is a boolean, it is converted to its string representation ("true" or "false").
 * For all other types of ReactNode, the value is returned unchanged.
 * @param value - The original value.
 * @returns Parsed value or original value.
 */
export function parseValue(value: ReactNode): ReactNode {
  if (typeof value === "boolean") return value.toString();
  return value;
}
