import { Row, RowData } from "@tanstack/react-table";
import { parseSearchTerms, rankColumnValue } from "./utils";

/**
 * Fuzzy matches a column against search terms.
 * A true value is returned if the column's value passes the ranking threshold.
 * @param row - Row.
 * @param columnId - Column identifier.
 * @param value - Search term.
 * @returns Whether the row passed the filter.
 */
export function fuzzy<T extends RowData>(
  row: Row<T>,
  columnId: string,
  value: unknown
): boolean {
  // Split the search term into terms.
  const terms = parseSearchTerms(value);

  // Rank the column value.
  return rankColumnValue(row, columnId, terms);
}
