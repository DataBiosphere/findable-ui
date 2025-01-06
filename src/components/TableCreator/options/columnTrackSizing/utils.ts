import { Column, RowData } from "@tanstack/react-table";
import { COLUMN_IDENTIFIER } from "../../../Table/common/columnIdentifier";
import { isGridTrackMinMax } from "./typeGuards";

/**
 * Generates the grid track sizing for a table using a grid layout.
 * Creates a string value for the `grid-template-columns` CSS property based on the visible columns.
 * It ensures proper sizing for grouped, system, and non-system columns.
 * - Grouped columns are excluded from grid sizing as they flex across the table.
 * - System columns (e.g., "rowPosition" and "rowSelection") have pre-defined sizing.
 * - Non-system columns collectively fill the table's width. If their total fractional sizing is less than `1fr`, the first non-system column is assigned `1fr` to ensure the table is filled.
 * @param visibleColumns - Visible columns.
 * @returns string defining the CSS `grid-template-columns` value for the table.
 */
export function getColumnTrackSizing<T extends RowData>(
  visibleColumns: Column<T>[]
): string {
  // Precompute track sizing.
  const trackSizing: string[] = [];

  let columnCount = 0; // Non-system column count.
  let firstNonSystemColumnIndex = -1;
  let totalFractionalSize = 0;

  for (const [i, column] of visibleColumns.entries()) {
    if (column.getIsGrouped()) continue;

    // Get the column's track size.
    const columnTrackSize = getColumnTrackSize(column);
    trackSizing.push(columnTrackSize);

    // Extract the fractional value (if it exists), and accumulate the total.
    const frSize = extractFractionalValue(columnTrackSize);
    if (frSize) totalFractionalSize += frSize;

    // Skip system columns; track the first non-system column index.
    if (isSystemColumn(column)) continue;
    if (firstNonSystemColumnIndex < 0) firstNonSystemColumnIndex = i;

    columnCount++;
  }

  // Adjust track sizing for the first non-system column when:
  // - the table is a single-column table, or
  // - the total `fr` value is less than 1.
  if (
    firstNonSystemColumnIndex >= 0 &&
    (columnCount === 1 || totalFractionalSize < 1)
  ) {
    trackSizing[firstNonSystemColumnIndex] = "1fr";
  }

  return trackSizing.join(" ");
}

/**
 * Determines the CSS grid track size for a given column.
 * Calculates the track size for a column based on its width configuration.
 * If the column's width is defined as a min-max range, it returns a `minmax()` CSS function.
 * Otherwise, it defaults to the column's width or `1fr` if no width is specified.
 * @param column - Column.
 * @returns A string representing the CSS track size for the column. This can be a `minmax()` function or a fixed/flexible value (e.g., `auto`, `1fr`, `200px`).
 */
export function getColumnTrackSize<T extends RowData>(
  column: Column<T>
): string {
  const width = column.columnDef.meta?.width || "1fr";
  if (isGridTrackMinMax(width)) {
    return `minmax(${width.min}, ${width.max})`;
  }
  return width;
}

/**
 * Returns true if the column is a system column "rowPosition" or "rowSelection".
 * @param column - Column.
 * @returns true if the column is a system column.
 */
function isSystemColumn<T extends RowData>(column: Column<T>): boolean {
  return (
    column.id === COLUMN_IDENTIFIER.ROW_POSITION ||
    column.id === COLUMN_IDENTIFIER.ROW_SELECTION
  );
}

/**
 * Extracts the fractional value (`fr`) from a CSS track size string.
 * This function parses a CSS track size (e.g., `1fr`, `minmax(168px, 0.5fr)`)
 * and extracts the numeric fractional value that appears before `fr`.
 * If the input does not contain a valid fractional value, the function returns `0`.
 * @param columnTrackSize - The CSS track size string e.g. `1fr`, `minmax(100px, 0.5fr)`, `200px`, or `auto`.
 * @returns The fractional value as a number, or `0` if no fractional value is found.
 */
export function extractFractionalValue(columnTrackSize: string): number {
  const match = columnTrackSize.match(/([\d.]+)fr/);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  return Number.isNaN(value) ? 0 : value;
}
