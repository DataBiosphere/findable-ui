import { ReactNode } from "react";

/**
 * Returns a parsed value based on the original value.
 * @param value - The original value.
 * @returns Parsed value.
 */
export function parseValue(value: ReactNode): ReactNode {
  if (typeof value === "boolean") return value.toString();
  return value;
}
