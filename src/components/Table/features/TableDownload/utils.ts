import { Column, RowData, Table } from "@tanstack/react-table";
import { getBlob } from "./onDownload/utils";

/**
 * Function that downloads the table data as a TSV file.
 * Uses the onDownload callback, or a custom download function if provided.
 * @param table - Table.
 */
export function downloadData<T extends RowData>(table: Table<T>): void {
  table.options.onTableDownload?.(table);
}

/**
 * Returns true if column can be downloaded.
 * @param column - Column.
 * @param table - Table.
 * @returns True if column can be downloaded.
 */
export function getCanTableDownload<T extends RowData, TValue>(
  column: Column<T, TValue>,
  table: Table<T>
): boolean {
  return (
    (column.columnDef.enableTableDownload ?? true) &&
    (table.options.enableTableDownload ?? false)
  );
}

/**
 * Default download function that downloads the table data as a TSV file.
 * @param table - Table.
 */
export function onTableDownload<T extends RowData>(table: Table<T>): void {
  // Check if download is enabled.
  if (!(table.options.enableTableDownload ?? false)) return;

  // Generate the blob.
  const blob = getBlob(table);
  if (!blob) return;

  // Create an object URL for the blob.
  const url = URL.createObjectURL(blob);

  // Create a download link.
  const anchorEl = document.createElement("a");
  anchorEl.href = url;
  anchorEl.download = table.options.downloadFilename || "table-data.tsv";

  // Append to the document body for better cross-browser support.
  document.body.appendChild(anchorEl);

  // Trigger the download.
  anchorEl.click();

  // Remove the element after triggering download.
  document.body.removeChild(anchorEl);

  // Clean up.
  URL.revokeObjectURL(url);
}
