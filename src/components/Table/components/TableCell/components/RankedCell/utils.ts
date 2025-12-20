import { Row, RowData, Table } from "@tanstack/react-table";
import { escapeRegExp } from "../../../../../../common/utils";
import { ColumnFilterMeta } from "../../../../columnDef/globalFilter/types";
import { parseSearchTerms } from "../../../../columnDef/globalFilter/utils";

/**
 * Returns the current global filter tokens from the table.
 * @param table - Table.
 * @returns An array of search tokens.
 */
export function getTokens<T extends RowData>(table: Table<T>): string[] {
  const { getState } = table;
  const { globalFilter } = getState();
  return parseSearchTerms(globalFilter);
}

/**
 * Returns a RegExp pattern for matching search tokens.
 * @param tokens - Search tokens.
 * @returns A RegExp pattern that matches any of the tokens.
 */
export function getTokensRegex(tokens: string[]): RegExp {
  return new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
}

/**
 * Checks if a cell is ranked based on the global filter.
 * @param table - Table.
 * @param row - Row.
 * @param columnId - Column identifier.
 * @returns Whether the cell is ranked.
 */
export function isRankedCell<T extends RowData>(
  table: Table<T>,
  row: Row<T>,
  columnId: string,
): boolean {
  const { getState } = table;
  const { globalFilter } = getState();

  // If there is no global filter, return the value as-is.
  if (!globalFilter) return false;

  // Check if the column has filter metadata with itemRank.passed
  const columnFilterMeta = row.columnFiltersMeta[columnId] as ColumnFilterMeta;

  return columnFilterMeta?.passed ?? false;
}
