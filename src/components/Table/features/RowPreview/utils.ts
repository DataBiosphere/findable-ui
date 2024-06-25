import { Row, RowData } from "@tanstack/react-table";
import { RowPreviewState } from "./entities";

/**
 * Returns true if the row is selected for preview.
 * @param row - Row.
 * @param rowPreview - Row preview state.
 * @returns true if the row is selected for preview.
 */
export function isRowPreview<T extends RowData>(
  row: Row<T>,
  rowPreview: RowPreviewState
): boolean {
  return rowPreview?.id === row.id;
}
