import { RowData } from "@tanstack/react-table";

/**
 * Type guard to check if a row has a specific key.
 * Useful for generic accessor functions.
 * @param row - The row to check.
 * @param key - The key to check.
 * @returns True if the row has the specified key, false otherwise.
 */
export function rowHasKey<T extends RowData, K extends PropertyKey, TValue>(
  row: T,
  key: K,
): row is T & Record<K, TValue> {
  return row != null && typeof row === "object" && key in row;
}
