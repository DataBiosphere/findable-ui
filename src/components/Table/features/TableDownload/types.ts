import { RowData, Table } from "@tanstack/react-table";

export interface TableDownloadColumn {
  getCanDownload: () => boolean;
}

export interface TableDownloadColumnDef {
  enableDownload?: boolean;
}

export interface TableDownloadInstance {
  downloadData: () => void;
  getIsDownloadEnabled: () => boolean;
}

export interface TableDownloadOptions<T extends RowData> {
  downloadFilename?: string;
  enableDownload?: boolean;
  onDownload?: (table: Table<T>) => void;
}
