import { Row, RowData, Table } from "@tanstack/react-table";

/**
 * Returns true if the row is selected for preview.
 * @param row - Row.
 * @param table - Table.
 * @returns true if the row is selected for preview.
 */
export function getIsPreview<T extends RowData>(
  row: Row<T>,
  table: Table<T>,
): boolean {
  const keyValue = getRowPreviewKeyValue(table);
  if (!keyValue) return false;
  const [key, value] = keyValue;
  if (!value) return false;
  return key === row.id;
}

/**
 * Returns true if any row is selected for preview.
 * @param table - Table.
 * @returns true if any row is selected for preview.
 */
export function getIsRowPreview<T extends RowData>(table: Table<T>): boolean {
  const keyValue = getRowPreviewKeyValue(table);
  if (!keyValue) return false;
  const [, value] = keyValue;
  return value;
}

/**
 * Returns row selected for preview. Row data is returned even if the row is no longer "previewed" i.e. selected for preview.
 * @param table - Table.
 * @returns row selected for preview.
 */
export function getRowPreviewRow<T extends RowData>(
  table: Table<T>,
): Row<T> | undefined {
  const keyValue = getRowPreviewKeyValue(table);
  if (!keyValue) return;
  const [key] = keyValue;
  // We return the original row data, even if the row is no longer "previewed" i.e. selected for preview.
  // This is to ensure any drawer or modal that is still open can display the row data, until the modal or drawer is closed.
  const rowsById = table.getRowModel().rowsById;
  return rowsById[key];
}

/**
 * Returns the key, value tuple of the row selected for preview.
 * @param table - Table.
 * @returns row preview key, value tuple.
 */
function getRowPreviewKeyValue<T extends RowData>(
  table: Table<T>,
): [string, boolean] | undefined {
  const { getState } = table;
  const { rowPreview } = getState();

  const entries = Object.entries(rowPreview);
  if (!entries.length) return;

  const [[key, value]] = entries;
  return [key, value];
}

/**
 * Toggles the preview state of the row.
 * If the row is already selected for preview, the preview state is toggled off.
 * If the row is not selected for preview, the preview state is updated.
 * @param row - Row.
 * @param table - Table.
 */
export function togglePreview<T extends RowData>(
  row: Row<T>,
  table: Table<T>,
): void {
  if (row.getIsPreview()) {
    table.toggleRowPreview();
    return;
  }
  table.setRowPreview({ [row.id]: true });
}

/**
 * Toggles the preview state of any row selected for preview.
 * @param table - Table.
 */
export function toggleRowPreview<T extends RowData>(table: Table<T>): void {
  const keyValue = getRowPreviewKeyValue(table);
  if (!keyValue) {
    return;
  }
  const [key, value] = keyValue;
  table.setRowPreview({ [key]: !value });
}
