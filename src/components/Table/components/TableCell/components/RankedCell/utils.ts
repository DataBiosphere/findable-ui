import { Row, RowData, Table } from "@tanstack/react-table";
import { escapeRegExp } from "../../../../../../common/utils";
import { ColumnFilterMeta } from "../../../../columnDef/globalFilter/types";
import { parseSearchTerms } from "../../../../columnDef/globalFilter/utils";

/**
 * Renders a cell value with highlighting if it matches item rank filter criteria.
 * @param table - Table.
 * @param row - Row.
 * @param columnId - Column identifier.
 * @param value - Cell value.
 * @returns Rendered cell value with highlighting.
 */
export function renderRankedCell<T extends RowData>(
  table: Table<T>,
  row: Row<T>,
  columnId: string,
  value: string | undefined | null
): string {
  // If the cell value is undefined or null, return an empty string.
  if (value === undefined || value === null) return "";

  const stringValue = String(value);

  // Check if the cell is ranked.
  const isRanked = isRankedCell(table, row, columnId);

  // Return the unranked cell, as-is, in string form.
  if (!isRanked) return stringValue;

  // Tokenise the current global filter.
  const tokens = getTokens(table);

  // If there are no tokens, return the value as-is, in string form.
  if (tokens.length === 0) return stringValue;

  // Create regex pattern.
  const regex = getTokensRegex(tokens);

  return stringValue.replace(regex, "<mark>$1</mark>");
}

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
  columnId: string
): boolean {
  const { getState } = table;
  const { globalFilter } = getState();

  // If there is no global filter, return the value as-is.
  if (!globalFilter) return false;

  // Check if the column has filter metadata with itemRank.passed
  const columnFilterMeta = row.columnFiltersMeta[columnId] as ColumnFilterMeta;

  return columnFilterMeta?.passed ?? false;
}
