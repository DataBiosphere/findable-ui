import { rankItem } from "@tanstack/match-sorter-utils";
import { Row, RowData } from "@tanstack/react-table";
import { RANK_ITEM_OPTIONS } from "./constants";

export function fuzzy<T extends RowData>(
  row: Row<T>,
  columnId: string,
  value: unknown
): boolean {
  // Get the column value.
  const columnValue = row.getValue(columnId);

  // Return false if the column value is undefined or null.
  if (columnValue === undefined || columnValue === null) return false;

  // Split the search term into terms.
  const terms = String(value ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  // Check if each term matches the column value.
  // Ranking from CASE_SENSITIVE_EQUAL to ACRONYM (excludes `MATCHES` threshold).
  return terms.every((term) => {
    const itemRank = rankItem(String(columnValue), term, RANK_ITEM_OPTIONS);
    return itemRank.passed;
  });
}
