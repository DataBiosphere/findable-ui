import { RowData, Table } from "@tanstack/react-table";

export interface TableDownloadColumn {
  getCanTableDownload: () => boolean;
}

export interface TableDownloadColumnDef {
  enableTableDownload?: boolean;
}

export interface TableDownloadInstance {
  downloadData: () => void;
  getIsDownloadEnabled: () => boolean;
}

export interface TableDownloadOptions<T extends RowData> {
  downloadFilename?: string;
  enableTableDownload?: boolean;
  onDownload?: (table: Table<T>) => void;
}
