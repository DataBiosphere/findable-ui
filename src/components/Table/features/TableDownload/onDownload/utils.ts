import { Column, RowData, Table } from "@tanstack/react-table";
import { getColumnHeader } from "../../../common/utils";

/**
 * Format data to TSV string.
 * @param data - Table data.
 * @returns table data formatted into a TSV string.
 */
export function formatDataToTSV(data: unknown[][]): string {
  return data
    .map((row) => {
      return row
        .map((value) => {
          // Use empty string in place of undefined and null.
          if (value === undefined || value === null) return "";

          // Convert unknown value to string.
          let valueStr: string;

          // Test if object / array.
          if (typeof value === "object") {
            if (Array.isArray(value)) {
              // Handle array.
              valueStr = value.join(", ") || "";
            } else {
              // Handle object.
              valueStr = JSON.stringify(value);
            }
          } else {
            // Handle primitive.
            valueStr = String(value);
          }

          // Quote if necessary.
          return /[\t\r\n"]/.test(valueStr)
            ? `"${valueStr.replaceAll('"', '""')}"`
            : valueStr;
        })
        .join("\t");
    })
    .join("\n");
}

export function getBlob<T extends RowData>(table: Table<T>): Blob | undefined {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) return;

  // Get downloadable columns based on getCanDownload property.
  const downloadableColumns = getDownloadableColumns(table);

  // Extract column IDs for filtering.
  const downloadableColumnIds = downloadableColumns.map((column) => column.id);

  // Get table headers from downloadable columns.
  const tableHeaders = downloadableColumns.map(getColumnHeader);

  // Get row data but only for downloadable columns.
  const tableData = rows.map((row) =>
    downloadableColumnIds.map((columnId) => row.getValue(columnId))
  );

  const tsv = formatDataToTSV([tableHeaders, ...tableData]);
  return new Blob([tsv], { type: "text/tab-separated-values" });
}

/**
 * Filters table columns from column.getCanDownload API.
 * @param table - Table.
 * @returns Columns configured to be downloadable.
 */
export function getDownloadableColumns<T extends RowData>(
  table: Table<T>
): Column<T>[] {
  return table.getAllColumns().filter((column) => column.getCanTableDownload());
}
