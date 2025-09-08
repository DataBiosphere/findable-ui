import {
  Column,
  RowData,
  Table,
  TableFeature,
  TableOptionsResolved,
} from "@tanstack/react-table";
import {
  downloadData,
  getCanDownload,
  getIsDownloadEnabled,
  onDownload,
} from "./utils";

export const TABLE_DOWNLOAD: TableFeature = {
  createColumn: <TData extends RowData, TValue>(
    column: Column<TData, TValue>,
    table: Table<TData>
  ): void => {
    column.getCanDownload = (): boolean => getCanDownload(column, table);
  },
  createTable: <T extends RowData>(table: Table<T>): void => {
    table.downloadData = (): void => downloadData(table);
    table.getIsDownloadEnabled = (): boolean => getIsDownloadEnabled(table);
  },
  getDefaultOptions: <T extends RowData>(): Partial<
    TableOptionsResolved<T>
  > => ({ enableDownload: false, onDownload }),
};
