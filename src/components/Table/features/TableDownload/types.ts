import { RowData, Table } from "@tanstack/react-table";

/**
 * Table download API added to the TanStack column.
 */
export interface TableDownloadColumn {
  getCanTableDownload: () => boolean;
}

/**
 * Table download option for a column definition.
 */
export interface TableDownloadColumnDef {
  enableTableDownload?: boolean;
}

/**
 * Table download API added to the TanStack table instance.
 */
export interface TableDownloadInstance {
  downloadData: () => void;
}

/**
 * Table download options added to the TanStack table options.
 */
export interface TableDownloadOptions<T extends RowData> {
  downloadFilename?: string;
  enableTableDownload?: boolean;
  onTableDownload?: (table: Table<T>) => void;
}
