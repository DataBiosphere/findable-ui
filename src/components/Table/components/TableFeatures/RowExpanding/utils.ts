import { Row, RowData } from "@tanstack/react-table";

/**
 * Handles toggling the expanded state of a row.
 * Rows can not be expanded if:
 * - the row can not be expanded.
 * - the row is grouped (expanded rows are not supported on grouped rows).
 * - the user is selecting text.
 * @param row - Row.
 */
export function handleToggleExpanded<T extends RowData>(row: Row<T>): void {
  const { getCanExpand, getIsGrouped, toggleExpanded } = row;

  // Row can not be expanded.
  if (!getCanExpand()) return;

  // Row is grouped - row expansion not supported on a grouped row.
  if (getIsGrouped()) return;

  // User is selecting text - do not toggle row expanded state.
  if (window.getSelection()?.toString()) return;

  // Toggle row expanded state.
  toggleExpanded();
}
