import {
  Column,
  RowData,
  Table,
  TableFeature,
  TableOptionsResolved,
} from "@tanstack/react-table";
import { downloadData, getCanTableDownload, onTableDownload } from "./utils";

export const TABLE_DOWNLOAD: TableFeature = {
  createColumn: <TData extends RowData, TValue>(
    column: Column<TData, TValue>,
    table: Table<TData>
  ): void => {
    column.getCanTableDownload = (): boolean =>
      getCanTableDownload(column, table);
  },
  createTable: <T extends RowData>(table: Table<T>): void => {
    table.downloadData = (): void => downloadData(table);
  },
  getDefaultOptions: <T extends RowData>(): Partial<
    TableOptionsResolved<T>
  > => ({ enableTableDownload: false, onTableDownload }),
};
