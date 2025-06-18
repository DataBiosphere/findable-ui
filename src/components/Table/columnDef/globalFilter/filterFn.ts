import { FilterMeta, Row, RowData } from "@tanstack/react-table";
import { parseSearchTerms, rankColumnValue, rankRowColumns } from "./utils";

/**
 * Fuzzy matches a column against search terms.
 * A true value is returned if the column's value passes the ranking threshold.
 * Normally, TanStack global filtering will not process remaining row columns if a match is found.
 * This function ranks other row columns for highlighting purposes.
 * @param row - Row.
 * @param columnId - Column identifier.
 * @param value - Search term.
 * @param addMeta - Function to add filter metadata.
 * @returns Whether the row passed the filter.
 */
export function fuzzy<T extends RowData>(
  row: Row<T>,
  columnId: string,
  value: unknown,
  addMeta: (meta: FilterMeta) => void
): boolean {
  // Split the search term into terms.
  const terms = parseSearchTerms(value);

  // Rank the column value.
  const passed = rankColumnValue(row, columnId, terms);

  // Add the filter metadata.
  addMeta({ passed });

  // Rank other columns for highlighting purposes (TanStack global filtering will not process remaining columns if a match is found).
  if (passed) rankRowColumns(row, columnId, terms);

  return passed;
}
