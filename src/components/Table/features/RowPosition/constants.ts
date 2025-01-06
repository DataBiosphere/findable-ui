import {
  Cell,
  Column,
  Row,
  RowData,
  RowModel,
  Table,
  TableFeature,
  TableOptionsResolved,
} from "@tanstack/react-table";
import { getRowModel, getRowPosition } from "./utils";

export const ROW_POSITION: TableFeature = {
  createCell: <T extends RowData, TValue>(
    cell: Cell<T, TValue>,
    column: Column<T>,
    row: Row<T>,
    table: Table<T>
  ): void => {
    row.getRowPosition = (): number => {
      return getRowPosition(row.id, table);
    };
  },
  createTable: <T extends RowData>(table: Table<T>): void => {
    table.getRowModel = (): RowModel<T> => {
      const rowModel = table.getPaginationRowModel();
      return getRowModel(table, rowModel);
    };
  },
  getDefaultOptions: <T extends RowData>(): Partial<
    TableOptionsResolved<T>
  > => {
    return {
      enableRowPosition: false,
    };
  },
};
