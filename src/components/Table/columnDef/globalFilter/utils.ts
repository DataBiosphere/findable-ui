import { rankItem } from "@tanstack/match-sorter-utils";
import { Row, RowData } from "@tanstack/react-table";
import { RANK_ITEM_OPTIONS } from "./constants";

/**
 * Parses a search term into an array of terms.
 * @param value - Search term.
 * @returns Array of terms.
 */
export function parseSearchTerms(value: unknown): string[] {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Ranks a column's value against search terms.
 * @param row - Row to rank.
 * @param columnId - Column identifier.
 * @param terms - Search terms to match against.
 * @returns Whether the value passed.
 */
export function rankColumnValue<T extends RowData>(
  row: Row<T>,
  columnId: string,
  terms: string[]
): boolean {
  // Get the column value.
  const columnValue = row.getValue(columnId);

  // Return false if the column value is undefined or null.
  if (columnValue === undefined || columnValue === null) return false;

  // Check if each term matches the column value.
  // Ranking from CASE_SENSITIVE_EQUAL to CONTAINS (excludes `ACRONYM`, `MATCHES` threshold).
  const rankings = terms.map((term) =>
    rankItem(String(columnValue), term, RANK_ITEM_OPTIONS)
  );

  return rankings.every(({ passed }) => passed);
}
