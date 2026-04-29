import type { ColumnFilter } from "@tanstack/react-table";

/**
 * Returns true if the value is a valid TanStack ColumnFilter shape.
 * @param value - Value to check.
 * @returns true if the value has the expected shape.
 */
export function isColumnFilter(value: unknown): value is ColumnFilter {
  if (typeof value !== "object" || value === null) return false;
  const filter = value as Record<string, unknown>;
  return typeof filter.id === "string" && "value" in filter;
}
