import { ReactNode } from "react";

/**
 * Type guard for ReactNode; returns true if the value is a boolean.
 * @param value - Value to check.
 * @returns true if the value is a boolean.
 */
export function isNodeBoolean(value: ReactNode): value is boolean {
  return typeof value === "boolean";
}
